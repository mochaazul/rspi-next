'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useFormik, FormikProps } from 'formik';

import { Images, colors } from '@/constant';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Form from '@/components/ui/Form';
// import NotificationPanel from '@/components/ui/NotificationPanel';
import SpinVerification from '@/components/ui/SpinVerification';
import { useScopedI18n } from '@/locales/client';
import { ResetPasswordSchema } from '@/validator/auth';
import { verifyResetToken, setNewPassword } from '@/lib/api/auth';
import { NewPasswordPayload, ResponseStatus } from '@/interface';

import { ResetPasswordStyle } from './style';

const ResetPassword = () => {
	const navigate = useRouter();
	const searchParams = useSearchParams()!;
	const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed'>('loading');
	const [tokenVerified, setTokenVerified] = useState<boolean>(false);

	const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [error, setError] = useState<ResponseStatus>({
		stat_code: '',
		stat_msg: ''
	});
	const formikResetPassword: FormikProps<NewPasswordPayload> = useFormik<NewPasswordPayload>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: ResetPasswordSchema,
		initialValues: {
			new_password: '',
			confirm_password: ''
		},
		onSubmit: async (formResetPassword: NewPasswordPayload) => {
			setLoadingSubmit(true);

			const response = await setNewPassword(searchParams.get('token') ?? '', formResetPassword);

			if (response?.stat_code !== 'APP:SUCCESS') {
				setError({
					stat_code: response?.stat_code,
					stat_msg: response?.stat_msg
				});
			} else {
				navigate.replace('/login?ref=reset&stat=true');
			}

			setLoadingSubmit(false);
			setEnableValidation(false);
		}
	});

	const languages = useScopedI18n('page.resetPassword');

	useEffect(() => {
		hasToken();
	}, []);

	const hasToken = async () => {
		try {
			if (!searchParams.get('token')) return navigate.replace('/login');

			// verify token if present
			setVerificationStatus('loading');
			const response = await verifyResetToken(searchParams.get('token') ?? '');

			if (response?.stat_code === 'APP:SUCCESS') {
				setVerificationStatus('success');

				// need timeout to wait for animation
				setTimeout(() => {
					setTokenVerified(true);
				}, 1200);
			} else {
				setVerificationStatus('failed');
			}
		} catch (error) {
			setVerificationStatus('failed');
		}
		// redirect to login page if user manualy navigate to this page
	};

	if (!tokenVerified)
		return <SpinVerification status={ verificationStatus } />;

	const onSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setEnableValidation(true);
		setError({
			stat_code: '',
			stat_msg: ''
		});
		formikResetPassword.handleSubmit();
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
									{ languages('heading') }
								</Text>
								<Text fontType='h4' fontSize='20px' color={ colors.grey.dark } className='mt-4 max-2xl:mb-6 mb-16' subClassName='max-lg:text-[16px] max-lg:leading-[24px]'>
									{ languages('subHeading') }
								</Text>
							</div>
							{
								error.stat_code &&
								<div className='w-full mb-[16px]'>
									{/** TODO: setelah merge migration/login uncomment: */ }
									{/* <NotificationPanel
										mode={ 'error' }
										visible={ true }
										showIconRight={ false }
									// onClickRightIcon={ handleNotifOnClose }
									> */}
									{ error && <span>{ error.stat_msg }</span> }
									{/* </NotificationPanel> */ }
								</div>
							}
							<section className='mt-[32px] w-full'>
								<Form.FormGroup className='group-wrapper w-full'>
									<Form.TextField
										id='new_password'
										placeholder={ languages('resetForm.newPasswordPlaceHolder') }
										value={ formikResetPassword.values.new_password }
										onChange={ e => formikResetPassword.setFieldValue(e.target.id, e.target.value) }
										type='password'
										errorMessage={ formikResetPassword.errors.new_password }
										isError={ !!formikResetPassword.errors.new_password }
										label={ languages('resetForm.newPasswordLabel') }
									/>
								</Form.FormGroup>
								<Form.FormGroup className='group-wrapper w-full'>
									<Form.TextField
										id='confirm_password'
										placeholder={ languages('resetForm.newPasswordConfirmationPlaceholder') }
										label={ languages('resetForm.newPasswordConfirmationLabel') }
										value={ formikResetPassword.values.confirm_password }
										onChange={ e => formikResetPassword.setFieldValue(e.target.id, e.target.value) }
										type='password'
										errorMessage={ formikResetPassword.errors.confirm_password }
										isError={ !!formikResetPassword.errors.confirm_password }
									/>
								</Form.FormGroup>
							</section>
							<Button
								label={ languages('resetForm.resetBtnLabel') }
								theme='primary'
								hoverTheme='outline'
								type='submit'
								className='w-full mt-[64px]'
								disabled={ loadingSubmit }
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