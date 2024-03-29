
import Text from '@/components/ui/Text';
import { BalloonItemStyle } from './CustomerReviewStyle';
import { colors } from '@/constant';
import Image from 'next/image';

interface PropTypes {
	title?: string;
	short_description?: string;
	customer_avatar: string;
	customer_name?: string;
	customer_illness?: string;
}

const BalloonSlider = (props: PropTypes) => {
	return (
		<div className='balloon-item flex flex-col items-center justify-end h-full gap-10'>
			<BalloonItemStyle>
				<div className='rounded-[10px] bg-white p-4 sm:p-5 h-full'>
					<Text
						fontWeight='700'
						fontSize='20px'
						lineHeight='28px'
						color={ colors.black.default }
						text={ props.title }
						subClassName='text-center'
					/>
					<Text
						fontWeight='400'
						fontSize='16px'
						lineHeight='23px'
						color={ colors.grey.dark }
						text={ props.short_description }
						className={ `${ props.title ? 'mt-3' : '' }` }
						subClassName='text-center max-sm:text-xs max-sm:leading-[18px]'
					/>
				</div>
			</BalloonItemStyle>
			<div className='flex flex-row gap-4 items-center'>
				<div className='grow-0 w-14 h-14 rounded-full overflow-hidden relative'>
					<Image src={ props.customer_avatar } alt={ props.customer_name ?? '' } fill />
				</div>
				<div className='flex-1'>
					<Text
						fontWeight='700'
						fontSize='20px'
						lineHeight='24px'
						color={ colors.white.default }
						text={ props.customer_name }
					/>
					<Text
						fontWeight='400'
						fontSize='16px'
						lineHeight='19px'
						color={ colors.white.default }
						text={ props.customer_illness }
						className='mt-2 max-sm:text-xs max-sm:leading-normal'
					/>
				</div>
			</div>
		</div>
	);
};

export default BalloonSlider;