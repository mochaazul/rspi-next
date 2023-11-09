import { registerOnboard as registerOnboardAction } from '@/stores/actions';
import { useAppDispatch } from '@/hooks';
import {
	requiredRule,
	createFieldConfig,
	emailRule,
} from '@/helpers';
import { ContactUsSubmitType } from '@/interface/contactUs';

export const profileFields = {
	email: {
		...createFieldConfig({
			name: 'email',
			type: 'email'
		}),
		validationRules: [
			requiredRule('email'),
		],
		placeholder: 'Email'
	},
	phone: {
		...createFieldConfig({
			name: 'phone',
			type: 'number'
		}),
		validationRules: [
			requiredRule('phone'),
		],
		placeholder: 'Phone Number'
	},
	password: {
		...createFieldConfig({
			name: 'password',
			type: 'password'
		}),
		validationRules: [
			requiredRule('password'),
		],
		placeholder: 'Password'
	},
	pin: {
		...createFieldConfig({
			name: 'pin',
			type: 'password'
		}),
		validationRules: [
			requiredRule('pin'),
		],
		placeholder: 'PIN'
	},
	name: {
		...createFieldConfig({
			name: 'name',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'Nama'
	},
	gender: {
		...createFieldConfig({
			name: 'gender',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'Gender'
	},
	dob: {
		...createFieldConfig({
			name: 'dob',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'Date of Birth'
	},
	new_email: {
		...createFieldConfig({
			name: 'new_email',
			type: 'email'
		}),
		validationRules: [
			requiredRule('email'),
			emailRule(),
		],
		placeholder: 'New Email'
	},
};

/**
 * @desc The action endpoint is not yet decided
 * @returns
 */
const useProfilePage = () => {
	const contactUsSubmit = useAppDispatch<ContactUsSubmitType>(registerOnboardAction);
	const onClickContactUs = ({
		hospital_code,
		full_name,
		gender,
		email,
		phone,
		title,
		content
	}: ContactUsSubmitType) => {
		contactUsSubmit({
			payload: {
				hospital_code,
				full_name,
				gender,
				email,
				phone,
				title,
				content
			}
		});
	};
	return {
		profileFields
	};
};

export default useProfilePage;
