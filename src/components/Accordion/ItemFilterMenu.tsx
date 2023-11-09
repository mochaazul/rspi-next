import { useEffect, useState } from 'react';

import { colors, icons } from '@/constant';
import { Text } from '@/components';

import { ItemType } from '.';
import { ItemStyle } from './style';
import Image from 'next/image';

const Title = (props: { open: boolean; text: string; onClick: () => any; hideToggler?: boolean; }) => (
	<div className='flex cursor-pointer sm:mb-6 mb-3' onClick={ props.onClick }>
		<div className='flex-1'>
			<Text
				fontSize='20px'
				lineheight='24px'
				fontWeight='700'
				color={ colors.grey.darker }
				subClassName='max-sm:text-[16px] max-sm:leading-[23px]'
			>
				{ props.text }
			</Text>
		</div>
		{
			!props.hideToggler &&
			<div className='grow-0'>
				<Image src={icons.ArrowDown} className={ `svg-green chevron ${ props.open ? 'up' : '' }` } alt="" />
			</div>
		}
	</div>
);

const ItemFilterMenu = (props: ItemType) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleToggleOpen = () => {
		setIsOpen(!isOpen);
		!isOpen && props.onOpen?.();
	};

	useEffect(() => {
		if (!props.onlyOpenOne) return;
		setIsOpen(!!props.isOpen);
	}, [props.isOpen, props.onlyOpenOne]);

	return (
		<ItemStyle isOpen={ isOpen }>
			<Title text={ props.title } open={ isOpen } onClick={ () => { !props.hideTogler && handleToggleOpen(); } } hideToggler={ props.hideTogler } />
			<div className='item-desc'>
				{ props.desc_jsx }
			</div>
		</ItemStyle>
	);
};

export default ItemFilterMenu;