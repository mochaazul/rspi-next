import { regExp } from 'constant';

type CreateFieldConfig = {
	name: string, type: string, defaultValue?: string;
};

export const createFieldConfig = ({
	name, type, defaultValue = ''
}: CreateFieldConfig) => {
	return {
		value: defaultValue,
		valid: false,
		errorMessage: '',
		name,
		type
	};
};
const createValidationRule = (ruleName: string, errorMessage: string, validateFunc: (inputValue: any, formObj: any) => void) => {
	return {
		name: ruleName,
		message: errorMessage,
		validate: validateFunc
	};
};

export const requiredRule = (inputName: string) => {
	return createValidationRule(
		'required',
		`${ inputName } required`,
		inputValue => inputValue.length !== 0
	);
};

export const minLengthRule = (inputName: string, minCharacters: number) => {
	return createValidationRule(
		'minLength',
		`${ inputName } should contain atleast ${ minCharacters } characters`,
		inputValue => inputValue.length >= minCharacters
	);
};

export const maxLengthRule = (inputName: string, maxCharacters: number) => {
	return createValidationRule(
		'maxLength',
		`${ inputName } cannot contain more than ${ maxCharacters } characters`,
		inputValue => inputValue.length <= maxCharacters
	);
};

export const checkCapitalExists = (inputName: string) => {
	return createValidationRule(
		'capitalExists',
		`${ inputName } must hava at least 1 capitalized character`,
		inputValue => /[A-Z]/.test(inputValue)
	);
};

export const passwordMatchRule = () => {
	return createValidationRule(
		'passwordMatch',
		'passwords do not match',
		(inputValue, formObj) => inputValue === formObj.password.value
	);
};

export const fieldsMatchRule = (inputName: string, inputNames: string[]) => {
	return createValidationRule(
		'fieldsMatch',
		`${ inputName } do not match`,
		(inputValue, formObj) => inputNames.map(name => formObj[name].value).filter(value => value !== inputValue).length <= 0
	);
};

export const emailRule = () => {
	return createValidationRule(
		'emailPattern',
		'Should contain email pattern ',
		inputValue => regExp.email.test(inputValue)
	);
};

export const phoneRule = () => {
	return createValidationRule(
		'phonePattern',
		'Phone number must precede with +62 or 021 or 08 and then followed by Phone number',
		inputValue => /^(0\d+|(\+\d+|\(\d{1,5}\))?)[ -]?\d{6,14}$/g.test(inputValue)
	);
};
