import * as yup from 'yup';

import { DefaultEmailYup, DefaultPhoneSelectYup } from './defaultYup';

export const AddProfileSchema = yup.object().shape({
	name: yup.string().required('required'),
	phone: DefaultPhoneSelectYup,
	dob: yup.string().required('required'),
	gender: yup.string().required('required'),
	email: DefaultEmailYup
});