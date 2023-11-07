import React, { useState } from 'react';

import { Text, TextField } from 'components';
import Picker from 'components/Picker';
import { PropsType } from 'components/withInputLabel';

import { DropdownSearchStyle } from './style';

interface DropdownSearchType {
	textFieldProps?: PropsType;
	pickerItems?: PickerItem[];
	onItemClick?: (item: PickerItem) => any;
	isForLanding?: boolean;
}

export type PickerItem = {
	id: number,
	label: string;
	specialty_code?: string;
	[key: string]: any;
};

const DropdownSearch = ({ textFieldProps, pickerItems, onItemClick, isForLanding }: DropdownSearchType) => {
	const [pickerShow, setPickerShow] = useState<boolean>(false);
	const [searchKey, setSearchKey] = useState<string | undefined>();

	const stylePicker = isForLanding ? 'w-full absolute mt-[-4px]' : 'w-full relative mt-[-4px]';
	return (
		<DropdownSearchStyle
			onFocus={ () => setPickerShow(true) }
			onBlur={ () => setTimeout(() => setPickerShow(false), 250) }
		>
			<TextField { ...textFieldProps } value={ searchKey } onChange={ val => setSearchKey(val.currentTarget.value) } />
			<Picker show={ pickerShow } className={ stylePicker }>
				{
					(pickerItems ?? [])
						.filter(item => searchKey !== undefined ? item?.label?.toLowerCase()?.match(searchKey.toLowerCase()) : true)
						.map((item, index) => (
							<div
								key={ index }
								className={ `cursor-pointer border-gray py-4 px-4 flex justify-between items-center ${ index < (pickerItems?.length ?? 0) ? '' : 'border-b' }` }
								onClick={ () => { onItemClick?.(item); if (isForLanding) setSearchKey(item.label); } }
							>
								<Text
									fontSize='16px'
									fontWeight='700'
									lineHeight='19px'
									text={ item.label }
									className='flex-1'
								/>
							</div>
						))
				}
			</Picker>
		</DropdownSearchStyle>
	);
};

export default DropdownSearch;