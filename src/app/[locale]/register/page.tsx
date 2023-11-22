'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormikProps, useFormik } from 'formik';

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
			<div className='grid max-sm:grid-cols-2 grid-cols-3 max-sm:gap-0 gap-3 w-full overflow-x-hidden'>
				<div className='col-span-2'>
					<Form className={ `
					p-4
					md:p-8
					register min-h-screen flex flex-col items-center justify-center max-sm:w-full max-lg:w-[90%] max-2xl:w-5/6 w-3/5 m-auto
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
							<div className='hidden sm:flex max-2xl:mb-2 mb-8'>
								<Link href='/' className='flex'>
									<Images.LogoRSPI />
								</Link>
							</div>
							<Text fontType='h1' fontSize='32px' fontWeight='900' color={ colors.grey.darker } lineHeight='48px' subClassName='max-lg:leading-8 max-lg:text-[20px]'>
								{ t('heading') }
							</Text>
							<Text fontType='h4' fontSize='20px' color={ colors.grey.dark } className='mt-4 max-2xl:mb-6 mb-16' subClassName='max-lg:text-[16px] max-lg:leading-[24px]'>
								{ t('subHeading') }
							</Text>
						</div>
						{
							notifVisible &&
							<div className='w-full mb-[32px]'>
								<NotificationPanel
									mode={ errorMessage ? 'error' : 'success' }
									visible={ notifVisible && !!errorMessage && !loadingUser }
									text={ errorMessage ? errorMessage : userData?.email ? t('notificationMessage.onSuccess') : t('notificationMessage.onError') }
									onClickRightIcon={ handleNotifOnClose }
								/>
							</div>
						}
						<Form.FormGroup className='group-wrapper w-full'>
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
							$hoverTheme='outline'
							type='submit'
							className='w-full mt-6'
							disabled={ loadingUser }
						/>
						<Text fontType={ null } fontSize='24px' fontWeight='400' color={ colors.grey.dark } className='max-2xl:mt-5 mt-8 max-lg:text-[14px] text-[20px]'>
							{ t('footer.hasAccountLabel') }&nbsp;
							<Link href='/login'>
								<Text
									className='inline-block max-lg:text-[14px] text-[20px]'
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
				<div className='max-sm:hidden col-span-1 h-full w-full bg-no-repeat bg-cover bg-center' style={ { backgroundImage: `url(${ Images.AuthRightBG })` } } />
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
