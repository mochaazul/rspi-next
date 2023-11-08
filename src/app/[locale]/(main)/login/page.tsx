import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { UserState } from '@/interface';
import { useTypedSelector } from '@/hooks';
import { Button, Form, NotificationPanel, Text } from '@/components';
import { PropsTypes as NotificationPanelTypes } from '@/components/NotificationPanel';
import { Languages, colors } from '@/constant';
import Images from '@/constant/images';

import useLoginPage from './useLoginPage';
import LoginPageStyle from './style';

const { form, heading, subHeading, forgotPasswordLabel, loginBtnLabel, footer, notificationMessage } = Languages.page.loginPage;

const LoginPage = () => {
	const navigate = useRouter();
	const searchParam = useSearchParams()!;
	const {
		onClickLogin,
		onClickResendEmailVerification,
		loginField
	} = useLoginPage();
	const {
		registeredValue, isFormValid, onSubmit, setFieldsProps, getCurrentForm
	} = Form.useForm({ fields: loginField });
	const { user, loading: loadingUser, error: errorUser, customMessage } = useTypedSelector<UserState>('user');

	const [notifVisible, setNotifVisible] = useState(false);
	const [notifMode, setNotifMode] = useState<NotificationPanelTypes['mode']>('success');

	useEffect(() => {
		refHandler();
	}, []);

	useEffect(() => {
		setNotifMode(!!errorUser.stat_msg ? 'error' : 'success');
	}, [errorUser]);

	useEffect(() => {
		const ref = searchParam.get('ref');
		if (!!errorUser.stat_msg === false && !loadingUser && (notifVisible && !ref)) {
			setTimeout(() => navigate.replace('/'), 1500);
		}
	}, [errorUser, loadingUser, notifVisible]);

	const refHandler = () => {
		const ref = searchParam.get('ref');
		const stat = searchParam.get('stat');
		if (ref === 'reset' && stat === 'true') {
			setNotifMode('success');
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
	};

	const togglePasswordShow = () => {
		const currentType = getCurrentForm().password.type;
		setFieldsProps('type', { password: currentType === 'password' ? 'text' : 'password' });
	};

	const handleNotifOnClose = () => {
		setNotifVisible(false);
	};

	const handleResendEmailVerification = async () => {
		setNotifVisible(false);
		await onClickResendEmailVerification({ email: getCurrentForm().email.value });
		setNotifVisible(true);
	};

	const handleNotifError = () => {
		const ref = searchParam.get('ref');
		let text =
			ref === 'invalid-token'
				? 'Keluar, karena sesi anda telah berakhir, Silahkan login kembali'
				: ref === 'sso'
					? 'Akun anda terdeteksi telah masuk pada device lain. Silahkan login kembali'
					: ref === 'reset'
						? 'Kata sandi berhasil diubah'
						: errorUser.stat_msg
							? errorUser.stat_msg
							: user.token
								? `Selamat datang ${ user.email }`
								: 'Terdapat Error';
		text = customMessage ? customMessage : text;
		if (text === 'email is not verified') {
			return (
				<Text fontType={ null } fontSize='14px' fontWeight='500' color={ colors.red.default }>
					{ notificationMessage.emailNotVerified.heading }&nbsp;
					<Text
						fontType={ null }
						fontSize='14px'
						fontWeight='700'
						className='inline-block underline cursor-pointer'
						color={ colors.red.redder }
						onClick={ handleResendEmailVerification }
					>
						{ notificationMessage.emailNotVerified.cta }
					</Text>
					&nbsp;{ notificationMessage.emailNotVerified.tail }
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

	return (
		<LoginPageStyle>
			<div className='grid max-sm:grid-cols-2 grid-cols-3 max-sm:gap-0 gap-3 w-full'>
				<div className='col-span-2'>
					<Form className={ `
					p-4
					md:p-8
					login min-h-screen flex flex-col items-center justify-center max-sm:w-full max-lg:w-[90%] max-2xl:w-5/6 w-3/5 m-auto
					` }
						onSubmit={ e => {
							setNotifVisible(true);
							const { email, password } = onSubmit(e);
							onClickLogin({
								email: email.value,
								password: password.value
							});
						} }
						autoComplete='off'
					>
						<div className='w-full'>
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
									mode={ notifMode }
									visible={ notifVisible && !!errorUser && !loadingUser }
									onClickRightIcon={ handleNotifOnClose }
								>
									{ handleNotifError() }
								</NotificationPanel>
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
								placeholder={ form.passwordPlaceholder }
								className='w-full'
								iconName={ getCurrentForm().password.type === 'password' ? 'EyeClosed' : 'Eye' }
								iconPosition='right'
								onIconClick={ togglePasswordShow }
								{ ...registeredValue('password') } />
						</Form.FormGroup>
						<div className='w-full'>
							<Link href='/forgot-password'>
								<Text
									className='mt-2 max-2xl:mb-4 mb-10'
									fontSize='14px'
									fontWeight='900'
									fontType={ null }
									color={ colors.paradiso.default }
								>
									{ forgotPasswordLabel }
								</Text>
							</Link>
						</div>
						<Button
							label={ loginBtnLabel }
							type='submit'
							className='w-full mt-2'
							disabled={ !isFormValid() || loadingUser }
						/>
						<Text fontType={ null } fontWeight='400' color={ colors.grey.dark } className='max-2xl:mt-5 mt-8 max-lg:text-[14px] text-[20px]'>
							{ footer.notRegisteredLabel }&nbsp;
							<Link href='/register'>
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
		</LoginPageStyle>
	);
};

export default LoginPage;
