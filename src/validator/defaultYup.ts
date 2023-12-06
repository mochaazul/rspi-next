import * as yup from 'yup';

import { regExp } from '@/constant';

export const DefaultEmailYup = yup.string().email('emailNotValid')
	.matches(regExp.email, 'emailNotValid')
	.required('required');

export const DefaultPasswordYup = yup.string().required('required')
	.min(8, ({ min }) => `minLength_${ min }`)
	.test(
		'isValidPass',
		'minCapitalize_1',
		(value: any) => /[A-Z]/.test(value)
	);

export const DefaultPinYup = yup.string().required('required')
	.length(6, ({ length }) => `exactLength_${ length }`);

export const DefaultPhoneSelectYup = yup.string().required('required')
	.test(
		'idPhoneWithPrefixValid',
		'phoneNotValid',
		(value: any) => /\d{6,14}$/g.test(value)
	);