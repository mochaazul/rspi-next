import * as yup from 'yup';

const EmailYup = yup.string().email()
	.required()
	.label('Email');

const DefaultPasswordYup = yup.string().required()
	.min(8, 'Password should contain at least 8 characters')
	.test(
		'isValidPass',
		'Password must have at least 1 capitalized character',
		(value: any) => /[A-Z]/.test(value)
	);

export const DefaultPinYup = yup.string().required()
	.min(6, 'PIN should contain 6 characters')
	.max(6, 'PIN should contain 6 characters');

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
	password: DefaultPasswordYup.label('Password')
	,
	confirm_password: DefaultPasswordYup
		.label('Confirmation password')
		.oneOf([yup.ref('password')], 'Passwords do not match')
});

export const PinSchema = yup.object().shape({
	pin: DefaultPinYup.label('PIN'),
	confirm_pin: DefaultPinYup.label('Confirmation PIN')
		.oneOf([yup.ref('pin')], 'PIN do not match')
});

export const OTPSchema = yup.object().shape({
	otp: yup.string().required()
		.label('OTP')
		.min(6, 'OTP should contain 6 characters')
		.max(6, 'OTP should contain 6 characters')
});

export const RegisterOnboardSchema = yup.object().shape({
	medical_record: yup.string().required()
		.label('Medical record number'),
	phone: yup.string().required()
		.label('Phone number'),
	birth_date: yup.string().required()
		.label('Date of birth'),
});

export const UpdatePasswordSchema = yup.object().shape({
	old_password: DefaultPasswordYup.label('Password'),
	new_password: DefaultPasswordYup.label('Password'),
	confirm_password: DefaultPasswordYup
		.label('Confirmation password')
		.oneOf([yup.ref('new_password')], 'Passwords do not match')
});