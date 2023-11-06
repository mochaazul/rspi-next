import { createOTP as otpAction } from 'stores/actions';
import { useAppDispatch } from 'hooks';
import {
	requiredRule,
	minLengthRule,
	maxLengthRule,
	createFieldConfig
} from 'helpers';
import { OTPType } from 'interface';
import { Languages } from 'constant';

const { form: { otpFieldLabel } } = Languages.page.otpVerification;

export const OTPField = {
	otp: {
		...createFieldConfig({
			name: 'otp',
			type: 'text'
		}),
		validationRules: [
			requiredRule('otp'),
			minLengthRule('otp', 6),
			maxLengthRule('otp', 6),
		],
		label: otpFieldLabel
	}
};

const useOTPPage = () => {
	const otpDispatch = useAppDispatch<OTPType>(otpAction);
	const onClickOTP = ({ otp }: OTPType) => {
		otpDispatch({
			payload: {
				otp
			}
		});
	};

	return {
		onClickOTP,
		OTPField
	};
};

export default useOTPPage;
