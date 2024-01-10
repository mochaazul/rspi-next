'use client';

import { PropsWithChildren, PropsWithRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Text } from '@/components/ui';
import { colors } from '@/constant';
import { CenterOfExcellenceDetail } from '@/interface';

type Props = PropsWithRef<PropsWithChildren<{
	data: CenterOfExcellenceDetail[],
	activeMenuIndex: string;
}>>;

const CardMenu = ({ data, activeMenuIndex }: Props) => {

	return (
		<div className='bg-[#FAFAFA] rounded-[5px] border border-[#D4D2D8] w-full sm:max-w-[349px] lg:max-w-[349px] xl:w-[349px] p-4 sm:p-6 flex flex-col gap-y-2 md:gap-y-[15px]'>
			{ data.map((item, index) => {
				return (
					<Link key={ index } href={ `/center-of-excellence/${ item.slug }` }>
						<Text
							text={ item.title }
							className='cursor-pointer'
							fontSize='14px'
							fontWeight='700'
							lineHeight='21px'
							subClassName={ 'hover:text-[#358888] max-sm:text-xs max-sm:leading-[18px]' }
							fontType={ 'p' }
							color={ activeMenuIndex === `${ item.slug }` ? colors.paradiso.default : colors.grey.dark }
						/>
					</Link>
				);
			}) }
		</div>
	);
};

export default CardMenu;