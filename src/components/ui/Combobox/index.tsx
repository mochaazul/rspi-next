import { Fragment, SetStateAction, useRef, useState } from 'react';
import { Combobox as HeadlessCombobox, Transition } from '@headlessui/react';
import { ClearWrapper, ComboboxWrapper, IconWrapper } from './style';
import { icons } from '@/constant';
import { useScopedI18n } from '@/locales/client';

export type ItemType = {
  id: string | number,
  value: string | number,
  label: string | number
  [key: string]: string | number,
}

type Props = {
  data: ItemType[],
  key?: string,
  selectKey?: string,
  onSelectValue?: (value: ItemType | null) => any,
  inputOnChange?: (value: ItemType | null) => any,
  placeholder?: string,
  iconName?: keyof typeof icons,
  value: ItemType | null,
  retainValue?: boolean,
  isAutoComplete?: string,
  isLoading?: boolean
}

const Combobox = ({
	data,
	key,
	placeholder,
	iconName,
	onSelectValue,
	inputOnChange,
	retainValue,
	isLoading,
}:Props) => {
	const t = useScopedI18n('page.landingPage.services.findDoctor.form');
	const tCombobox = useScopedI18n('combobox');
	const [selected, setSelected] = useState<ItemType|null>(null);

	const [query, setQuery] = useState('');
	const Icons = iconName ? icons[iconName] : null;

	const [open, setOpen] = useState(false);
	
	const changeQuery = (value: any) => {
		setQuery(value);
		if (inputOnChange) {
			inputOnChange(value);
		}
		
	};
	
	const filteredItem =
    query === ''
    	? data
    	: data.filter((item:any) =>
    		item.label
    			.toLowerCase()
    			.replace(/\s+/g, '')
    			.includes(query.toLowerCase().replace(/\s+/g, ''))
    	);
	return (
		<div>
			<HeadlessCombobox value={ selected } onChange={ item => {
				setSelected(item);
				if (onSelectValue) {
					setOpen(false);
					onSelectValue(item);
				}
			} } nullable>
					
				<div className='relative' onBlur={ () => { setOpen(false);  } }>
					<ComboboxWrapper onClick={ () => { setOpen(true); } }>
						{
							Icons && (
								<IconWrapper>
									<Icons />
								</IconWrapper>
							)
						}
						<HeadlessCombobox.Input
							className='w-full border-none py-2 pl-3 pr-10 text-gray-900 '
							onChange={ event => changeQuery(event.target.value) }
							placeholder={ placeholder }
							{ ...(retainValue ? { displayValue: (item: ItemType) => `${item?.label ?? ''}` } : {}) }
						/>
						{
							(query) && (
								<ClearWrapper onClick={ () => {
									if (onSelectValue) {
										setSelected(null);
										onSelectValue(null);
										setQuery('');
									}
								} }>
									<icons.Close/>
								</ClearWrapper>
							)
						}
					</ComboboxWrapper>
					
					<Transition
						as={ Fragment }
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
						afterLeave={ () => {
							setQuery('');
						} }
						show={ open }
					>
						<HeadlessCombobox.Options
							static={ true }
							className='z-30 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
							{ filteredItem.length === 0 && query !== '' ? (
								<div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
									{
										isLoading ? tCombobox('loading') : tCombobox('notFound')
									}
								</div>
							) : (
								filteredItem.map((item, index) => (
									<HeadlessCombobox.Option
										key={ `combobox-${index}` }
										className={ ({ active }) =>
											`relative cursor-default select-none py-2 pl-3 pr-4 ${
												active ? 'bg-teal-600 text-white' : 'text-gray-900'
											}`
										}
										value={ item }
									>
										{ ({ selected, active }) => (
											<>
												<span
													className={ `block truncate ${
														selected ? 'font-medium' : 'font-normal'
													}` }
												>
													{ item.label }
												</span>
												{ selected ? (
													<span
														className={ `absolute inset-y-0 left-0 flex items-center${
															active ? 'text-white' : 'text-teal-600'
														}` }
													 />
												) : null }
											</>
										) }
									</HeadlessCombobox.Option>
								))
							) }
						</HeadlessCombobox.Options>
					</Transition>
					
				</div>

			</HeadlessCombobox>
		</div>
	);
};

export default Combobox;