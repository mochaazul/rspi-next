'use client';
import { useRef } from 'react';

import withInputLabel from '../withInputLabel';

import { Input, InputPinType, TextFieldPinWrapper } from './style';

const TextFieldPin = ({ digitLength, password, onChangeValue, wrapperClassName, inputClassName, ...props }: InputPinType) => {
	const InputRefs = useRef<(HTMLInputElement | null)[]>([]);

	const onChangeHandler = () => {
		const elementValues = InputRefs.current.map(element => element?.value ?? ' ');
		onChangeValue?.({ name: props.name, value: elementValues.join('') });
	};

	/**
	 * @desc Validate keyboard event for number and backspace event only
	 * @param event React.KeyboardEvent<HTMLInputElement>
	 */
	const validateNumberOnly = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const whiteList = [
			'Tab',
			'Backspace',
			'ArrowRight',
			'ArrowLeft',
			'0'
		];

		return !(whiteList.indexOf(event.key) < 0 && !(!!(+ event.key)));
	};

	const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, key: number) => {
		if (!validateNumberOnly(event) || event.key === 'Tab') {
			event.preventDefault();
			return;
		}

		if (props.semiSecure && !!(+ event.key)) {
			InputRefs.current[key]?.setAttribute('type', 'text');
		}
	};

	const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>, key: number) => {
		if (!validateNumberOnly(event)) {
			return;
		}

		if (['Backspace'].indexOf(event.key) >= 0 || ['ArrowLeft'].indexOf(event.key) >= 0) {
			InputRefs.current[key - 1]?.focus();
			return;
		}

		InputRefs.current[key + 1]?.focus();
	};

	const handleOnBlur = (key: number) => () => {
		if (props.semiSecure) {
			InputRefs.current[key]?.setAttribute('type', 'password');
		}
	};

	const handleOnFocus = (key: number) => {
		InputRefs.current[key]?.select();
	};

	return (
		<TextFieldPinWrapper className={ `w-full ${ wrapperClassName }` }>
			{
				[...Array(digitLength ?? 1)].map((value, key) =>
					<Input
						className='max-sm:w-10 max-sm:h-10'
						key={ key }
						maxLength={ 1 }
						ref={ elem => InputRefs.current[key] = elem }
						type={ password ? 'password' : 'text' }
						pattern='[0-9]*'
						onChange={ onChangeHandler }
						onKeyDown={ event => handleOnKeyDown(event, key) }
						onKeyUp={ event => handleOnKeyUp(event, key) }
						onBlur={ () => handleOnBlur(key) }
						onFocusCapture={ () => handleOnFocus(key) }
						className={ inputClassName }
					/>
				)
			}
		</TextFieldPinWrapper>
	);
};

export default withInputLabel(TextFieldPin);