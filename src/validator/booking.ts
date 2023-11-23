import * as yup from 'yup';

import { DefaultEmailYup } from './defaultYup';

export const AddProfileSchema = yup.object().shape({
	name: yup.string().required('required'),
	phone: yup.string().required('required'),
	dob: yup.string().required('required'),
	gender: yup.string().required('required'),
	email: DefaultEmailYup
});