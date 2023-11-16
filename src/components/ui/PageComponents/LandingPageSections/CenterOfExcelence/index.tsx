'use client';

import { useRef } from 'react';
import Link from 'next/link';

import Card, { CardContent, CardFooter, CardsScrollHorizontal } from '@/components/ui/Card';
import { colors } from '@/constant';
import { CenterOfExcellenceDetail } from '@/interface';

import { WrapperCentreOfExcellence } from './style';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useScopedI18n } from '@/locales/client';
import { icons } from '@/constant';

const CentreOfExcellence = ({ data }:{ data: CenterOfExcellenceDetail[] }) => {
	const t = useScopedI18n('page.landingPage.centerOfExcelence');
	const CardWrapperRef = useRef<HTMLDivElement>(null);
	const handleArrowClick = (direction: 'left' | 'right') => () => {
		CardWrapperRef.current?.scrollBy({
			left: direction === 'left' ? -382 : 382,
			behavior: 'smooth'
		});
	};

	return (
		<WrapperCentreOfExcellence className='w-full mt-12'>
			<div className='px-3 md:px-40'>
				<Text fontSize='44px' fontType='h1' fontWeight='900' color={ colors.grey.darker } lineHeight='57px'>
					{ t('heading') }
				</Text>
				<div className='slider-title flex row justify-between items-center mt-3'>
					<Text fontSize='20px' fontType='p' fontWeight='400' color={ colors.grey.dark }>
						{ t('subHeading') }
					</Text>
					<Link href='/center-of-excellence' className='max-sm:hidden'>
						<div className='see-all flex row items-center'>
							<Text fontSize='16px' fontType='p' fontWeight='900' color={ colors.paradiso.default }>
								{ t('allItemBtnLabel') }
							</Text>
							<icons.LongArrowRight alt='arrow-right' className='svg-green ml-2'/>
						</div>
					</Link>
				</div>
			</div>
			<div className='w-full'>
				<CardsScrollHorizontal customRef={ CardWrapperRef }>
					{
						data?.map((data, index) => (
							<Card
								key={ data.id ?? index }
								image={ (data.img_url?.length ?? 0) > 0 && data.img_url?.[0] ? data.img_url[0] : undefined }
								imageHeight='200px'
								content={ <CardContent title={ data.title ?? '' } description={ data.short_description ?? '' } /> }
								footer={ <CardFooter content={ t('cardItem.readMoreLabel') } /> }
								to={ `center-of-excellence/${ data.id }` }
							/>
						))
					}
				</CardsScrollHorizontal>
			</div>
			<div className='px-3 md:px-40'>
				<div className='flex row justify-between items-center'>
					<div className='arrow-left rounded-full w-[34px] h-[34px] md:w-[44px] md:h-[44px] flex items-center justify-center cursor-pointer' onClick={ handleArrowClick('left') }>
						<icons.LongArrowRight className='svg-white rotate-180' style={ { color: colors.paradiso.default } } />
					</div>
					<div>
						<Link href='/find-a-doctor'>
							<Button theme='primary'>{ t('createAppointmentBtnLabel') }</Button>
						</Link>
					</div>
					<div className='arrow-right rounded-full w-[34px] h-[34px] md:w-[44px] md:h-[44px] flex items-center justify-center cursor-pointer' onClick={ handleArrowClick('right') }>
						<icons.LongArrowRight className='svg-white ' style={ { color: colors.paradiso.default } } />
					</div>
				</div>
			</div>
		</WrapperCentreOfExcellence>
	);
};

export default CentreOfExcellence;