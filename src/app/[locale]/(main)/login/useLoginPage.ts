import { login as loginAction, userDetail as userDetailAction, requestVerifyEmail as requestVerifyEmailAction } from '@/stores/actions';
import { useAppDispatch } from '@/hooks';
import {
	requiredRule,
	minLengthRule,
	createFieldConfig,
	emailRule
} from '@/helpers';
import { LoginType, ResendEmailVerificationType, UserDataDetail } from '@/interface';
import { Languages } from '@/constant';
import { useAppAsyncDispatch } from '@/hooks/useAppDispatch';

const { emailLabel, passwordLabel } = Languages.page.loginPage.form;

export const loginField = {
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
		label: emailLabel
	},
	password: {
		...createFieldConfig({
			name: 'password',
			type: 'password'
		}),
		validationRules: [
			requiredRule('password'),
			minLengthRule('password', 8)
		],
		label: passwordLabel
	},
};

const useLoginPage = () => {
	const login = useAppAsyncDispatch<LoginType>(loginAction);
	const userDetail = useAppAsyncDispatch<UserDataDetail>(userDetailAction);
	const onClickLogin = async ({ email, password }: LoginType) => {
		await login({
			payload: {
				email,
				password
			}
		});
		await userDetail();
	};

	const resendEmailVerification = useAppDispatch<ResendEmailVerificationType>(requestVerifyEmailAction);
	const onClickResendEmailVerification = ({ email }: ResendEmailVerificationType) => {
		return resendEmailVerification({
			payload: {
				email
			}
		});
	};

	return {
		onClickLogin,
		onClickResendEmailVerification,
		loginField
	};
};

export default useLoginPage;
