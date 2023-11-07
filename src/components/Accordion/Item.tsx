import { useEffect, useState } from 'react';

import { colors, icons } from '@/constant';
import { Text } from '@/components';

import { ItemType } from '.';
import { ItemStyle } from './style';

const Title = (props: { open: boolean; text: string; onClick: () => any; }) => (
	<div className='flex cursor-pointer' onClick={ props.onClick }>
		<div className='flex-1'>
			<Text
				fontSize='20px'
				lineHeight='23px'
				fontType='h3'
				fontWeight='900'
				color={ props.open ? colors.paradiso.default : colors.grey.dark }
				subClassName='max-sm:text-[16px] max-sm:leading-[23px]'
			>
				{ props.text }
			</Text>
		</div>
		<div className='grow-0'>
			<icons.ArrowDown className={ `svg-green chevron ${ props.open ? 'up' : '' }` } />
		</div>
	</div>
);

const Item = (props: ItemType) => {
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
			<Title text={ props.title } open={ isOpen } onClick={ handleToggleOpen } />
			<div className='item-desc'>
				<Text
					fontSize='18px'
					lineHeight='23px'
					fontType='p'
					fontWeight='400'
					color={ colors.grey.dark }
					className={ `${ props.desc !== '' ? 'mt-[15px]' : '' }` }
					subClassName='text-justify max-sm:leading-[18px]'
				>
					{ props.desc }
				</Text>
			</div>
		</ItemStyle>
	);
};

export default Item;