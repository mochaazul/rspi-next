import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { useTypedSelector } from '@/hooks';
import { UserState } from '@/interface';
import { Button, Form, Text, NotificationPanel, Modal, Checkbox } from '@/components/ui';
import { Languages, colors, icons } from '@/constant';
import Images from '@/constant/images';

import useRegisterPage from './useRegisterPage';
import RegisterPageStyle from './style';
import InfoModal from './InfoModal';
import { TnCModal } from '@/pages/Dashboard/style';

const { heading, subHeading, footer, form, registerBtnLabel, notificationMessage, buttonTnC, buttonPrivacy } = Languages.page.registerPage;

const RegisterPage = () => {
	const navigate = useRouter();
	const {
		onClickRegister,
		registerField
	} = useRegisterPage();
	const {
		registeredValue, isFormValid, onSubmit, setFieldsProps, getCurrentForm
	} = Form.useForm({ fields: registerField });
	const { user, loading: loadingUser, error: errorUser } = useTypedSelector<UserState>('user');

	const [infoBoxVisible, setInfoBoxVisible] = useState<boolean>(false);
	const [notifVisible, setNotifVisible] = useState<boolean>(false);
	const [checkedTnc, setCheckedTnc] = useState<boolean>(false);
	const [checkedPrivacy, setCheckedPrivacy] = useState<boolean>(false);
	const [tncActive, setTncActive] = useState<boolean>(false);
	const [privacyActive, setPrivacyActive] = useState<boolean>(true);
	const [showModalPrivacyTnc, setShowModalPrivacyTnc] = useState<boolean>(false);
	// form
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');

	const togglePasswordShow = () => {
		const currentType = getCurrentForm().password.type;
		setFieldsProps('type', { password: currentType === 'password' ? 'text' : 'password' });
	};

	const toggleConfirmPasswordShow = () => {
		const currentType = getCurrentForm().confirmPassword.type;
		setFieldsProps('type', { confirmPassword: currentType === 'password' ? 'text' : 'password' });
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

	useEffect(() => {
		if (!!errorUser.stat_msg === false && !loadingUser && notifVisible) {
			setInfoBoxVisible(true);
		}
	}, [errorUser, loadingUser, notifVisible]);

	const tncContent = () => {
		return (<div className="w-content max-h-[300px] overflow-y-auto px-[10px]">
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
			<div className='grid max-sm:grid-cols-2 grid-cols-3 max-sm:gap-0 gap-3 w-full'>
				<div className='col-span-2'>
					<Form className={ `
					p-4
					md:p-8
					register min-h-screen flex flex-col items-center justify-center max-sm:w-full max-lg:w-[90%] max-2xl:w-5/6 w-3/5 m-auto
					` }
						onSubmit={ async e => {
							const { email, password, confirmPassword } = onSubmit(e);
							setEmail(email.value);
							setPassword(password.value);
							setConfirmPassword(confirmPassword.value);
							setShowModalPrivacyTnc(true);
						} }
						autoComplete='off'
					>
						<div className='w-full '>
							<Link href='/' className='max-sm:hidden'>
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
							notifVisible &&
							<div className='w-full mb-[32px]'>
								<NotificationPanel
									mode={ !!errorUser.stat_msg ? 'error' : 'success' }
									visible={ notifVisible && !!errorUser && !loadingUser }
									text={ errorUser.stat_msg ? errorUser.stat_msg : user.token ? notificationMessage.onSuccess : notificationMessage.onError }
									onClickRightIcon={ handleNotifOnClose }
								/>
							</div>
						}
						<Form.FormGroup className='group-wrapper w-full'>
							<Form.TextField
								id='email'
								placeholder={ form.emailPlaceholder }
								className='w-full'
								{ ...registeredValue('email') }
							/>
						</Form.FormGroup>
						<Form.FormGroup className='group-wrapper w-full'>
							<Form.TextField
								id='password'
								placeholder={ form.pasaswordPlaceholder }
								className='w-full'
								iconName={ getCurrentForm().password.type === 'password' ? 'EyeClosed' : 'Eye' }
								iconPosition='right'
								onIconClick={ togglePasswordShow }
								{ ...registeredValue('password') } />
						</Form.FormGroup>
						<Form.FormGroup className='group-wrapper w-full'>
							<Form.TextField
								id='confirmPassword'
								placeholder={ form.passwordConfirmationPlaceholder }
								className='w-full'
								iconName={ getCurrentForm().confirmPassword.type === 'password' ? 'EyeClosed' : 'Eye' }
								iconPosition='right'
								onIconClick={ toggleConfirmPasswordShow }
								{ ...registeredValue('confirmPassword') } />
						</Form.FormGroup>
						<Button
							label={ registerBtnLabel }
							theme='primary'
							hoverTheme='outline'
							type='submit'
							className='w-full mt-6'
							disabled={ !isFormValid() || loadingUser }
						/>
						<Text fontType={ null } fontSize='24px' fontWeight='400' color={ colors.grey.dark } className='max-2xl:mt-5 mt-8 max-lg:text-[14px] text-[20px]'>
							{ footer.hasAccountLabel }&nbsp;
							<Link href='/login'>
								<Text
									className='inline-block max-lg:text-[14px] text-[20px]'
									fontType={ null }
									fontWeight='700'
									color={ colors.paradiso.default }
								>
									{ footer.cta }
								</Text>
							</Link>
						</Text>
					</Form>
				</div>
				<div className='max-sm:hidden col-span-1 h-full w-full bg-no-repeat bg-cover bg-center' style={ { backgroundImage: `url(${ Images.AuthRightBG })` } } />
			</div>
			<InfoModal
				emailUser={ user.email ?? '' }
				visible={ infoBoxVisible }
				onClose={ toggleInfoBox(false) }
				onOK={ toggleInfoBox(false) }
			/>
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
						<div className="divide-dashed w-max">
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
							<Button type='submit' label={ tncActive ? buttonTnC : buttonPrivacy } disabled={ tncActive ? !checkedTnc : !checkedPrivacy } className='w-[200px]'
								onClick={ async () => {
									if (tncActive) {
										resetStateModal();
										await onClickRegister({
											email: email,
											password: password,
											confirmPassword: confirmPassword
										});
										setNotifVisible(true);
									} else {
										setTncActive(true);
									}
								} }
							/>
						</div>
					</div>
				</TnCModal>
			</Modal>
		</RegisterPageStyle>
	);
};

export default RegisterPage;
