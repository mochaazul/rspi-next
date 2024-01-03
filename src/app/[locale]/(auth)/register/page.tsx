'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormikProps, useFormik } from 'formik';
import Image from 'next/image';

import { RegisterType, UserData } from '@/interface';
import { colors, Images } from '@/constant';

import InfoModal from '@/components/ui/PageComponents/RegisterSections/InfoModal';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Form from '@/components/ui/Form';
import NotificationPanel from '@/components/ui/NotificationPanel';
import PrivacyPolicyModal from '@/components/ui/PrivacyPolicyModal';
import { useScopedI18n } from '@/locales/client';
import { RegisterSchema } from '@/validator/auth';
import { register } from '@/lib/api/auth';
import { getValidationTranslation } from '@/helpers/getValidationTranslation';

import RegisterPageStyle from './style';

const RegisterPage = () => {
	const navigate = useRouter();

	const [infoBoxVisible, setInfoBoxVisible] = useState<boolean>(false);
	const [notifVisible, setNotifVisible] = useState<boolean>(false);
	const [showModalPrivacyTnc, setShowModalPrivacyTnc] = useState<boolean>(false);
	const [formRegister, setFormRegister] = useState<RegisterType>({
		email: '',
		password: '',
		confirm_password: ''
	});
	const [inputPasswordType, setInputPasswordType] = useState<Record<string, string>>({
		password: 'password',
		confirm_password: 'password'
	});
	const [loadingUser, setLoadingUser] = useState<boolean>(false);
	const [userData, setUserData] = useState<UserData | null>(null);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [loadingOnBoarding, setLoadingOnBoarding] = useState<boolean>(false);

	const formikRegister: FormikProps<RegisterType> = useFormik<RegisterType>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: RegisterSchema,
		initialValues: {
			email: '',
			password: '',
			confirm_password: ''
		},
		onSubmit: (formRegisterValues: RegisterType) => {
			setFormRegister(formRegisterValues);
			setShowModalPrivacyTnc(true);
		}
	});

	const t = useScopedI18n('page.registerPage');
	const tValidation = useScopedI18n('validation.formValidation');

	const togglePasswordShow = (inputKey: string) => {
		setInputPasswordType(prevType => ({
			...prevType,
			[inputKey]: prevType[inputKey] === 'password' ? 'text' : 'password'
		}));
	};

	const toggleInfoBox = (open: boolean) => () => {
		setInfoBoxVisible(open);
		navigate.replace('/');
	};

	const handleNotifOnClose = () => {
		setNotifVisible(false);
	};

	const resetStateModal = () => {
		setShowModalPrivacyTnc(false);
	};

	const onClickRegister = async () => {
		try {
			setLoadingUser(true);

			const response = await register(formRegister);

			if (response?.stat_code === 'APP:SUCCESS') {
				setInfoBoxVisible(true);
				setUserData(response?.data);
			} else {
				setErrorMessage(response?.stat_msg ?? '');
			}
		} catch (error: any) {
			setErrorMessage(error?.message ?? '');
		} finally {
			setNotifVisible(true);
			setLoadingUser(false);
		}
	};

	const getInputErrorMessage = (key?: string, label?: string) => {
		return getValidationTranslation(tValidation, key, { label });
	};

	return (
		<RegisterPageStyle>
			<div className='min-h-[calc(100svh-64px)] md:min-h-screen flex max-md:flex-col flex-grow max-md:justify-between h-full md:grid md:grid-cols-3 md:gap-3 w-full'>
				<div className='md:col-span-2 flex-1 relative overflow-hidden h-full md:items-center md:flex'>
					<Form className={ `
					max-md:py-6 max-md:container-page
					md:p-8 flex flex-col md:items-center md:justify-center max-md:w-full max-lg:w-[90%] max-2xl:w-5/6 w-3/5 md:m-auto
					` }
						onSubmit={ e => {
							e.preventDefault();
							setEnableValidation(true);
							setErrorMessage('');
							setNotifVisible(false);
							formikRegister.handleSubmit();
						} }
						autoComplete='off'
					>
						<div className='w-full '>
							<div className='hidden md:flex mb-2 xl:mb-8'>
								<Link href='/'>
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
									mode={ errorMessage ? 'error' : 'success' }
									visible={ notifVisible && !!errorMessage && !loadingUser }
									text={ errorMessage ? errorMessage : userData?.email ? t('notificationMessage.onSuccess') : t('notificationMessage.onError') }
									onClickRightIcon={ handleNotifOnClose }
								/>
							</div>
						}
						<Form.FormGroup className={ `group-wrapper w-full ${ notifVisible ? '' : 'pt-[26px]' }` }>
							<Form.TextField
								id='email'
								name='email'
								placeholder={ t('form.emailPlaceholder') }
								label={ t('form.emailLabel') }
								className='w-full'
								type='email'
								value={ formikRegister.values.email }
								errorMessage={ getInputErrorMessage(formikRegister.errors.email, t('form.emailLabel')) }
								isError={ !!formikRegister.errors.email }
								onChange={ formikRegister.handleChange }
							/>
						</Form.FormGroup>
						<Form.FormGroup className='group-wrapper w-full'>
							<Form.TextField
								id='password'
								name='password'
								placeholder={ t('form.passwordLabel') }
								label={ t('form.passwordLabel') }
								className='w-full'
								type={ inputPasswordType.password }
								iconName={ inputPasswordType.password === 'password' ? 'EyeClosed' : 'Eye' }
								iconPosition='right'
								onIconClick={ () => togglePasswordShow('password') }
								value={ formikRegister.values.password }
								errorMessage={ getInputErrorMessage(formikRegister.errors.password, t('form.passwordLabel')) }
								isError={ !!formikRegister.errors.password }
								onChange={ formikRegister.handleChange }
								infoMessage={ t('form.passwordHint') }
							/>
						</Form.FormGroup>
						<Form.FormGroup className='group-wrapper w-full'>
							<Form.TextField
								id='confirm_password'
								name='confirm_password'
								placeholder={ t('form.passwordConfirmationPlaceholder') }
								label={ t('form.passwordConfirmationLabel') }
								className='w-full'
								iconName={ inputPasswordType.confirm_password === 'password' ? 'EyeClosed' : 'Eye' }
								iconPosition='right'
								type={ inputPasswordType.confirm_password }
								onIconClick={ () => togglePasswordShow('confirm_password') }
								value={ formikRegister.values.confirm_password }
								errorMessage={ getInputErrorMessage(formikRegister.errors.confirm_password, t('form.passwordConfirmationLabel')) }
								isError={ !!formikRegister.errors.confirm_password }
								infoMessage={ t('form.passwordHint') }
								onChange={ formikRegister.handleChange }
							/>
						</Form.FormGroup>
						<Button
							label={ t('registerBtnLabel') }
							theme='primary'
							type='submit'
							className='w-full mt-6'
							disabled={ loadingUser }
						/>
						<Text fontType={ null } fontSize='24px' fontWeight='400' color={ colors.grey.dark } className='max-md:hidden max-2xl:mt-5 mt-8 max-md:text-[14px] text-[20px]'>
							{ t('footer.hasAccountLabel') }&nbsp;
							<Link href='/login'>
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
						{ t('footer.hasAccountLabelMobile') }
					</Text>
					<Link href='/login' className='w-full'>
						<Button theme='outline' $hoverTheme='primary' className='w-full py-3'>
							{ t('footer.loginBtnLabel') }
						</Button>
					</Link>
				</div>
			</div>
			{ infoBoxVisible && (
				<InfoModal
					emailUser={ userData?.email ?? '' }
					visible={ infoBoxVisible }
					onClose={ toggleInfoBox(false) }
					onOK={ toggleInfoBox(false) }
				/>
			) }
			{ showModalPrivacyTnc && (
				<PrivacyPolicyModal
					loading={ loadingOnBoarding || loadingUser }
					isOpen={ showModalPrivacyTnc }
					onFinish={ async () => {
						setLoadingOnBoarding(true);
						await onClickRegister();
						resetStateModal();
						setLoadingOnBoarding(false);
					} }
					onClose={ () => setShowModalPrivacyTnc(false) }
				/>
			) }
		</RegisterPageStyle>
	);
};

export default RegisterPage;
