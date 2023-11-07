import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Form, Text } from 'components';
import { Languages, colors } from 'constant';
import Images from 'constant/images';

import useOTPPage from './useOTPPage';
import OTPPageStyle, { Box } from './style';

const { heading, subHeading, form: { backBtnlabel, submitBtnLabel } } = Languages.page.otpVerification;

const CountDownText = () => {
	const [count, setCount] = useState(100);

	useEffect(() => {
		if (count <= 0) return;
		setTimeout(() => {
			setCount(count - 1);
		}, 1000);
	}, [count]);

	const getCountFormatted = () => {
		const jsDate = new Date(count * 1000);
		const [minutes, seconds] = [jsDate.getMinutes(), jsDate.getSeconds()];
		return `${ String(minutes).padStart(2, '0') }:${ String(seconds).padStart(2, '0') }`;
	};

	return (
		<Text
			text={ getCountFormatted() }
			fontSize={ '20px' }
			lineHeight={ '24px' }
			fontWeight={ '400' }
			className='mt-[16px] mb-[62px]'
			color={ colors.paradiso.default }
			textAlign='center'
		/>
	);
};

const OTPPage = () => {
	const {
		onClickOTP,
		OTPField
	} = useOTPPage();
	const {
		registeredValue, isFormValid, onSubmit
	} = Form.useForm({ fields: OTPField });

	const navigate = useNavigate();

	return (
		<OTPPageStyle>
			<Box>
				<div className='mb-[32px]'>
					<Images.LogoRSPI />
				</div>
				<Text text={ heading } fontSize={ '32px' } lineHeight={ '48px' } fontWeight={ '900' } />
				{ /* TODO : INI NOMOR HANDPHONE NYa masih hardcode ?? */ }
				<Text
					text={ `${ subHeading } (+62)987654321` }
					fontSize={ '20px' }
					lineHeight={ '24px' }
					fontWeight={ '400' }
					className='mt-[16px]'
					color={ colors.grey.pencil }
					textAlign='center'
				/>
				<CountDownText />
				<Form
					onSubmit={ e => {
						const { otp } = onSubmit(e);
						onClickOTP({
							otp: otp.value
						});
					} }
					autoComplete='off'
				>
					<Form.FormGroup className='group-wrapper w-full'>
						<Form.TextFieldPin
							className='input'
							digitLength={ 6 }
							{ ...registeredValue('otp', true) }
						/>
					</Form.FormGroup>
				</Form>
				<Button className='mt-[32px]' theme='primary' disabled={ !isFormValid() } type='submit'>{ submitBtnLabel }</Button>
				<Button className='mt-[32px]' theme='text' onClick={ () => navigate('/pin-create') }>{ backBtnlabel }</Button>
			</Box>
		</OTPPageStyle>
	);
};

export default OTPPage;
