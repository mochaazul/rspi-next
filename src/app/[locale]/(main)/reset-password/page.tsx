import { Images, Languages, colors } from 'constant';
import { Button, Text, Form } from 'components';

import { ResetPasswordStyle, Box } from './style';
import useResetPassword from './useResetPassword';

const {
	heading,
	subHeading,
	resetForm: {
		newPasswordConfirmationLabel,
		newPasswordConfirmationPlaceholder,
		newPasswordLabel,
		newPasswordPlaceHolder,
		resetBtnLabel,
		oldPasswordLabel,
		oldPasswordPlaceHolder,
	}
} = Languages.page.resetPassword;

const ResetPassword = () => {
	const { onClickResetPassword, resetPasswordField } = useResetPassword();
	const {
		onSubmit, registeredValue
	} = Form.useForm({ fields: resetPasswordField });

	return (
		<ResetPasswordStyle>
			<Box>
				<div className='w-[568px]'>
					<div className='mb-[32px] flex flex-col items-center'>
						<Images.LogoRSPI />
					</div>
					<Text text={ heading } fontSize={ '32px' } lineHeight={ '48px' } fontWeight={ '900' } />
					<Text
						text={ subHeading }
						fontSize={ '20px' }
						lineHeight={ '24px' }
						fontWeight={ '400' }
						className='mt-[16px] mb-[62px]'
						color={ colors.grey.pencil }
					/>
					<Form
						onSubmit={ e => {
							const { new_password, confirm_password } = onSubmit(e);
							onClickResetPassword({
								new_password: new_password.value,
								confirm_password: confirm_password.value
							});
						} }
						autoComplete='off'>
						<Form.TextField className='mb-[24px] w-[568px]' placeholder={ oldPasswordPlaceHolder } { ...registeredValue('old_password') } label={ oldPasswordLabel } />
						<Form.TextField className='mb-[24px] w-[568px]' placeholder={ newPasswordPlaceHolder } { ...registeredValue('new_password') } label={ newPasswordLabel } />
						<Form.TextField className='w-[568px]' placeholder={ newPasswordConfirmationPlaceholder } { ...registeredValue('confirm_password') } label={ newPasswordConfirmationLabel } />
						<Button className='mt-[50px]' theme='primary' width='568px' type='submit'>{ resetBtnLabel }</Button>
					</Form>
				</div>
			</Box>
		</ResetPasswordStyle >
	);
};

export default ResetPassword;