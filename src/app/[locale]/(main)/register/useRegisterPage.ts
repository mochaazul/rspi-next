import { register as registerAction } from 'stores/actions';
import { useAppDispatch } from 'hooks';
import {
	requiredRule,
	minLengthRule,
	createFieldConfig,
	emailRule,
	passwordMatchRule,
	checkCapitalExists
} from 'helpers';
import { RegisterType } from 'interface';
import { Languages } from 'constant';

const { emailLabel, passwordConfirmationLabel, passwordLabel, passwordHint, } = Languages.page.registerPage.form;

export const registerField = {
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
			minLengthRule('password', 8),
			checkCapitalExists('password'),
		],
		label: passwordLabel,
		infoMessage: passwordHint
	},
	confirmPassword: {
		...createFieldConfig({
			name: 'confirmPassword',
			type: 'password'
		}),
		validationRules: [
			requiredRule('confirmPassword'),
			minLengthRule('confirmPassword', 8),
			checkCapitalExists('confirmPassword'),
			passwordMatchRule()
		],
		label: passwordConfirmationLabel,
		infoMessage: passwordHint
	},
};

const useRegisterPage = () => {
	const register = useAppDispatch<RegisterType>(registerAction);
	const onClickRegister = ({ email, password, confirmPassword }: any) => {
		return register({
			payload: {
				email,
				password,
				confirm_password: confirmPassword
			}
		});
	};

	return {
		onClickRegister,
		registerField
	};
};

export default useRegisterPage;
