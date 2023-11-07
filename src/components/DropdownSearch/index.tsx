import React, { useState } from 'react';

import { Text, TextField } from 'components';
import Picker from 'components/Picker';
import { PropsType } from 'components/withInputLabel';

import { DropdownSearchStyle } from './style';

interface DropdownSearchType {
	textFieldProps?: PropsType;
	pickerItems?: PickerItem[];
	onItemClick?: (item: PickerItem) => any;
}

export type PickerItem = {
	id: number,
	label: string;
};

const DropdownSearch = ({ textFieldProps, pickerItems, onItemClick }: DropdownSearchType) => {
	const [pickerShow, setPickerShow] = useState<boolean>(false);
	const [searchKey, setSearchKey] = useState<string | undefined>();

	return (
		<DropdownSearchStyle
			onFocus={ () => setPickerShow(true) }
			onBlur={ () => setTimeout(() => setPickerShow(false), 100) }
		>
			<TextField { ...textFieldProps } onChange={ val => setSearchKey(val.currentTarget.value) } />
			<Picker show={ pickerShow } className='w-full mt-[-4px]'>
				{
					(pickerItems ?? [])
						.filter(item => searchKey !== undefined ? item.label.toLowerCase().match(searchKey.toLowerCase()) : true)
						.map((item, index) => (
							<div
								key={ index }
								className={ `cursor-pointer border-gray block py-4 px-4 flex justify-between items-center ${ index < (pickerItems?.length ?? 0) ? '' : 'border-b' }` }
								onClick={ () => onItemClick?.(item) }
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

export default React.memo(DropdownSearch);