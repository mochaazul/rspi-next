import { Text } from '@/components';
import { colors } from '@/constant';
import { FacilityServicesDetail } from '@/interface';
import { PropsWithChildren, PropsWithRef } from 'react';
import { useRouter } from 'next/navigation';

type Props = PropsWithRef<PropsWithChildren<{
	data: FacilityServicesDetail[],
	activeMenuIndex: number;
}>>;

const CardMenu = ({ children, data, activeMenuIndex }: Props) => {
	const navigate = useRouter();
	return (
		<div className='cardMenu px-[24px] pt-[24px] pb-[9px]'>
			{ data.map((item, index) => {
				return <Text
					text={ item.name }
					key={ index }
					className='pb-[15px] cursor-pointer'
					fontSize='14px'
					fontWeight='700'
					lineHeight='21px'
					color={ activeMenuIndex === item.id ? colors.paradiso.default : colors.grey.dark }
					onClick={ () => navigate.push(`/facilities/${ item.id }`) }
				/>;
			}) }
		</div>
	);
};

export default CardMenu;