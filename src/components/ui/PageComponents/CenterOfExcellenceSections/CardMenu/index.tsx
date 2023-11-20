'use client';

import { PropsWithChildren, PropsWithRef } from 'react';
import { useRouter } from 'next/navigation';

import { Text } from '@/components/ui';
import { colors } from '@/constant';
import { CenterOfExcellenceDetail } from '@/interface';

type Props = PropsWithRef<PropsWithChildren<{
	data: CenterOfExcellenceDetail[],
	activeMenuIndex: string;
}>>;

const CardMenu = ({ data, activeMenuIndex }: Props) => {
	const navigate = useRouter();

	return (
		<div className='cardMenu px-[24px] pt-[24px] pb-[9px]'>
			{ data.map((item, index) => {
				return <Text
					text={ item.title }
					key={ index }
					className='pb-[15px] cursor-pointer'
					fontSize='14px'
					fontWeight='700'
					lineHeight='21px'
					color={ activeMenuIndex === `${ item.slug }` ? colors.paradiso.default : colors.grey.dark }
					onClick={ () => navigate.push(`/centre-of-excellence/${ item.slug }`) }
				/>;
			}) }
		</div>
	);
};

export default CardMenu;