import { icons } from '@/constant';
import React from 'react';
import { ArrowContainer, SliderNavContainer } from './style';

type Props = {
	onNext: () => void;
	onPrev: () => void;
	nextIcon?: React.ReactNode,
	prevIcon?: React.ReactNode;
};

const SliderNav = ({
	onNext,
	onPrev,
	nextIcon,
	prevIcon
}: Props) => {
	return <SliderNavContainer>
		<div className='flex row justify-between items-center'>
			<ArrowContainer className='arrow-left rounded-full w-[34px] h-[34px] md:w-[44px] md:h-[44px] flex items-center justify-center cursor-pointer' onClick={ onPrev }>
				{ prevIcon ?? <icons.LongArrowRight className='svg-white rotate-180' /> }
			</ArrowContainer>
			<div />
			<ArrowContainer onClick={ onNext } className='arrow-right rounded-full w-[34px] h-[34px] md:w-[44px] md:h-[44px] flex items-center justify-center cursor-pointer'>
				{ nextIcon ?? <icons.LongArrowRight className='svg-white' /> }
			</ArrowContainer>
		</div>
	</SliderNavContainer>;
};

export default SliderNav;