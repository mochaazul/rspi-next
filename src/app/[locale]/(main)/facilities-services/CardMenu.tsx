import { Text } from '@/components';
import { colors } from '@/constant';
import { FacilityServicesDetail } from '@/interface';
import { PropsWithChildren, PropsWithRef } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = PropsWithRef<PropsWithChildren<{
	data: FacilityServicesDetail[],
	activeMenuIndex: number;
}>>;

const CardMenu = ({ children, data, activeMenuIndex }: Props) => {
	const navigate = useNavigate();
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
					onClick={ () => navigate(`/facilities/${ item.id }`) }
				/>;
			}) }
		</div>
	);
};

export default CardMenu;