import { Text } from '@/components/ui';
import { colors, icons } from '@/constant';
import { HospitalDetail } from '@/interface';
import Link from 'next/link';
import React, { PropsWithChildren, PropsWithRef } from 'react';

type Props<T> = {
  items?: T[]
  label: string
  itemKey?: string
	hrefKey?: string
	itemRender?: (item: T) => React.ReactNode,
	appendItem?: React.ReactNode
}

function Menus<T>({ items, label, itemRender, appendItem, hrefKey }:Props<T>) {
  
	return (
		<li className='flex flex-row gap-x-2 relative group cursor-pointer h-full align-middle justify-center items-center'>
			{
				items
					? <Text text={ label } subClassName='text-black group-hover:text-green-primary' fontSize='14px' fontWeight='900' />
					: <Link href={ hrefKey ?? '/' }>
						<Text text={ label } subClassName='text-black group-hover:text-green-primary' fontSize='14px' fontWeight='900' />
					</Link>
			}
			
			{
				items &&
				<>
					<div className='flex-shrink-0'>
						<icons.ArrowDown className='[&>path]:stroke-[#6A6D81] group-hover:rotate-180 transition-all' />
					</div>
					<div className='dropdown-wrapper'>
						<ul className='mt-[34px] custom-scrollbar'>
							{ items.map((item, index) => (
								<li key={ `menu-${label}-${index}` } className='divide-y'>
									{
										itemRender
											? itemRender(item)
											: <>
												<Text text={ `${item}` } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
											</>
									}
								</li>
							)) }
							{ appendItem }
						</ul>
					</div>
				</>
			}
		</li>
	);
};

export default Menus;