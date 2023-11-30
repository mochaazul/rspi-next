// eslint-disable-next-line no-useless-escape
const regExp = {
	email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	phone: /^(0\d+|(\+\d+|\(\d{1,5}\))?)[ -]?\d{6,14}$/g, // For unknown reason running regex from this causing weird error in validationRules where the return in useForm is switching between true and false each onChange event
	phone_allowed_char: /\w+|[\+ ]|Backspace|Arrow\w+/g,
	phone_allowed_char_list: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Tab', '+', 'Shift', ' ']
};

export const regexInputPhone = (phone: string) => {
	let phoneNumber =
		phone
			.replace(/^0/, '').replace(/^62/, '');
	return phoneNumber;
};

export default regExp;