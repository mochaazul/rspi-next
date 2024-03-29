'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useFormik, FormikProps } from 'formik';

import { Images, colors } from '@/constant';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Form from '@/components/ui/Form';
import NotificationPanel from '@/components/ui/NotificationPanel';
import SpinVerification from '@/components/ui/SpinVerification';
import { useScopedI18n } from '@/locales/client';
import { ResetPasswordSchema } from '@/validator/auth';
import { useSetNewPassword } from '@/lib/api/client/auth';
import { NewPasswordPayload, ResponseStatus } from '@/interface';
import { getValidationTranslation } from '@/helpers/getValidationTranslation';
import { verifyResetToken } from '@/lib/api/auth';

import { ResetPasswordStyle } from './style';

const ResetPassword = () => {
	const navigate = useRouter();
	const searchParams = useSearchParams()!;

	const { trigger: setNewPassword, isMutating: loadingSubmit } = useSetNewPassword();

	const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed'>('loading');
	const [tokenVerified, setTokenVerified] = useState<boolean>(false);

	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [error, setError] = useState<ResponseStatus>({
		stat_code: '',
		stat_msg: ''
	});
	const [inputPasswordType, setInputPasswordType] = useState<Record<string, string>>({
		new_password: 'password',
		confirm_password: 'password'
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
			try {
				await setNewPassword({
					query: { token: searchParams.get('token') ?? '' },
					body: formResetPassword
				});

				navigate.replace('/login?ref=reset&stat=true');
			} catch (error: any) {
				setError({ stat_msg: error?.message });
			} finally {
				setEnableValidation(false);
			}
		}
	});

	const t = useScopedI18n('page.resetPassword');
	const tValidation = useScopedI18n('validation.formValidation');

	const hasToken = async () => {
		try {
			const token: string = searchParams.get('token') ?? '';
			// redirect to login page if user manualy navigate to this page
			if (!token) return navigate.replace('/login');

			// verify token if present
			setVerificationStatus('loading');
			const response = await verifyResetToken(token);
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
	};

	useEffect(() => {
		hasToken();
	}, []);

	if (!tokenVerified) {
		return <SpinVerification status={ verificationStatus } />;
	}

	const onSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setEnableValidation(true);
		setError({
			stat_code: '',
			stat_msg: ''
		});
		formikResetPassword.handleSubmit();
	};

	const togglePasswordShow = (inputKey: string) => {
		setInputPasswordType(prevType => ({
			...prevType,
			[inputKey]: prevType[inputKey] === 'password' ? 'text' : 'password'
		}));
	};

	const getInputErrorMessage = (key?: string, label?: string) => {
		return getValidationTranslation(tValidation, key, { label });
	};

	if (tokenVerified)
		return (
			<ResetPasswordStyle>

				<div className='grid max-md:grid-cols-2 grid-cols-3 max-md:gap-0 gap-3 w-full'>
					<div className='col-span-2'>
						<Form
							className='max-md:py-6 max-md:px-4 md:p-8 min-h-screen flex flex-col items-center md:justify-center max-md:w-full max-lg:w-[90%] max-2xl:w-5/6 w-3/5 m-auto'
							autoComplete='off'
							onSubmit={ onSubmitForm }	>
							<div className='w-full'>
								<Link href='/' className='hidden md:flex mb-2 xl:mb-8'>
									<Image
										src='/images/logo_rspi.svg'
										alt='rspi-logo'
										width={ 132 }
										height={ 60 }
									/>
								</Link>
								<Text fontType='h1' fontSize='32px' fontWeight='900' color={ colors.grey.darker } lineHeight='48px' subClassName='max-lg:leading-8 max-lg:text-[20px]'>
									{ t('heading') }
								</Text>
								<Text fontType='h4' fontSize='20px' color={ colors.grey.dark } className='mt-2 md:mt-4 mb-8 md:mb-16' subClassName='max-lg:text-base md:!leading-normal'>
									{ t('subHeading') }
								</Text>
							</div>
							{
								error?.stat_msg &&
								<div className='w-full mb-[16px]'>
									<NotificationPanel
										mode={ 'error' }
										visible={ true }
										showIconRight={ false }
									// onClickRightIcon={ handleNotifOnClose }
									>
										{ error && <span>{ error.stat_msg }</span> }
									</NotificationPanel>
								</div>
							}
							<div className='w-full'>
								<Form.FormGroup className='group-wrapper w-full'>
									<Form.TextField
										id='new_password'
										name='new_password'
										placeholder={ t('resetForm.newPasswordPlaceHolder') }
										value={ formikResetPassword.values.new_password }
										onChange={ formikResetPassword.handleChange }
										errorMessage={ getInputErrorMessage(formikResetPassword.errors.new_password, t('resetForm.newPasswordLabel')) }
										isError={ !!formikResetPassword.errors.new_password }
										label={ t('resetForm.newPasswordLabel') }
										iconName={ inputPasswordType.new_password === 'password' ? 'EyeClosed' : 'Eye' }
										iconPosition='right'
										type={ inputPasswordType.new_password }
										onIconClick={ () => togglePasswordShow('new_password') }
									/>
								</Form.FormGroup>
								<Form.FormGroup className='group-wrapper w-full'>
									<Form.TextField
										id='confirm_password'
										name='confirm_password'
										placeholder={ t('resetForm.newPasswordConfirmationPlaceholder') }
										label={ t('resetForm.newPasswordConfirmationLabel') }
										value={ formikResetPassword.values.confirm_password }
										onChange={ formikResetPassword.handleChange }
										type={ inputPasswordType.confirm_password }
										iconName={ inputPasswordType.confirm_password === 'password' ? 'EyeClosed' : 'Eye' }
										iconPosition='right'
										errorMessage={ getInputErrorMessage(formikResetPassword.errors.confirm_password, t('resetForm.newPasswordConfirmationLabel')) }
										isError={ !!formikResetPassword.errors.confirm_password }
										onIconClick={ () => togglePasswordShow('confirm_password') }
									/>
								</Form.FormGroup>
							</div>
							<Button
								label={ t('resetForm.resetBtnLabel') }
								theme='primary'
								type='submit'
								className='w-full mt-6 md:mt-12'
								disabled={ loadingSubmit }
							/>
						</Form>
					</div>
					<div className='max-md:hidden col-span-1 h-full w-full bg-no-repeat bg-cover bg-center' style={ { backgroundImage: `url(${ Images.AuthRightBG })` } } />
				</div>
			</ResetPasswordStyle>
		);

	return null;
};

export default ResetPassword;