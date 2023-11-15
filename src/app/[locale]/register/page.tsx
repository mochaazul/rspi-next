'use client';

import React, { useCallback, useState } from 'react';
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
import Modal from '@/components/ui/Modal';
import Checkbox from '@/components/ui/Checkbox';
import { useScopedI18n } from '@/locales/client';
import { RegisterSchema } from '@/validator/auth';
import { register } from '@/lib/api/auth';

import RegisterPageStyle from './style';
import { TnCModal } from '../(main)/dashboard/style';

const RegisterPage = () => {
	const navigate = useRouter();

	const [infoBoxVisible, setInfoBoxVisible] = useState<boolean>(false);
	const [notifVisible, setNotifVisible] = useState<boolean>(false);
	const [checkedTnc, setCheckedTnc] = useState<boolean>(false);
	const [checkedPrivacy, setCheckedPrivacy] = useState<boolean>(false);
	const [tncActive, setTncActive] = useState<boolean>(false);
	const [privacyActive, setPrivacyActive] = useState<boolean>(true);
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
		setCheckedPrivacy(false);
		setCheckedTnc(false);
		setPrivacyActive(true);
		setTncActive(false);
	};

	const onClickRegister = async () => {
		setLoadingUser(true);

		const response = await register(formRegister);

		if (response?.stat_code === 'APP:SUCCESS') {
			setInfoBoxVisible(true);
			setUserData(response?.data);
		} else {
			setErrorMessage(response?.stat_msg ?? '');
		}

		setNotifVisible(true);
		setLoadingUser(false);
	};

	const onChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		formikRegister.setFieldValue(e.target.id, e.target.value);
	}, []);

	const tncContent = () => {
		return (<div className='w-content max-h-[300px] overflow-y-auto px-[10px]'>
			<Text
				text={ 'Lorem ipsum dolor sit amet consectetur. Aenean nisl sollicitudin volutpat tellus facilisis dictum laoreet. Sit pellentesque eu facilisis accumsan cursus diam. Nisi velit lectus natoque lorem duis etiam. Iaculis mi eu ullamcorper dui et eleifend faucibus bibendum id. Lorem velit ornare gravida sit sem quis mattis consectetur in. Molestie in semper vulputate eu quisque nullam dapibus sed eget. Ac volutpat suscipit consectetur quis. Sit vitae mi est tellus enim et elementum lobortis.' }
				color='#2A2536'
				fontSize='16px'
				fontWeight='400'
				className='pb-6'
			/>
			<Text
				text={ 'Lorem ipsum dolor sit amet consectetur. Aenean nisl sollicitudin volutpat tellus facilisis dictum laoreet. Sit pellentesque eu facilisis accumsan cursus diam. Nisi velit lectus natoque lorem duis etiam. Iaculis mi eu ullamcorper dui et eleifend faucibus bibendum id. Lorem velit ornare gravida sit sem quis mattis consectetur in. Molestie in semper vulputate eu quisque nullam dapibus sed eget. Ac volutpat suscipit consectetur quis. Sit vitae mi est tellus enim et elementum lobortis.' }
				color='#2A2536'
				fontSize='16px'
				fontWeight='400'
				className='pb-6'
			/>
			<Text
				text={ 'Lorem ipsum dolor sit amet consectetur. Aenean nisl sollicitudin volutpat tellus facilisis dictum laoreet. Sit pellentesque eu facilisis accumsan cursus diam. Nisi velit lectus natoque lorem duis etiam. Iaculis mi eu ullamcorper dui et eleifend faucibus bibendum id. Lorem velit ornare gravida sit sem quis mattis consectetur in. Molestie in semper vulputate eu quisque nullam dapibus sed eget. Ac volutpat suscipit consectetur quis. Sit vitae mi est tellus enim et elementum lobortis.' }
				color='#2A2536'
				fontSize='16px'
				fontWeight='400'
				className='pb-6'
			/>
		</div>);
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
							<Link href='/' className='max-sm:hidden'>
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
				<Modal visible={ showModalPrivacyTnc } padding='0px'>
					<TnCModal>
						{/* tab title */ }
						<div className='flex flex-row items-center gap-x-2 p-[10px]'>
							<div className='flex flex-row items-center gap-x-2 cursor-pointer'
								onClick={ () => { setTncActive(false); setPrivacyActive(true); } }>
								<div className={ `w-[32px] h-[32px] rounded-full flex justify-center items-center ${ privacyActive ? 'bg-[#2A2536]' : 'bg-[#D4D2D8]' }` }>
									<Text
										text='1'
										color='white'
										fontWeight='900'
										fontSize='20px'
									/>
								</div>
								<Text
									text={ 'Privacy Policy' }
									fontWeight='900'
									fontSize='20px'
									color={ privacyActive ? 'black' : '#6A6D81' }
								/>
							</div>
							<div className='divide-dashed w-max'>
								-- -- -- -- -- --
							</div>
							<div className='flex flex-row items-center gap-x-2 cursor-pointer' onClick={ () => { setTncActive(true); setPrivacyActive(false); } }>
								<div className={ `w-[32px] h-[32px] rounded-full flex justify-center items-center ${ tncActive ? 'bg-[#2A2536]' : 'bg-[#D4D2D8]' }` }>
									<Text
										text='2'
										color='white'
										fontWeight='900'
										fontSize='20px'
									/>
								</div>
								<Text
									text={ 'Terms and Conditions' }
									fontWeight='900'
									fontSize='20px'
									color={ tncActive ? 'black' : '#6A6D81' }
								/>
							</div>
						</div>

						<Text
							text='Updated 25 July 2019'
							color='#6A6D81'
							fontSize='14px'
							fontWeight='400'
							className='pt-4 pb-6 px-[10px]'
						/>

						{/* tab content */ }
						{
							tncContent()
						}

						{/* tab footer */ }
						<div className='pt-8 pb-4 bg-[#FAFAFA]'>
							<div className='flex flex-row items-center justify-between px-[10px]'>
								<Checkbox checked={ tncActive ? checkedTnc : checkedPrivacy } label={ tncActive ? 'Saya menyetujui ketentuan Terms and Conditions.' : 'Saya menyetujui ketentuan Privacy.' } onChange={ evt => {
									if (tncActive) {
										setCheckedTnc(evt.target.checked);
									} else {
										setCheckedPrivacy(evt.target.checked);
									}
								} } />
								<Button label={ tncActive ? languages('buttonTnC') : languages('buttonPrivacy') } disabled={ tncActive ? !checkedTnc : !checkedPrivacy } className='w-[200px]'
									onClick={ async () => {
										if (tncActive) {
											resetStateModal();
											onClickRegister();
										} else {
											setTncActive(true);
										}
									} }
								/>
							</div>
						</div>
					</TnCModal>
				</Modal>
			) }
		</RegisterPageStyle>
	);
};

export default RegisterPage;
