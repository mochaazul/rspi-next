import useForm from './useForm';
import Label from '../Label';
import TextField from '../TextField';
import TextFieldPin from '../TextFieldPin';
import DateField from '../DateField';
import TextArea from '../TextArea';
import FormGroup from '../FormGroup';
import Dropdown from '../Dropdown';
import Checkbox from '../Checkbox';
import DropdownSearch from '../DropdownSearch';
import PhoneNumberInput from '../PhoneNumberInput';

import { FormStyled, FormType } from './style';

const Form = ({ children, ...props }: FormType) => {
	return (
		<FormStyled { ...props }>{ children }</FormStyled>
	);
};

export default Object.assign(Form, {
	TextField,
	TextFieldPin,
	DateField,
	TextArea,
	PhoneNumberInput,
	Label,
	FormGroup,
	Dropdown,
	Checkbox,
	DropdownSearch,
	useForm,
});