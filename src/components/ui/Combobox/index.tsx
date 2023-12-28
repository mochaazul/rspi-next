import { Fragment, SetStateAction, useRef, useState } from 'react';
import { Combobox as HeadlessCombobox, Transition } from '@headlessui/react';
import { ClearWrapper, ComboboxWrapper, IconWrapper } from './style';
import { icons } from '@/constant';
import { useScopedI18n } from '@/locales/client';

export type ItemType = {
	id: string | number,
	value: string | number,
	label: string | number;
	[key: string]: string | number,
};

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
	isLoading?: boolean;
};

const Combobox = ({
	data,
	key,
	placeholder,
	iconName,
	onSelectValue,
	inputOnChange,
	retainValue,
	isLoading,
}: Props) => {
	const t = useScopedI18n('page.landingPage.services.findDoctor.form');
	const tCombobox = useScopedI18n('combobox');
	const [selected, setSelected] = useState<ItemType | null>(null);

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
			: data.filter((item: any) =>
				item.label
					.toLowerCase()
					.replace(/\s+/g, '')
					.includes(query.toLowerCase().replace(/\s+/g, ''))
			);

	return (
		<div>
			<HeadlessCombobox
				by='id'
				value={ selected }
				onChange={ item => {
					setSelected(item);
					if (onSelectValue) {
						setOpen(false);
						onSelectValue(item);
					}
				} }
				nullable
			>

				<div className='relative' onClick={ () => { setOpen(true); } } onBlur={ () => { setOpen(false); } }>
					<ComboboxWrapper>
						{
							Icons && (
								<IconWrapper>
									<Icons className='svg-darkgrey' />
								</IconWrapper>
							)
						}
						<HeadlessCombobox.Input
							className='w-full border-none py-2 pl-[9px] pr-10 text-gray-900 '
							onChange={ event => changeQuery(event.target.value) }
							placeholder={ placeholder }
							{ ...(retainValue ? { displayValue: (item: ItemType) => `${ item?.label ?? '' }` } : {}) }
						/>
						{
							(retainValue ? selected : query) && (
								<ClearWrapper
									onClick={ evt => {
										evt.stopPropagation();
										if (onSelectValue) {
											setSelected(null);
											onSelectValue(null);
											setQuery('');
										}
									} }>
									<icons.Close />
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
							className='z-30 absolute mt-0.5 max-h-60 w-full overflow-auto rounded-[10px] bg-white text-base leading-normal shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] ring-0 focus:ring-0 focus:outline-none'>
							{ filteredItem.length === 0 && query !== '' ? (
								<div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
									{
										isLoading ? tCombobox('loading') : tCombobox('notFound')
									}
								</div>
							) : (
								filteredItem.map((item, index) => (
									<HeadlessCombobox.Option
										key={ `combobox-${ index }` }
										className={ ({ selected }) =>
											`relative cursor-default select-none py-4 px-5 hover:bg-green-secondary/10 ${ selected ? 'bg-green-secondary/10' : '' }`
										}
										value={ item }
									>
										{ ({ selected }) => (
											<span className={ `text-base block truncate ${ selected ? 'font-bold text-green-secondary' : 'font-normal text-gray-1' }` }>
												{ item.label }
											</span>
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