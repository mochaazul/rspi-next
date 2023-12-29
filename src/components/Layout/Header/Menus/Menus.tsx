import { Text } from '@/components/ui';
import { colors, icons } from '@/constant';
import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren<{
  items: unknown[]
  label: string
  itemKey?: string
}>>

const Menus = ({ items, itemKey, label }:Props) => {
  
	return (
		<section className='flex flex-row gap-x-2 relative '>
			<Text text={ label } subClassName='text-black' fontSize='14px' fontWeight='900' />
			<div className='flex-shrink-0'>
				<icons.ArrowDown className='[&>path]:stroke-[#6A6D81] group-hover:rotate-180 transition-all' />
			</div>
		</section>
	);
};

export default Menus;