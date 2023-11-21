'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormikProps, useFormik } from 'formik';

import { LoginType, ResponseStatus } from '@/interface';
import { colors, Images } from '@/constant';

import { login } from '@/lib/api/auth';
import { useRequestVerifyEmail } from '@/lib/api/client/auth';
import { LoginSchema } from '@/validator/auth';
import { useScopedI18n } from '@/locales/client';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Form from '@/components/ui/Form';
import NotificationPanel, { PropsTypes as NotificationPanelTypes } from '@/components/ui/NotificationPanel';

import LoginPageStyle from './style';

const LoginPage = () => {
	const navigate = useRouter();
	const searchParam = useSearchParams()!;
	const { trigger: requestVerifyEmail } = useRequestVerifyEmail();

	const [notifVisible, setNotifVisible] = useState(false);
	const [notifMode, setNotifMode] = useState<NotificationPanelTypes['mode']>('success');
	const [inputPasswordType, setInputPasswordType] = useState<string>('password');
	const [errorUser, setErrorUser] = useState<ResponseStatus>({
		stat_code: '',
		stat_msg: ''
	});
	const [successMessage, setSuccessMessage] = useState<string>('');
	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

	const formik: FormikProps<LoginType> = useFormik<LoginType>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: LoginSchema,
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: async (formLogin: LoginType) => {
			try {
				setLoadingSubmit(true);

				const response = await login(formLogin);

				if (response?.stat_code === 'APP:SUCCESS') {
					setSuccessMessage(`${ languages('welcome') } ${ response?.data?.email }`);
					setNotifMode('success');
					navigate.replace('/');
				} else {
					setErrorUser({ stat_msg: response?.stat_msg ?? '' });
					setNotifMode('error');
				}
			} catch (error: any) {
				setErrorUser({ stat_msg: error?.message ?? '' });
				setNotifMode('error');
			} finally {
				setLoadingSubmit(false);
				setNotifVisible(true);
			}
		}
	});
	const languages = useScopedI18n('page.loginPage');

	useEffect(() => {
		refHandler();
	}, []);

	const initErrorNotif = () => {
		setNotifVisible(false);
		setErrorUser({ stat_code: '', stat_msg: '' });
	};

	const refHandler = () => {
		const ref = searchParam.get('ref');
		const stat = searchParam.get('stat');
		if (ref === 'reset' && stat === 'true') {
			setNotifMode('success');
			setSuccessMessage(languages('resetPasswordSuccess'));
			setNotifVisible(true);
		}
		if (ref === 'invalid-token') {
			setNotifMode('error');
			setNotifVisible(true);
		}
		if (ref === 'sso') {
			setNotifMode('error');
			setNotifVisible(true);
		}

		if (ref === 'reset' && stat === 'email') {
			setNotifMode('success');
			setSuccessMessage(languages('resetEmailSuccess'));
			setNotifVisible(true);
		}
	};

	const togglePasswordShow = () => {
		setInputPasswordType(prevType => prevType === 'password' ? 'text' : 'password');
	};

	const handleNotifOnClose = () => {
		setNotifVisible(false);
	};

	const handleResendEmailVerification = async () => {
		try {
			initErrorNotif();
			await requestVerifyEmail({ email: formik.values.email });
			setSuccessMessage(languages('notificationMessage.emailNotVerified.successMessage'));
			setNotifMode('success');
		} catch (error: any) {
			setErrorUser({ stat_msg: error?.message ?? '' });
			setNotifMode('error');
		} finally {
			setNotifVisible(true);
		}
	};

	const handleNotifError = () => {
		const ref = searchParam.get('ref');
		const text =
			ref === 'invalid-token'
				? 'Keluar, karena sesi anda telah berakhir, Silahkan login kembali'
				: ref === 'sso'
					? 'Akun anda terdeteksi telah masuk pada device lain. Silahkan login kembali'
					: errorUser?.stat_msg
						? errorUser?.stat_msg
						: successMessage;

		if (text === 'email is not verified') {
			return (
				<Text fontType={ null } fontSize='14px' fontWeight='500' color={ colors.red.default }>
					{ languages('notificationMessage.emailNotVerified.heading') }&nbsp;
					<Text
						fontType={ null }
						fontSize='14px'
						fontWeight='700'
						className='inline-block underline cursor-pointer'
						color={ colors.red.redder }
						onClick={ handleResendEmailVerification }
					>
						{ languages('notificationMessage.emailNotVerified.cta') }
					</Text>
					&nbsp;{ languages('notificationMessage.emailNotVerified.tail') }
				</Text>
			);
		}
		return <Text
			fontType={ null }
			fontSize='14px'
			fontWeight='500'
			text={ text }
			color={ notifMode === 'error' ? colors.red.default : colors.black.default }
		/>;
	};

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		formik.setFieldValue(e.target.id, e.target.value);
	};

	return (
		<LoginPageStyle>
			<div className='grid max-sm:grid-cols-2 grid-cols-3 max-sm:gap-0 gap-3 w-full'>
				<div className='col-span-2'>
					<Form className={ `
					p-4
					md:p-8
					login min-h-screen flex flex-col items-center justify-center max-sm:w-full max-lg:w-[90%] max-2xl:w-5/6 w-3/5 m-auto
					` }
						onSubmit={ (e: React.SyntheticEvent) => {
							e.preventDefault();
							initErrorNotif();
							setEnableValidation(true);
							formik.handleSubmit();
						} }
						autoComplete='off'
					>
						<div className='w-full'>
							<div className='hidden sm:flex max-2xl:mb-2 mb-8'>
								<Link href='/' className='flex'>
									<Images.LogoRSPI />
								</Link>
							</div>
							<Text fontType='h1' fontSize='32px' fontWeight='900' color={ colors.grey.darker } lineHeight='48px' subClassName='max-lg:leading-8 max-lg:text-[20px]'>
								{ languages('heading') }
							</Text>
							<Text fontType='h4' fontSize='20px' color={ colors.grey.dark } className='mt-4 max-2xl:mb-6 mb-16' subClassName='max-lg:text-[16px] max-lg:leading-[24px]'>
								{ languages('subHeading') }
							</Text>
						</div>
						{
							notifVisible &&
							<div className='w-full mb-[32px]'>
								<NotificationPanel
									mode={ notifMode }
									visible={ notifVisible && !loadingSubmit }
									onClickRightIcon={ handleNotifOnClose }
								>
									{ handleNotifError() }
								</NotificationPanel>
							</div>
						}
						<Form.FormGroup className='group-wrapper w-full'>
							<Form.TextField
								id='email'
								placeholder={ languages('form.emailPlaceholder') }
								className='w-full'
								type='email'
								name='email'
								label={ languages('form.emailLabel') }
								value={ formik.values.email }
								onChange={ onChangeInput }
								errorMessage={ formik.errors.email }
								isError={ !!formik.errors.email }
							/>
						</Form.FormGroup>
						<Form.FormGroup className='group-wrapper w-full'>
							<Form.TextField
								id='password'
								placeholder={ languages('form.passwordPlaceholder') }
								className='w-full'
								iconName={ inputPasswordType === 'password' ? 'EyeClosed' : 'Eye' }
								iconPosition='right'
								type={ inputPasswordType }
								onIconClick={ togglePasswordShow }
								value={ formik.values.password }
								label={ languages('form.passwordLabel') }
								onChange={ onChangeInput }
								errorMessage={ formik.errors.password }
								isError={ !!formik.errors.password }
							/>
						</Form.FormGroup>
						<div className='flex w-full'>
							<Link href='/forgot-password'>
								<Text
									className='mt-2 max-2xl:mb-4 mb-10'
									fontSize='14px'
									fontWeight='900'
									fontType={ null }
									color={ colors.paradiso.default }
								>
									{ languages('forgotPasswordLabel') }
								</Text>
							</Link>
						</div>
						<Button
							label={ languages('loginBtnLabel') }
							type='submit'
							className='w-full mt-2'
							disabled={ loadingSubmit }
						/>
						<Text fontType={ null } fontWeight='400' color={ colors.grey.dark } className='max-2xl:mt-5 mt-8 max-lg:text-[14px] text-[20px]'>
							{ languages('footer.notRegisteredLabel') }&nbsp;
							<Link href='/register'>
								<Text
									className='inline-block max-lg:text-[14px] text-[20px]'
									fontType={ null }
									fontWeight='700'
									color={ colors.paradiso.default }
								>
									{ languages('footer.cta') }
								</Text>
							</Link>
						</Text>
					</Form>
				</div>
				<div className='max-sm:hidden col-span-1 h-full w-full bg-no-repeat bg-cover bg-center' style={ { backgroundImage: `url(${ Images.AuthRightBG })` } } />
			</div>
		</LoginPageStyle>
	);
};

export default LoginPage;
