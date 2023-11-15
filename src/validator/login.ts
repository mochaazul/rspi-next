import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
	email: yup.string().email()
		.required()
		.label('Email'),
	password: yup.string().min(8)
		.required()
		.label('Password'),
});