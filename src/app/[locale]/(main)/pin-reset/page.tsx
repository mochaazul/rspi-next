import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Form, NotificationPanel, Text } from '@/components';
import { Languages, colors } from '@/constant';
import Images from '@/constant/images';
import { useTypedSelector } from '@/hooks';
import { UserState } from '@/interface';

import useResetPinPage from './useResetPinPage';
import PinPageStyle, { Box } from './style';

const { headingReset, subHeading, notification: notificationWording, form } = Languages.page.pinPage;

const ResetPinPage = () => {
	const navigate = useNavigate();
	const {
		onClickPin,
		pinField
	} = useResetPinPage();

	const {
		registeredValue, isFormValid, onSubmit
	} = Form.useForm({ fields: pinField });

	const { user, loading: loadingUser, error: errorUser } = useTypedSelector<UserState>('user');

	const [notifVisible, setNotifVisible] = useState<boolean>(false);

	const handleNotifOnClose = () => {
		setNotifVisible(false);
	};

	return (
		<PinPageStyle>
			<Box>
				<div className='mb-[32px]'>
					<Images.LogoRSPI />
				</div>
				<Text text={ headingReset } fontSize={ '32px' } lineHeight={ '48px' } fontWeight={ '900' } />
				<Text
					text={ subHeading }
					fontSize={ '20px' }
					lineHeight={ '24px' }
					fontWeight={ '400' }
					className='mt-[16px] mb-[62px]'
					color={ colors.grey.pencil }
					textAlign='center'
				/>
				{
					notifVisible &&
					<div className='w-full mb-[32px]'>
						<NotificationPanel
							mode={ !!errorUser.stat_msg ? 'error' : 'success' }
							visible={ notifVisible && !!errorUser && !loadingUser }
							text={ errorUser.stat_msg ? errorUser.stat_msg : user.token ? notificationWording.onSuccessMsgUpdatePin : notificationWording.onErrorMsg }
							onClickRightIcon={ handleNotifOnClose }
						/>
					</div>
				}
				<Form
					onSubmit={ async e => {
						const { pin, confirmPin } = onSubmit(e);
						await onClickPin({
							pin: pin.value,
							confirmPin: confirmPin.value
						});
						setNotifVisible(true);
						setTimeout(() => navigate('/'), 500);
					} }
					autoComplete='off'
				>
					<Form.FormGroup className='group-wrapper w-full'>
						<Form.TextFieldPin
							className='input'
							digitLength={ 6 }
							semiSecure={ false }
							{ ...registeredValue('pin', true) }
						/>
					</Form.FormGroup>
					<Form.FormGroup className='group-wrapper w-full'>
						<Form.TextFieldPin
							className='input'
							digitLength={ 6 }
							semiSecure={ false }
							{ ...registeredValue('confirmPin', true) }
						/>
					</Form.FormGroup>
					<Button className='mt-[32px]' theme='primary' disabled={ !isFormValid() || loadingUser } type='submit'>
						{ loadingUser ? form.changeBtnLabel.loading : form.changeBtnLabel.default }
					</Button>
				</Form>
			</Box>
		</PinPageStyle>
	);
};

export default ResetPinPage;
