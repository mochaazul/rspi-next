import { createOTP as otpAction } from '@/stores/actions';
import { useAppDispatch, useTypedSelector } from '@/hooks';
import {
	requiredRule,
	minLengthRule,
	maxLengthRule,
	createFieldConfig
} from '@/helpers';
import { OTPType, UserState } from '@/interface';
import { Languages } from '@/constant';
import { useAppAsyncDispatch } from '@/hooks/useAppDispatch';
import { useRouter } from 'next/navigation';

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
	const otpDispatch = useAppAsyncDispatch<OTPType>(otpAction);
	const { user } = useTypedSelector<UserState>('user');
	const navigate = useRouter();
	const onClickOTP = async ({ otp }: OTPType) => {
		try {
			await otpDispatch({
				payload: {
					otp
				}
			});
			if (user.pin_status) {
				navigate.replace('/');
			} else {
				navigate.replace('/pin-create');
			}
		} catch (error) {

		}

	};

	return {
		onClickOTP,
		OTPField
	};
};

export default useOTPPage;
