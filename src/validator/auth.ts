import * as yup from 'yup';

const EmailYup = yup.string().email()
	.required()
	.label('Email');

const DefaultPasswordYup = yup.string().required()
	.min(8, 'Password should contain at least 8 characters');

const DefaultPinYup = yup.string().required()
	.min(6, 'Pin should contain 6 characters')
	.max(6, 'Pin should contain 6 characters');

export const LoginSchema = yup.object().shape({
	email: EmailYup,
	password: DefaultPasswordYup.label('Password'),
});

export const ForgotPasswordSchema = yup.object().shape({
	email: EmailYup
});

export const ResetPasswordSchema = yup.object().shape({
	new_password: DefaultPasswordYup.label('Password'),
	confirm_password: DefaultPasswordYup
		.label('Confirmation password')
		.oneOf([yup.ref('new_password')], 'Passwords do not match')
});

export const RegisterSchema = yup.object().shape({
	email: EmailYup,
	password: DefaultPasswordYup
		.label('Password')
		.test(
			'isValidPass',
			'Password must have at least 1 capitalized character',
			(value: any) => /[A-Z]/.test(value)
		)
	,
	confirm_password: DefaultPasswordYup
		.label('Confirmation password')
		.test(
			'isValidPass',
			'Password must have at least 1 capitalized character',
			(value: any) => /[A-Z]/.test(value)
		)
		.oneOf([yup.ref('password')], 'Passwords do not match')
});

export const PinSchema = yup.object().shape({
	pin: DefaultPinYup.label('PIN'),
	confirm_pin: DefaultPinYup.label('Confirmation PIN')
		.oneOf([yup.ref('pin')], 'PIN do not match')
});