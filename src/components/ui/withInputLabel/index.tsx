import React from 'react';

import { InputType } from '../TextField/style';
import { TextAreaType } from '../TextArea/style';
import { InputPinType } from '../TextFieldPin/style';
import { DropdownProps } from '../Dropdown';
import { DatepickerProps } from '../DateField/style';
import { PhoneInputType } from '../PhoneNumberInput/style';

import { ErrorText, InfoText, InputWrapper, LabelText } from './style';

interface WrappedComponentType {
	WrappedComponent:
	React.JSXElementConstructor<InputType> |
	React.JSXElementConstructor<TextAreaType> |
	React.JSXElementConstructor<InputPinType> |
	React.JSXElementConstructor<DropdownProps> |
	React.JSXElementConstructor<DatepickerProps> |
	React.JSXElementConstructor<PhoneInputType>;
}

export type PropsType = InputType & TextAreaType & InputPinType & DropdownProps & DatepickerProps & {
	label?: string;
	errorMessage?: string;
	isError?: boolean;
	infoMessage?: string;
	width?: string;
	labelHorizontal?: boolean;
	labelClassName?: string;
	labelGap?: number;
};

/**
 * @description HoC to add label and error field and wrap it to Input Component
 * @param WrappedComponent Input Component to wrap
 * @returns JSX.Element
 */
// eslint-disable-next-line react/display-name
const withInputLabel = (WrappedComponent: WrappedComponentType['WrappedComponent']) => (
	{
		label,
		errorMessage,
		isError,
		infoMessage,
		width,
		labelHorizontal,
		...props
	}: PropsType
) => {
	return (
		<InputWrapper width={ width }>
			<div className={ `flex ${ labelHorizontal ? 'items-center' : '' } ${ labelHorizontal ? 'flex-row' : 'flex-col' } ${ props.labelGap && `gap-[${ props.labelGap }px]` }` }>
				{
					label ?
						<div className={ `${ labelHorizontal ? 'mr-10' : 'mb-2' }` }>
							<LabelText htmlFor={ props.name } className={ props.labelClassName }>{ label }</LabelText>
						</div> :
						null
				}
				<div >
					<WrappedComponent { ...props } />
				</div>
			</div>
			<div className='flex flex-row justify-between'>
				{ !!infoMessage && <InfoText>{ infoMessage }</InfoText> }
				{ errorMessage && !!isError && <ErrorText>{ errorMessage }</ErrorText> }
			</div>
		</InputWrapper>
	);
};

export default Object.assign(withInputLabel, { LabelText });