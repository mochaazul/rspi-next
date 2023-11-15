import {
	postContactUs
} from '@/lib/api';

import { addContactUs as contactUsAction } from '@/stores/actions';
import { useAppDispatch } from '@/hooks';
import {
	requiredRule,
	createFieldConfig,
	emailRule,
	phoneRule,
} from '@/helpers';
import { ContactUsSubmitType } from '@/interface/contactUs';
import lang from '@/constant/languages';

const language = lang.page.contactUs.contactForm;

export const contactUsField = {
	hospital_code: {
		...createFieldConfig({
			name: 'hospital_code',
			type: 'dropdown'
		}),
		validationRules: [
			requiredRule('hospital_code'),
		],
		label: language.labels.hospital,
		placeholder: language.placeholder.hospital
	},
	full_name: {
		...createFieldConfig({
			name: 'full_name',
			type: 'text'
		}),
		validationRules: [
			requiredRule('full_name'),
		],
		label: language.labels.fullName,
		placeholder: language.placeholder.fullName
	},
	gender: {
		...createFieldConfig({
			name: 'gender',
			type: 'dropdown'
		}),
		validationRules: [
			requiredRule('gender'),
		],
		label: language.labels.gender,
		placeholder: language.placeholder.gender
	},
	email: {
		...createFieldConfig({
			name: 'email',
			type: 'text'
		}),
		validationRules: [
			requiredRule('email'),
			emailRule()
		],
		label: language.labels.email,
		placeholder: language.placeholder.email
	},
	phone: {
		...createFieldConfig({
			name: 'phone',
			type: 'tel'
		}),
		validationRules: [
			requiredRule('phone'),
			phoneRule()
		],
		label: language.labels.phone,
		placeholder: language.placeholder.phone
	},
	title: {
		...createFieldConfig({
			name: 'title',
			type: 'dropdown'
		}),
		validationRules: [
			requiredRule('title'),
		],
		label: language.labels.subject,
		placeholder: language.placeholder.subject
	},
	content: {
		...createFieldConfig({
			name: 'content',
			type: 'textarea'
		}),
		validationRules: [
			requiredRule('content'),
		],
		label: language.labels.notes,
		placeholder: language.placeholder.notes
	},
};

/**
 * @desc The action endpoint is not yet decided
 * @returns
 */
const useContactUs = () => {
	// const contactUsSubmit = useAppDispatch<ContactUsSubmitType>(contactUsAction); migrate
	
	const onClickContactUs = ({
		hospital_code,
		full_name,
		gender,
		email,
		phone,
		title,
		content
	}: ContactUsSubmitType) => {
		const params = {
			param: null,
			query: null,
			body: {
				hospital_code,
				full_name,
				gender,
				email,
				phone,
				title,
				content
			},
		}

		const res = postContactUs(params);
		return res;
	};

	return {
		onClickContactUs,
		contactUsField
	};
};

export default useContactUs;
