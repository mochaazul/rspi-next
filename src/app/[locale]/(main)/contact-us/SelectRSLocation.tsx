import * as Icons from 'react-feather';

import { Button, Text } from '@/components';
import { colors } from '@/constant';

import { SelectRSLocationStyle } from './style';

interface PropsType {
	id: number;
	mapString: string;
	mapURL?: string;
	imgThumb: string;
	title: string;
	address: string;
	phone: string;
	isActive?: boolean;
	onClick?: (id: number) => any;
}

const SelectRSLocation = (props: PropsType) => {
	const handleOnClick = (id: number) => () => {
		props.onClick?.(id);
	};

	const openGMaps = () => {
		if (props.mapURL) {
			window.location.href = props.mapURL;
		}
	};

	return (
		<SelectRSLocationStyle>
			<div
				className={ `max-w-[545px] p-10 max-sm:px-3 max-sm:py-5 max-sm cursor-pointer flex items-center gap-5 ${ props.isActive ? 'active' : '' }` }
				onClick={ handleOnClick(props.id) }
			>
				<img src={ props.imgThumb } alt={ props.title } className='w-[120px] h-[120px] rounded-md object-cover' />
				<div>
					<div className='flex justify-between'>
						<Text
							fontSize='20px'
							fontWeight='900'
							lineHeight='24px'
							color={ props.isActive ? colors.paradiso.default : colors.grey.darker }
							text={ props.title }
							className='map-title'
						/>
						<Icons.ExternalLink color={ colors.grey.dark } width={ 14 } className='max-sm:hidden' />
					</div>
					<div className='sm:mt-4 mt-1 grid sm:grid-cols-[35px_1fr] grid-row-2 gap-y-3'>
						<Icons.MapPin width={ 18 } className='max-sm:hidden' />
						<Text
							fontSize='14px'
							fontWeight='400'
							lineHeight='18px'
							color={ colors.grey.darker }
							text={ props.address }
						/>
						<Icons.Phone width={ 18 } className='max-sm:hidden' />
						<Text
							fontSize='16px'
							fontWeight='900'
							lineHeight='19px'
							color={ colors.grey.darker }
							className='max-sm:hidden'
							text={ props.phone.replace(';', ' ext:') }
						/>
					</div>
				</div>
			</div>
			<div className='p-3 pt-2 gap-3 flex sm:hidden'>
				<Button theme='outline' hoverTheme='primary' label='See Direction' onClick={ openGMaps } />
				<Button theme='primary' hoverTheme='outline' label='Find a Doctor' />
			</div>
		</SelectRSLocationStyle>
	);
};

export default SelectRSLocation;