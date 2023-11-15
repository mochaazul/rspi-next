import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
	email: yup
		.string()
		.email()
		.required()
		.label('Email'),
	password: yup
		.string()
		.min(8, 'Password should contain at least 8 characters')
		.required()
		.label('Password'),
});

export const ForgotPasswordSchema = yup.object().shape({
	email: yup.string().email()
		.required()
		.label('Email')
});

export const ResetPasswordSchema = yup.object({
	new_password: yup
		.string()
		.required()
		.label('Password')
		.min(8, 'Password should contain at least 8 characters'),
	confirm_password: yup
		.string()
		.required()
		.label('Confimation password')
		.min(8, 'Confirmation Password should contain at least 8 characters')
		.oneOf([yup.ref('new_password')], 'Passwords do not match')
});