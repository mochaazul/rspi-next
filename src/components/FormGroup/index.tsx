import React from 'react';
import { FormGroupWrapper, FormGroupWrapperInterface } from './style';

const FormGroup = ({ children, ...props }: FormGroupWrapperInterface) => {
	return (
		<FormGroupWrapper { ...props } className={ `mb-4 ${ props.className }` }>
			{ children }
		</FormGroupWrapper>
	);
};

export default FormGroup;