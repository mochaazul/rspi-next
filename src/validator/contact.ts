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
			'phoneNotValid',
			(value: any) => /^(0\d+|(\+\d+|\(\d{1,5}\))?)[ -]?\d{6,14}$/g.test(value)
		),
	title: yup.string().required('required'),
	content: yup.string().required('required')
});