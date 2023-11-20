import { postContactUs } from '@/lib/api';

import {
	requiredRule,
	createFieldConfig,
	emailRule,
	phoneRule,
} from '@/helpers';
import { ContactUsSubmitType } from '@/interface/contactUs';
import { useScopedI18n } from '@/locales/client';

const t = useScopedI18n('page.contactUs.contactForm');

export const contactUsField = {
	hospital_code: {
		...createFieldConfig({
			name: 'hospital_code',
			type: 'dropdown'
		}),
		validationRules: [
			requiredRule('hospital_code'),
		],
		label: t('labels.hospital'),
		placeholder: t('placeholder.hospital')
	},
	full_name: {
		...createFieldConfig({
			name: 'full_name',
			type: 'text'
		}),
		validationRules: [
			requiredRule('full_name'),
		],
		label: t('labels.fullName'),
		placeholder: t('placeholder.fullName')
	},
	gender: {
		...createFieldConfig({
			name: 'gender',
			type: 'dropdown'
		}),
		validationRules: [
			requiredRule('gender'),
		],
		label: t('labels.gender'),
		placeholder: t('placeholder.gender')
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
		label: t('labels.email'),
		placeholder: t('placeholder.email')
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
		label: t('labels.phone'),
		placeholder: t('placeholder.phone')
	},
	title: {
		...createFieldConfig({
			name: 'title',
			type: 'dropdown'
		}),
		validationRules: [
			requiredRule('title'),
		],
		label: t('labels.subject'),
		placeholder: t('placeholder.subject')
	},
	content: {
		...createFieldConfig({
			name: 'content',
			type: 'textarea'
		}),
		validationRules: [
			requiredRule('content'),
		],
		label: t('labels.notes'),
		placeholder: t('placeholder.notes')
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
		};

		const res = postContactUs(params);
		return res;
	};

	return {
		onClickContactUs,
		contactUsField
	};
};

export default useContactUs;
