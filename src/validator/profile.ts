import * as yup from 'yup';

import { DefaultPinYup } from './auth';

export const UpdateProfileSchema = yup.object().shape({
	name: yup.string(),
	phone: yup.string().required()
		.label('Phone number'),
	birth_date: yup.string(),
	gender: yup.string()
});

export const UpdateEmailSchema = yup.object().shape({
	email: yup.string().required()
		.label('New email')
});

export const CheckPinSchema = yup.object().shape({
	pin: DefaultPinYup.label('PIN'),
});