import * as yup from 'yup';

export const DefaultEmailYup = yup.string().email('emailNotValid')
	.required('required');

const DefaultPasswordYup = yup.string().required('required')
	.min(8, ({ min }) => `minLength_${ min }`)
	.test(
		'isValidPass',
		'minCapitalize_1',
		(value: any) => /[A-Z]/.test(value)
	);

export const DefaultPinYup = yup.string().required('required')
	// .min(6, ({ min }) => `exactLength_${ min }`)
	// .max(6, ({ max }) => `exactLength_${ max }`)
	.length(6, ({ length }) => `exactLength_${ length }`);

export const LoginSchema = yup.object().shape({
	email: DefaultEmailYup,
	password: DefaultPasswordYup,
});

export const ForgotPasswordSchema = yup.object().shape({
	email: DefaultEmailYup
});

export const ResetPasswordSchema = yup.object().shape({
	new_password: DefaultPasswordYup,
	confirm_password: DefaultPasswordYup
		.oneOf([yup.ref('new_password')], 'notMatch')
});

export const RegisterSchema = yup.object().shape({
	email: DefaultEmailYup,
	password: DefaultPasswordYup
	,
	confirm_password: DefaultPasswordYup
		.oneOf([yup.ref('password')], 'notMatch')
});

export const PinSchema = yup.object().shape({
	pin: DefaultPinYup,
	confirm_pin: DefaultPinYup
		.oneOf([yup.ref('pin')], 'notMatch')
});

export const OTPSchema = yup.object().shape({
	otp: yup.string().required('required')
		.min(6, 'exactLength')
		.max(6, 'exactLength')
});

export const RegisterOnboardSchema = yup.object().shape({
	medical_record: yup.string().required('required'),
	phone: yup.string().required('required'),
	birth_date: yup.string().required('required'),
});

export const UpdatePasswordSchema = yup.object().shape({
	old_password: DefaultPasswordYup,
	new_password: DefaultPasswordYup,
	confirm_password: DefaultPasswordYup
		.oneOf([yup.ref('new_password')], 'notMatch')
});