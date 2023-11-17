import { useRouter } from 'next/navigation';

import { changeEmail } from '@/stores/actions';
import { useAppDispatch } from '@/hooks';
import {
	requiredRule,
	createFieldConfig,
	emailRule
} from '@/helpers';
import { ChangeEmailPayload } from '@/interface';
import { Languages } from '@/constant';

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
	const navigate = useRouter();
	const removeUser = useAppDispatch(removeUserData);
	const userChangeEmail = useAppDispatch<ChangeEmailPayload>(changeEmail);
	const onClickChangeEmail = async ({ email }: ChangeEmailPayload) => {
		await userChangeEmail({
			payload: {
				email,
			}
		});
		removeUser();
		navigate.replace('/');
	};

	return {
		onClickChangeEmail,
		resetEmailField
	};
};

export default useResetEmail;
