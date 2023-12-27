'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as FeatherIcon from 'react-feather';
import { Text } from '@/components/ui';
import withInputLabel from '@/components/ui/withInputLabel';
import { colors, icons } from '@/constant';

import { Option, OptionsWrapper, SelectStyled, SelectWrapper } from './style';

export interface DropdownProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
	menuItems?: {
		label?: string;
		key?: string,
		value?: string;
	}[];
	arrowClassName?: string;
	onChangeValueDropdown?: (value: string) => any;
	allOptionLabel?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
	menuItems,
	onChange,
	arrowClassName,
	className,
	allOptionLabel = 'All',
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const SelectWrapperRef = useRef<HTMLDivElement>(null);
	const SelectInputRef = useRef<HTMLSelectElement>(null);
	const SelectOptionsRef = useRef<HTMLOptionElement[]>([]);

	useEffect(() => {
		if (SelectInputRef.current && props.defaultValue) {
			SelectInputRef.current.value = `${ props.defaultValue }`;
			const event = new Event('change', { bubbles: true });
			SelectInputRef.current.dispatchEvent(event);
		}
	}, [SelectInputRef, props.defaultValue]);

	const handlePreventDefaultOpen = (event?: React.MouseEvent<HTMLSelectElement> | React.KeyboardEvent<HTMLSelectElement>) => {
		event?.preventDefault();
		event?.currentTarget.focus();
		!isOpen ? openOptionDialog() : closeOptionDialog();
	};

	const openOptionDialog = () => {
		setIsOpen(true);
	};

	const closeOptionDialog = () => {
		setIsOpen(false);
	};

	const handleOptionClick = (value: string) => () => {
		if (SelectInputRef.current) {
			SelectInputRef.current.value = value;
			SelectInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
		}
	};

	const handleOptionClickMultiple = (selectedValue: string) => () => {
		if (SelectInputRef.current) {
			const selectedOptions = Array.from(SelectInputRef.current.selectedOptions, option => option.value);
			const index = selectedOptions.indexOf(selectedValue);

			if (index > -1) {
				selectedOptions.splice(index, 1);
			} else {
				selectedOptions.push(selectedValue);
			}

			// Join the selected options into a string
			const selectedOptionsString = selectedOptions.join(',');
			SelectInputRef.current.value = selectedOptionsString;
			props.onChangeValueDropdown?.(selectedOptionsString);

			// Update the selected options
			const options = Array.from(SelectInputRef.current.options);
			options.forEach(option => {
				option.selected = selectedOptions.includes(option.value);
			});

			const event = new Event('change', { bubbles: true });
			SelectInputRef.current.dispatchEvent(event);
		}
	};

	const handleOptionToggleAll = () => {
		const isAllCheckedOptionSnapshot = isAllCheckedOption();
		menuItems?.map(menuItem => {
			if (SelectInputRef.current && menuItem.value) {
				const selectedOptions = Array.from(SelectInputRef.current.selectedOptions, option => option.value);
				const index = selectedOptions.indexOf(menuItem.value);

				if (['none', 'partial'].includes(isAllCheckedOptionSnapshot)) {
					index < 0 && selectedOptions.push(menuItem.value);
				} else {
					selectedOptions.splice(index, 1);
				}

				// Join the selected options into a string
				const selectedOptionsString = selectedOptions.join(',');
				SelectInputRef.current.value = selectedOptionsString;
				props.onChangeValueDropdown?.(selectedOptionsString);

				// Update the selected options
				const options = Array.from(SelectInputRef.current.options);
				options.forEach(option => {
					option.selected = selectedOptions.includes(option.value);
				});
			}
		});
		if (SelectInputRef.current) {
			const event = new Event('change', { bubbles: true });
			SelectInputRef.current.dispatchEvent(event);
		}
	};

	const closePopUp = useCallback(() => {
		setIsOpen(false);
	}, [isOpen]);

	const isCheckedOption = (value: string): boolean => {
		return Array.from(SelectInputRef.current?.selectedOptions ?? []).filter(option => option.value === value).length > 0;
	};

	const isAllCheckedOption = (): 'all' | 'none' | 'partial' => {
		const checkMenu = menuItems?.filter(menuItem => {
			return menuItem.value ?
				Array.from(SelectInputRef.current?.selectedOptions ?? [], option => option.value).indexOf(menuItem.value) >= 0 :
				false;
		});

		return (checkMenu?.length ?? 0) >= (menuItems?.length ?? 0) ? 'all' : checkMenu?.length === 0 ? 'none' : 'partial';
	};

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => document.addEventListener('click', closePopUp), 100);
		} else {
			document.removeEventListener('click', closePopUp);
		}

		return () => {
			document.removeEventListener('click', closePopUp);
		};
	}, [isOpen]);

	return (
		<SelectWrapper
			$isOpen={ isOpen }
			onClick={ !props.disabled
				? () => isOpen ? closeOptionDialog() : openOptionDialog()
				: undefined }
			disabled={ props.disabled }
			ref={ SelectWrapperRef }
			className={ className }
		>
			<SelectStyled
				onMouseDown={ handlePreventDefaultOpen }
				onKeyDown={ handlePreventDefaultOpen }
				onChange={ onChange }
				{ ...props }
				ref={ SelectInputRef }
			>
				<option value='' disabled hidden className='placeholder' />
				{
					menuItems?.map((item, idx) =>
						<option
							key={ idx }
							value={ item.value }
							ref={ el => el && (SelectOptionsRef.current[idx] = el) }
						>
							{ item.label }
						</option>
					)
				}
			</SelectStyled>
			{
				!SelectInputRef.current?.value ?
					<div className='placeholder'>
						<Text
							text={ props.placeholder }
							color={ colors.grey.placeholderColor }
							subClassName='!text-base'
						/>
					</div> :
					<div className='placeholder'>
						<Text
							text={ Array.from(SelectInputRef.current.selectedOptions, option => option.label).join(', ') }
							color={ props.disabled ? colors.grey.darkOpacity : colors.grey.darker }
							subClassName='!text-base'
						/>
					</div>
			}
			{
				!props.disabled && (
					<div className={ `arrow-down ${ arrowClassName }` } onClick={ openOptionDialog }>
						<icons.ArrowDown className='svg-darkgrey' />
					</div>
				)
			}
			<OptionsWrapper $isOpen={ isOpen } $topOffset={ SelectWrapperRef.current?.offsetHeight ?? 0 } onClick={ closeOptionDialog }>
				{
					props.multiple ?
						<Option className='select-none' onClick={ handleOptionToggleAll }>
							{
								props.multiple &&
								<div className={ `multiple-checkbox ${ isAllCheckedOption() !== 'none' ? 'checked' : '' }` }>
									{
										isAllCheckedOption() === 'all' ?
											<FeatherIcon.Check color={ colors.white.default } size={ 16 } /> :
											<FeatherIcon.Minus color={ colors.white.default } size={ 16 } />
									}
								</div>
							}
							<>
								{ allOptionLabel }
							</>
						</Option> :
						null
				}
				{
					menuItems?.map((item, index) =>
						<Option
							key={ index }
							className={ `select-none ${ isCheckedOption(item?.value ?? '') ? 'bg-green-secondary/10 text-green-secondary font-bold' : 'text-gray-1 font-normal' }` }
							onClick={ (props.multiple ? handleOptionClickMultiple : handleOptionClick)(item.value ? item?.value : item?.label || '') }
						>
							{
								props.multiple &&
								<div className={ `multiple-checkbox ${ isCheckedOption(item.value ?? '') ? 'checked' : '' }` }>
									<FeatherIcon.Check color={ colors.white.default } size={ 16 } />
								</div>
							}
							<>
								{ item?.label }
							</>
						</Option>
					)
				}
			</OptionsWrapper>
		</SelectWrapper>
	);
};

export default withInputLabel(Dropdown);