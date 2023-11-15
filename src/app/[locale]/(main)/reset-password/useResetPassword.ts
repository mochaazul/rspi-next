import { updatePassword as updatePasswordAction } from '@/stores/actions';
import { useAppDispatch } from '@/hooks';
import {
	requiredRule,
	minLengthRule,
	createFieldConfig,
	emailRule
} from '@/helpers';
import { UpdatePasswordType } from '@/interface';
import { Languages } from '@/constant';
import { navigation } from '@/helpers';

import { removeUser as removeUserData } from '@/stores/User';

const {
	resetForm: {
		newPasswordConfirmationLabel,
		newPasswordLabel,
	}
} = Languages.page.resetPassword;

export const resetPasswordField = {
	new_password: {
		...createFieldConfig({
			name: 'new_password',
			type: 'password'
		}),
		validationRules: [
			requiredRule('password'),
			minLengthRule('password', 8)
		],
		label: newPasswordLabel
	},
	confirm_password: {
		...createFieldConfig({
			name: 'confirm_password',
			type: 'password'
		}),
		validationRules: [
			requiredRule('password'),
			minLengthRule('password', 8)
		],
		label: newPasswordConfirmationLabel
	},
};


const useResetPassword = () => {
	const { navigate } = navigation();
	const removeUser = useAppDispatch(removeUserData);
	const resetPassword = useAppDispatch<UpdatePasswordType>(updatePasswordAction);
	const onClickResetPassword = async ({ confirm_password, new_password }: UpdatePasswordType) => {
		await resetPassword({
			payload: {
				confirm_password,
				new_password
			}
		});
		removeUser();
		navigate('/');
	};

	return {
		onClickResetPassword,
		resetPasswordField
	};
};

export default useResetPassword;
