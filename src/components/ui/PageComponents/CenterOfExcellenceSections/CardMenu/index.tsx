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
		<div className='cardMenu px-[24px] pt-[24px] pb-[9px]'>
			{ data.map((item, index) => {
				return (
					<Link key={ index } href={ `/centre-of-excellence/${ item.slug }` }>
						<Text
							text={ item.title }
							className='pb-[15px] cursor-pointer '
							fontSize='14px'
							fontWeight='700'
							lineHeight='21px'
							subClassName={ 'hover:text-[#358888]' }
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