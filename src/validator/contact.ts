import * as yup from 'yup';

import { DefaultEmailYup } from './defaultYup';

export const ContactUsSchema = yup.object().shape({
	hospital_code: yup.string().required('required'),
	full_name: yup.string().required('required'),
	gender: yup.string().required('required'),
	email: DefaultEmailYup,
	phone: yup.string().required('required')
		.test(
			'isPhoneValid',
			'prefixPhoneNotValid',
			(value: any) => /^(0\d+|(\+\d+|\(\d{1,5}\))?)[ -]?\d{8,15}$/g.test(value)
		),
	title: yup.string().required('required'),
	content: yup.string().required('required')
});