'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { FormikProps, useFormik } from 'formik';
import Image from 'next/image';

import { LoginType, ResponseStatus } from '@/interface';
import { colors, Images } from '@/constant';

import { login } from '@/lib/api/auth';
import { useRequestVerifyEmail } from '@/lib/api/client/auth';
import { LoginSchema } from '@/validator/auth';
import { useScopedI18n } from '@/locales/client';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Form from '@/components/ui/Form';
import LoadingScreen from '@/components/ui/LoadingScreen';
import NotificationPanel, { PropsTypes as NotificationPanelTypes } from '@/components/ui/NotificationPanel';
import { getValidationTranslation } from '@/helpers/getValidationTranslation';

import LoginPageStyle from './style';

const LoginPage = () => {
	const navigate = useRouter();
	const pathname = usePathname();
	const searchParam = useSearchParams()!;
	const { trigger: requestVerifyEmail } = useRequestVerifyEmail();
	const t = useScopedI18n('page.loginPage');
	const tValidation = useScopedI18n('validation.formValidation');

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
	const [loadingNavigate, setLoadingNavigate] = useState<boolean>(false);

	const formik: FormikProps<LoginType> = useFormik<LoginType>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: LoginSchema,
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: async(formLogin: LoginType) => {
			try {
				setLoadingSubmit(true);

				const response = await login(formLogin);

				if (response?.stat_code === 'APP:SUCCESS') {
					setSuccessMessage(`${ t('welcome') } ${ response?.data?.email }`);
					setNotifMode('success');
					setLoadingNavigate(true);

					if (searchParam.get('callbackUrl')) {
						// TODO: To be removed since there is blacklist checking on doctor profile
						// this callback url can be used a way to bypass blacklist checking
						// const callbackUrl = decodeURIComponent(searchParam.get('callbackUrl') ?? '/');
						navigate.back();
					} else if (searchParam.get('ref') === 'unauthorized') { // handle route based on ref
						navigate.back();
					} else {
						navigate.replace('/');
					}

				} else {
					setErrorUser({
						stat_msg: response?.stat_msg ?? ''
					});
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

	useEffect(() => {
		refHandler();
	}, []);

	useEffect(() => {
		setLoadingNavigate(false);
	}, [pathname]);

	const initErrorNotif = () => {
		setNotifVisible(false);
		setErrorUser({ stat_code: '', stat_msg: '' });
	};

	const refHandler = () => {
		const ref = searchParam.get('ref');
		const stat = searchParam.get('stat');
		if (ref === 'reset' && stat === 'true') {
			setNotifMode('success');
			setSuccessMessage(t('resetPasswordSuccess'));
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
			setSuccessMessage(t('resetEmailSuccess'));
			setNotifVisible(true);
		}
	};

	const togglePasswordShow = () => {
		setInputPasswordType(prevType => prevType === 'password' ? 'text' : 'password');
	};

	const handleNotifOnClose = () => {
		setNotifVisible(false);
	};

	const handleResendEmailVerification = async() => {
		try {
			initErrorNotif();
			await requestVerifyEmail({ email: formik.values.email });
			setSuccessMessage(t('notificationMessage.emailNotVerified.successMessage'));
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

		if (text?.toLowerCase() === 'email belum di verifikasi' || text?.toLowerCase() === 'you haven\'t verified your email') {
			return (
				<Text fontType={ null } fontSize='14px' fontWeight='500' color={ colors.red.default }>
					{ t('notificationMessage.emailNotVerified.heading') }&nbsp;
					<Text
						fontType={ null }
						fontSize='14px'
						fontWeight='700'
						className='inline-block underline cursor-pointer'
						color={ colors.red.redder }
						onClick={ handleResendEmailVerification }
					>
						{ t('notificationMessage.emailNotVerified.cta') }
					</Text>
					&nbsp;{ t('notificationMessage.emailNotVerified.tail') }
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

	const getInputErrorMessage = (key?: string, label?: string) => {
		return getValidationTranslation(tValidation, key, { label });
	};

	return (
		<LoginPageStyle>
			<div className='min-h-[calc(100svh-64px)] md:min-h-screen flex max-md:flex-col flex-grow max-md:justify-between h-full md:grid md:grid-cols-3 md:gap-3 w-full'>
				<div className='md:col-span-2 flex-1 relative overflow-hidden h-full md:items-center md:flex'>
					<Form className={ `
					max-md:py-6 max-md:container-page
					md:p-8 flex flex-col md:items-center md:justify-center max-md:w-full max-lg:w-[90%] max-2xl:w-5/6 w-3/5 md:m-auto
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
							<div className='hidden md:flex mb-2 xl:mb-8'>
								<Link href='/' className='flex'>
									<Image
										src='/images/logo_rspi.svg'
										alt='rspi-logo'
										width={ 132 }
										height={ 60 }
									/>
								</Link>
							</div>
							<Text fontType='h1' fontSize='32px' fontWeight='900' color={ colors.grey.darker } lineHeight='48px' subClassName='max-md:leading-8 max-md:text-[20px]'>
								{ t('heading') }
							</Text>
							<Text fontType='h4' fontSize='20px' color={ colors.grey.dark } className='mt-2 md:mt-3 mb-4' subClassName='max-md:text-base max-md:leading-6 md:!leading-normal'>
								{ t('subHeading') }
							</Text>
						</div>
						{
							notifVisible &&
							<div className='w-full mb-[60px] md:mb-8'>
								<NotificationPanel
									mode={ notifMode }
									visible={ notifVisible && !loadingSubmit }
									onClickRightIcon={ handleNotifOnClose }
								>
									{ handleNotifError() }
								</NotificationPanel>
							</div>
						}
						<Form.FormGroup className={ `group-wrapper w-full ${ notifVisible ? '' : 'pt-[26px]' }` }>
							<Form.TextField
								id='email'
								placeholder={ t('form.emailPlaceholder') }
								className='w-full'
								type='email'
								name='email'
								label={ t('form.emailLabel') }
								value={ formik.values.email }
								onChange={ formik.handleChange }
								errorMessage={ getInputErrorMessage(formik.errors.email, t('form.emailLabel')) }
								isError={ !!formik.errors.email }
							/>
						</Form.FormGroup>
						<Form.FormGroup className='group-wrapper w-full'>
							<Form.TextField
								id='password'
								name='password'
								placeholder={ t('form.passwordPlaceholder') }
								className='w-full'
								iconName={ inputPasswordType === 'password' ? 'EyeClosed' : 'Eye' }
								iconPosition='right'
								type={ inputPasswordType }
								onIconClick={ togglePasswordShow }
								value={ formik.values.password }
								label={ t('form.passwordLabel') }
								onChange={ formik.handleChange }
								errorMessage={ getInputErrorMessage(formik.errors.password, t('form.passwordLabel')) }
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
									{ t('forgotPasswordLabel') }
								</Text>
							</Link>
						</div>
						<Button
							label={ t('loginBtnLabel') }
							type='submit'
							className='w-full mt-2'
							disabled={ loadingSubmit }
						/>
						<Text fontType={ null } fontWeight='400' color={ colors.grey.dark } className='max-md:hidden text-xl mt-5 2xl:mt-8'>
							{ t('footer.notRegisteredLabel') }&nbsp;
							<Link href='/register'>
								<Text
									className='inline-block max-md:text-[14px] text-[20px]'
									fontType={ null }
									fontWeight='700'
									color={ colors.paradiso.default }
								>
									{ t('footer.cta') }
								</Text>
							</Link>
						</Text>
					</Form>
				</div>
				<div className='max-md:hidden col-span-1 h-full w-full bg-no-repeat bg-cover bg-center' style={ { backgroundImage: `url(${ Images.AuthRightBG })` } } />

				<div className='w-full py-6 container-page flex flex-col gap-3 items-center md:hidden'>
					<Text fontSize='16px' lineHeight='24px' fontType={ null } color={ colors.grey.darkOpacity }>
						{ t('footer.notRegisteredLabelMobile') }
					</Text>
					<Link href='/register' className='w-full'>
						<Button theme='outline' $hoverTheme='primary' className='w-full py-3'>
							{ t('footer.registerBtnLabel') }
						</Button>
					</Link>
				</div>
			</div>

			<LoadingScreen show={ loadingNavigate } />
		</LoginPageStyle>
	);
};

export default LoginPage;
