import { Images, Languages, colors } from '@/constant';
import { Button, Text, Form, NotificationPanel } from '@/components/ui';

import { ResetPasswordStyle, Box } from './style';
import useResetPassword from './useResetPassword';
import SpinVerification from '@/components/ui/SpinVerification';
import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useTypedSelector } from '@/hooks';
import { NewPasswordPayload, UserState } from '@/interface';
import { useAppAsyncDispatch } from '@/hooks/useAppDispatch';
import { setNewPassword, verifyResetToken } from '@/stores/actions';
import { isEmpty } from 'lodash';

const {
	heading,
	subHeading,
	resetForm: {
		newPasswordConfirmationLabel,
		newPasswordConfirmationPlaceholder,
		newPasswordLabel,
		newPasswordPlaceHolder,
		resetBtnLabel,
	}
} = Languages.page.resetPassword;

const ResetPassword = () => {
	const navigate = useRouter();
	const searchParams = useSearchParams()!;
	const { onClickResetPassword, resetPasswordField } = useResetPassword();
	const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed'>('loading');
	const [tokenVerified, setTokenVerified] = useState<boolean>(false);

	const [formError, setFormError] = useState<string[]>([]);
	const verifyResetTokenDispatch = useAppAsyncDispatch(verifyResetToken);
	const newPasswordDispatch = useAppAsyncDispatch<NewPasswordPayload>(setNewPassword);

	const { error } = useTypedSelector<UserState>('user');

	const {
		onSubmit, registeredValue, isFormValid
	} = Form.useForm({ fields: resetPasswordField });

	useEffect(() => {
		hasToken();
	}, []);

	const hasToken = async () => {
		try {
			if (!searchParams.get('token')) return navigate.replace('/login');

			// verify token if present
			setVerificationStatus('loading');
			await verifyResetTokenDispatch({
				queryParam: {
					token: searchParams.get('token')
				}
			});
			setVerificationStatus('success');

			// need timeout to wait for animation
			setTimeout(() => {
				setTokenVerified(true);
			}, 1200);

		} catch (error) {
			setVerificationStatus('failed');
		}
		// redirect to login page if user manualy navigate to this page
	};

	if (!tokenVerified)
		return <SpinVerification status={ verificationStatus } />;

	const validateForm = (form: typeof resetPasswordField) => {
		const errors = [];

		if (form.confirm_password.value !== form.new_password.value) {
			errors.push('Kata sandi dan Konfirmasi tidak sama');
		}
		if (!form.confirm_password.value) {
			errors.push('Konfirmasi kata sandi harus di isi');
		}
		if (!form.new_password.value) {
			errors.push('Kata sandi baru harus di isi');
		}

		setFormError(errors);
		return !isEmpty(errors);
	};

	const onSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
		try {
			const { new_password, confirm_password } = onSubmit(evt);
			const hasErorr = validateForm(onSubmit(evt));
			if (!hasErorr) {
				await newPasswordDispatch({
					queryParam: {
						token: searchParams.get('token')
					},
					payload: {
						new_password: new_password.value,
						confirm_password: confirm_password.value
					}
				});
				navigate.replace('/login?ref=reset&stat=true');
			}
		} catch (error) {

		}

	};

	if (tokenVerified)
		return (
			<ResetPasswordStyle>

				<div className='grid max-sm:grid-cols-2 grid-cols-3 max-sm:gap-0 gap-3 w-full'>
					<div className='col-span-2'>
						<Form className='register min-h-screen flex flex-col items-center justify-center max-sm:w-full max-lg:w-[90%] max-2xl:w-5/6 w-3/5 m-auto'
							autoComplete='off'
							onSubmit={ onSubmitForm }	>
							<div className='w-full'>
								<Link href='/'>
									<Images.LogoRSPI className='max-2xl:mb-2 mb-8' />
								</Link>
								<Text fontType='h1' fontSize='32px' fontWeight='900' color={ colors.grey.darker } lineHeight='48px' subClassName='max-lg:leading-8 max-lg:text-[20px]'>
									{ heading }
								</Text>
								<Text fontType='h4' fontSize='20px' color={ colors.grey.dark } className='mt-4 max-2xl:mb-6 mb-16' subClassName='max-lg:text-[16px] max-lg:leading-[24px]'>
									{ subHeading }
								</Text>
							</div>
							{
								!isEmpty(formError) || error.stat_code &&
								<div className='w-full mb-[16px]'>
									<NotificationPanel
										mode={ 'error' }
										visible={ true }
										showIconRight={ false }
									// onClickRightIcon={ handleNotifOnClose }
									>
										<ul>
											{ formError.map((err, key) => (<li key={ key }>{ err }</li>)) }
											{ error && <li>{ error.stat_msg === 'token is expired' }</li> }
										</ul>
									</NotificationPanel>
								</div>
							}
							<section className='mt-[32px] w-full'>
								<Form.FormGroup className='group-wrapper w-full'>
									<Form.TextField placeholder={ newPasswordPlaceHolder } { ...registeredValue('new_password') } label={ newPasswordLabel } />
								</Form.FormGroup>
								<Form.FormGroup className='group-wrapper w-full'>
									<Form.TextField placeholder={ newPasswordConfirmationPlaceholder } { ...registeredValue('confirm_password') } label={ newPasswordConfirmationLabel } />
								</Form.FormGroup>
							</section>
							<Button
								label={ resetBtnLabel }
								theme='primary'
								hoverTheme='outline'
								type='submit'
								className='w-full mt-[64px]'
							/>
						</Form>
					</div>
					<div className='max-sm:hidden col-span-1 h-full w-full bg-no-repeat bg-cover bg-center' style={ { backgroundImage: `url(${ Images.AuthRightBG })` } } />
				</div>
			</ResetPasswordStyle >
		);

	return null;
};

export default ResetPassword;