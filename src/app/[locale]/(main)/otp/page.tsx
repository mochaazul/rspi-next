import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Form, Text } from '@/components';
import { Languages, colors, icons } from '@/constant';
import Images from '@/constant/images';

import useOTPPage from './useOTPPage';
import OTPPageStyle, { Box, WarningNote } from './style';
import { useAppAsyncDispatch } from '@/hooks/useAppDispatch';
import { RegisterOnboardType } from '@/interface';
import { registerOnboard } from '@/stores/actions';
import Image from 'next/image';

const { heading, subHeading, resendOtp, resendWarn, form: { backBtnlabel, submitBtnLabel } } = Languages.page.otpVerification;

type Props = {
	onZero?: () => void;
	onResend?: () => void,
	count: number,
	setCount: Dispatch<SetStateAction<number>>;
};

const CountDownText = ({ onZero, onResend, count, setCount }: Props) => {

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
	if (!count) return (
		<>
			<Text
				onClick={ onResend }
				text={ resendOtp }
				fontSize={ '20px' }
				lineheight={ '24px' }
				fontWeight={ '400' }
				className='mt-[16px] mb-[16px] cursor-pointer'
				color={ colors.paradiso.default }
				textAlign='center'
			/>
			<WarningNote>
				<Image src={icons.ExclamationGreen} alt="" />
				<Text
					text={ resendWarn }
					fontSize={ '14px' }
					lineheight={ '24px' }
					fontWeight={ '600' }
					color={ colors.paradiso.default }
					textAlign='center'
				/>
			</WarningNote>
		</>
	);

	return (
		<Text
			text={ getCountFormatted() }
			fontSize={ '20px' }
			lineheight={ '24px' }
			fontWeight={ '400' }
			className='mt-[16px] mb-[62px]'
			color={ colors.paradiso.default }
			textAlign='center'
		/>
	);
};

const OTPPage = () => {
	const registerOnboardAsync = useAppAsyncDispatch<RegisterOnboardType>(registerOnboard);
	const [searchParams] = useSearchParams();
	const [count, setCount] = useState(60);

	const {
		onClickOTP,
		OTPField
	} = useOTPPage();
	const {
		registeredValue, isFormValid, onSubmit, getCurrentForm
	} = Form.useForm({ fields: OTPField });

	const [otpCount, setOtpCount] = useState<number>(0);

	const navigate = useNavigate();

	const onSubmitHandler = () => {
		const { otp } = getCurrentForm();
		onClickOTP({
			otp: otp.value
		});
	};

	const resendOtpHandler = async () => {
		setCount(60);
		await registerOnboardAsync({
			payload: {
				birth_date: searchParams.get('bod') ?? '',
				medical_record: searchParams.get('mr') ?? '',
				name: '',
				phone: searchParams.get('phone') ?? ''
			}
		});
		setOtpCount(prev => prev + 1);
	};

	return (
		<OTPPageStyle>
			<Box>
				<div className='mb-[32px]'>
					<Images.LogoRSPI />
				</div>
				<Text text={ heading } fontSize={ '32px' } lineheight={ '48px' } fontWeight={ '900' } />
				{ /* TODO : INI NOMOR HANDPHONE NYa masih hardcode ?? */ }
				<Text
					text={ `${ subHeading }` }
					fontSize={ '20px' }
					lineheight={ '24px' }
					fontWeight={ '400' }
					className='mt-[16px]'
					color={ colors.grey.pencil }
					textAlign='center'
				/>
				<CountDownText onResend={ resendOtpHandler } count={ count } setCount={ setCount } />

				<Form autoComplete='off'>
					<Form.FormGroup className='group-wrapper w-full'>
						<Form.TextFieldPin
							className='input'
							digitLength={ 6 }
							{ ...registeredValue('otp', true) }
						/>
					</Form.FormGroup>
				</Form>
				<Button className='mt-[32px]' theme='primary' disabled={ !isFormValid() } onClick={ () => { onSubmitHandler(); } }>{ submitBtnLabel }</Button>
				<Button className='mt-[32px]' theme='text' onClick={ () => navigate('/pin-create') }>{ backBtnlabel }</Button>
			</Box>
		</OTPPageStyle>
	);
};

export default OTPPage;
