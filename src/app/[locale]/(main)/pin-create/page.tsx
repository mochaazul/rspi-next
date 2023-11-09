import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button, Form, NotificationPanel, Text } from '@/components';
import { Languages, colors } from '@/constant';
import Images from '@/constant/images';
import { useTypedSelector } from '@/hooks';
import { UserState } from '@/interface';

import usePinPage from './usePinPage';
import PinPageStyle, { Box } from './style';

const { heading, subHeading, notification: notificationWording, form } = Languages.page.pinPage;

const PinPage = () => {
	const navigate = useRouter();
	const {
		onClickPin,
		pinField
	} = usePinPage();

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
				<Text text={ heading } fontSize={ '32px' } lineheight={ '48px' } fontWeight={ '900' } />
				<Text
					text={ subHeading }
					fontSize={ '20px' }
					lineheight={ '24px' }
					fontWeight={ '400' }
					className='mt-[16px] mb-[62px]'
					color={ colors.grey.pencil }
					textalign='center'
				/>
				{
					notifVisible &&
					<div className='w-full mb-[32px]'>
						<NotificationPanel
							mode={ !!errorUser.stat_msg ? 'error' : 'success' }
							visible={ notifVisible && !!errorUser && !loadingUser }
							text={ errorUser.stat_msg ? errorUser.stat_msg : user.token ? notificationWording.onSuccessMsg : notificationWording.onErrorMsg }
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
						setTimeout(() => navigate.replace('/'), 500);
					} }
					autoComplete='off'
				>
					<Form.FormGroup className='group-wrapper w-full'>
						<Form.TextFieldPin
							className='input'
							digitLength={ 6 }
							semiSecure={ false }
							password={ true }
							{ ...registeredValue('pin', true) }
						/>
					</Form.FormGroup>
					<Form.FormGroup className='group-wrapper w-full'>
						<Form.TextFieldPin
							className='input'
							digitLength={ 6 }
							semiSecure={ false }
							password={ true }
							{ ...registeredValue('confirmPin', true) }
						/>
					</Form.FormGroup>
					<Button className='mt-[32px]' theme='primary' disabled={ !isFormValid() || loadingUser } type='submit'>
						{ loadingUser ? form.submitBtnLabel.loading : form.submitBtnLabel.default }
					</Button>
				</Form>
			</Box>
		</PinPageStyle>
	);
};

export default PinPage;
