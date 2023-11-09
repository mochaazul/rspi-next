import { changeEmail } from '@/stores/actions';
import { useAppDispatch } from '@/hooks';
import {
	requiredRule,
	createFieldConfig,
	emailRule
} from '@/helpers';
import { ChangeEmailPayload } from '@/interface';
import { Languages } from '@/constant';
import { navigation } from '@/helpers';

import { removeUser as removeUserData } from '@/stores/User';

const {
	resetForm: {
		newEmailLabel,
	}
} = Languages.page.resetEmail;

export const resetEmailField = {
	email: {
		...createFieldConfig({
			name: 'email',
			type: 'text'
		}),
		validationRules: [
			requiredRule('email'),
			emailRule()
		],
		label: newEmailLabel
	}
};


const useResetEmail = () => {
	const { navigate } = navigation();
	const removeUser = useAppDispatch(removeUserData);
	const userChangeEmail = useAppDispatch<ChangeEmailPayload>(changeEmail);
	const onClickChangeEmail = async ({ email }: ChangeEmailPayload) => {
		await userChangeEmail({
			payload: {
				email,
			}
		});
		removeUser();
		navigate('/');
	};

	return {
		onClickChangeEmail,
		resetEmailField
	};
};

export default useResetEmail;
