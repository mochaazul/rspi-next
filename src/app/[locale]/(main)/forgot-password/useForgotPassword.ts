import { forgotPassword as forgotPasswordAction } from '@/stores/actions';
import { useAppDispatch } from '@/hooks';
import {
	requiredRule,
	minLengthRule,
	createFieldConfig,
	emailRule
} from '@/helpers';
import { ForgotPasswordType } from '@/interface';

export const forgotPasswordField = {
	email: {
		...createFieldConfig({
			name: 'email',
			type: 'email'
		}),
		validationRules: [
			requiredRule('email'),
			minLengthRule('email', 10),
			emailRule()
		],
		label: 'Email'
	},
};

const useForgotPassword = () => {
	const forgotPassword = useAppDispatch<ForgotPasswordType>(forgotPasswordAction);
	const onClickForgotPassword = ({ email }: ForgotPasswordType) => {
		forgotPassword({
			payload: {
				email
			}
		});
	};

	return {
		onClickForgotPassword,
		forgotPasswordField
	};
};

export default useForgotPassword;
