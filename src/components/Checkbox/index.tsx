import React, { useRef, useCallback } from 'react';
import * as Icons from 'react-feather';

import { colors } from '@/constant';
import Text from '@/components/Text';

import { CheckboxStyle, InputType } from './style';

const Checkbox = (props: InputType) => {
	const checkBoxRef = useRef<HTMLInputElement | null>(null);

	const handleRef = useCallback((el: HTMLInputElement | null) => {
		checkBoxRef.current = el;
		if (props.ref) {
			if (typeof props.ref === 'function') {
				props.ref(el);
			} else {
				(props.ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
			}
		}
	}, [props.ref]);

	return (
		<CheckboxStyle isslider={ props.isslider }>
			<input
				type='checkbox'
				{ ...props }
				ref={ handleRef }
			/>
			<label
				className={ `flex items-center ${ props.checkposition === 'right' ? 'flex-row-reverse justify-between' : '' } sm:gap-4 gap-3 cursor-pointer` }
				onClick={ e => {
					e.preventDefault();
					checkBoxRef.current?.click();
				} }
			>
				<div className='check-box-cont relative'>
					<div className='check-box flex items-center justify-center'>
						<Icons.Check color={ colors.white.default } size={ 18 } />
					</div>
				</div>
				<div className='flex flex-row gap-x-1'>
					<Text
						text={ props.label }
						fontSize='16px'
						lineHeight='19px'
						fontWeight='400'
					/>
					<Text
						text={ props.labelBold }
						fontSize='16px'
						lineHeight='19px'
						fontWeight='700'
					/>
				</div>

			</label>
		</CheckboxStyle>
	);
};

export default React.memo(Checkbox);