import React from 'react';

import { PickerStyle } from './style';

export interface PickerType {
	show: boolean;
	children: React.ReactElement[];
	className?: string;
	isFromProfileSelector?: boolean;
	minWidth?: string;
}

const Picker = (props: PickerType) => {
	return (
		<PickerStyle id='dropdown' className={ `${ props.show ? 'absolute' : 'hidden' } z-10 ${ props.minWidth ? props.minWidth : 'min-w-[208px]' } mt-[5px] bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 ${ props.isFromProfileSelector ? '' : 'right-0' } ${ props.isFromProfileSelector ? '' : 'rounded-b-[10px]' } ${ props.className }` }>
			<ul className='text-sm text-gray-700' aria-labelledby='dropdownDefault'>
				{
					props?.children?.map((elem, index) => (
						<li key={ index }>
							{ elem }
						</li>
					))
				}
			</ul>
		</PickerStyle>
	);
};

export default React.memo(Picker);