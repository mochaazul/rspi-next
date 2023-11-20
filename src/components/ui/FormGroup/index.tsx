import { FormGroupWrapper, FormGroupWrapperInterface } from './style';

const FormGroup = ({ children, ...props }: FormGroupWrapperInterface) => {
	return (
		<FormGroupWrapper { ...props } className={ `mb-2 md:mb-4 ${ props.className }` }>
			{ children }
		</FormGroupWrapper>
	);
};

export default FormGroup;