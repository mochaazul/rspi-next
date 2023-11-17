'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormikProps, useFormik } from 'formik';

import { RegisterType, UserData } from '@/interface';
import { colors, Images } from '@/constant';

import InfoModal from '@/components/PageComponents/RegisterSections/InfoModal';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Form from '@/components/ui/Form';
import NotificationPanel from '@/components/ui/NotificationPanel';
import PrivacyPolicyModal from '@/components/ui/PrivacyPolicyModal';
import { useScopedI18n } from '@/locales/client';
import { RegisterSchema } from '@/validator/auth';
import { register } from '@/lib/api/auth';

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

	const languages = useScopedI18n('page.registerPage');

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

			setInfoBoxVisible(true);
			setUserData(response?.data);
		} catch (error: any) {
			setErrorMessage(error?.message ?? '');
		} finally {
			setNotifVisible(true);
			setLoadingUser(false);
		}
	};

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		formikRegister.setFieldValue(e.target.id, e.target.value);
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
									mode={ errorMessage ? 'error' : 'success' }
									visible={ notifVisible && !!errorMessage && !loadingUser }
									text={ errorMessage ? errorMessage : userData?.email ? languages('notificationMessage.onSuccess') : languages('notificationMessage.onError') }
									onClickRightIcon={ handleNotifOnClose }
								/>
							</div>
						}
						<Form.FormGroup className='group-wrapper w-full'>
							<Form.TextField
								id='email'
								placeholder={ languages('form.emailPlaceholder') }
								label={ languages('form.emailLabel') }
								className='w-full'
								type='email'
								value={ formikRegister.values.email }
								errorMessage={ formikRegister.errors.email }
								isError={ !!formikRegister.errors.email }
								onChange={ onChangeInput }
							/>
						</Form.FormGroup>
						<Form.FormGroup className='group-wrapper w-full'>
							<Form.TextField
								id='password'
								placeholder={ languages('form.passwordLabel') }
								label={ languages('form.passwordLabel') }
								className='w-full'
								type={ inputPasswordType.password }
								iconName={ inputPasswordType.password === 'password' ? 'EyeClosed' : 'Eye' }
								iconPosition='right'
								onIconClick={ () => togglePasswordShow('password') }
								value={ formikRegister.values.password }
								errorMessage={ formikRegister.errors.password }
								isError={ !!formikRegister.errors.password }
								onChange={ onChangeInput }
								infoMessage={ languages('form.passwordHint') }
							/>
						</Form.FormGroup>
						<Form.FormGroup className='group-wrapper w-full'>
							<Form.TextField
								id='confirm_password'
								placeholder={ languages('form.passwordConfirmationPlaceholder') }
								label={ languages('form.passwordConfirmationLabel') }
								className='w-full'
								iconName={ inputPasswordType.confirm_password === 'password' ? 'EyeClosed' : 'Eye' }
								iconPosition='right'
								type={ inputPasswordType.confirm_password }
								onIconClick={ () => togglePasswordShow('confirm_password') }
								value={ formikRegister.values.confirm_password }
								errorMessage={ formikRegister.errors.confirm_password }
								isError={ !!formikRegister.errors.confirm_password }
								infoMessage={ languages('form.passwordHint') }
								onChange={ onChangeInput }
							/>
						</Form.FormGroup>
						<Button
							label={ languages('registerBtnLabel') }
							theme='primary'
							hoverTheme='outline'
							type='submit'
							className='w-full mt-6'
							disabled={ loadingUser }
						/>
						<Text fontType={ null } fontSize='24px' fontWeight='400' color={ colors.grey.dark } className='max-2xl:mt-5 mt-8 max-lg:text-[14px] text-[20px]'>
							{ languages('footer.hasAccountLabel') }&nbsp;
							<Link href='/login'>
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
