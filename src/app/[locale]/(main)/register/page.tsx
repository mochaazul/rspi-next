import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTypedSelector } from '@/hooks';
import { UserState } from '@/interface';
import { Button, Form, Text, NotificationPanel } from '@/components';
import { Languages, colors } from '@/constant';
import Images from '@/constant/images';

import useRegisterPage from './useRegisterPage';
import RegisterPageStyle from './style';
import InfoModal from './InfoModal/index';

const { heading, subHeading, footer, form, registerBtnLabel, notificationMessage } = Languages.page.registerPage;

const RegisterPage = () => {
	const navigate = useNavigate();
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
		navigate('/');
	};

	const handleNotifOnClose = () => {
		setNotifVisible(false);
	};

	useEffect(() => {
		if (!!errorUser.stat_msg === false && !loadingUser && notifVisible) {
			setInfoBoxVisible(true);
		}
	}, [errorUser, loadingUser, notifVisible]);

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
							await onClickRegister({
								email: email.value,
								password: password.value,
								confirmPassword: confirmPassword.value
							});
							setNotifVisible(true);
						} }
						autoComplete='off'
					>
						<div className='w-full '>
							<Link to='/' className='max-sm:hidden'>
								<Images.LogoRSPI className='max-2xl:mb-2 mb-8' />
							</Link>
							<Text fontType='h1' fontSize='32px' fontWeight='900' color={ colors.grey.darker } lineheight='48px' subClassName='max-lg:leading-8 max-lg:text-[20px]'>
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
							<Link to='/login'>
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
		</RegisterPageStyle>
	);
};

export default RegisterPage;
