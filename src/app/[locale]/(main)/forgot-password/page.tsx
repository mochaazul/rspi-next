'use client';

import { useState } from 'react';

import { Images, Languages, colors } from '@/constant';
import { Button, Text, Form } from '@/components/ui';
import { UserState } from '@/interface';
import { useTypedSelector } from '@/hooks';

import ConfirmationModal from './property/confirmationModal';
import { ForgotPasswordStyle, Box } from './style';
import useForgotPassword from './useForgotPassword';

const { heading, subHeading, resetBtnlabel } = Languages.page.forgotPassword;

const ForgotPassword = () => {
	const {
		onClickForgotPassword, forgotPasswordField
	} = useForgotPassword();
	const {
		registeredValue, isFormValid, onSubmit
	} = Form.useForm({ fields: forgotPasswordField });
	const { loading, error: errorUser } = useTypedSelector<UserState>('user');

	const [email, setEmail] = useState('');
	const [notifVisible, setNotifVisible] = useState(false);

	const handleShowModal = () => setNotifVisible(!notifVisible);

	return (
		<ForgotPasswordStyle>
			<Box className={ `
				md:py-8 md:px-16
				px-4
				max-sm:w-full
			` }>
				<Form
					onSubmit={ e => {
						setNotifVisible(true);
						const { email } = onSubmit(e);
						setEmail(email.value);
						onClickForgotPassword({
							email: email.value
						});
					} }
					autoComplete='off'
				>
					<div className='mb-[32px] flex flex-col items-center'>
						<Images.LogoRSPI />
					</div>
					<Text text={ heading } fontSize={ '32px' } lineHeight={ '48px' } fontWeight={ '900' } textAlign='center' subClassName='md:text-[32px] text-[20px]' />
					<Text
						text={ subHeading }
						fontSize={ '20px' }
						lineHeight={ '24px' }
						fontWeight={ '400' }
						className='mt-[8px] md:mt-[32px] mb-8 md:mb-[62px]'
						color={ colors.grey.pencil }
						textAlign='center'
					/>
					<Form.FormGroup className='group-wrapper w-full'>
						<Form.TextField
							id='email'
							placeholder='Email'
							className='w-full'
							{ ...registeredValue('email') }
						/>
					</Form.FormGroup>
					<Button
						className='mt-[32px]'
						theme='primary'
						type='submit'
						onClick={ () => handleShowModal && handleShowModal() }
						disabled={ !isFormValid() || loading }
					>
						{ resetBtnlabel }
					</Button>
				</Form>
			</Box>
			{ !loading ?
				<ConfirmationModal
					visible={ notifVisible }
					onClose={ handleShowModal }
					email={ email }
					errorMsg={ errorUser?.stat_msg || null }

				/>
				: null
			}
		</ForgotPasswordStyle>
	);
};

export default ForgotPassword;