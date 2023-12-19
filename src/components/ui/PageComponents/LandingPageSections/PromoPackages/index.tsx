'use client';
import { EmptyData } from '@/components/ui';
import Button from '@/components/ui/Button';
import Card, { CardContentWithInner, CardsScrollHorizontal } from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import { colors, icons } from '@/constant';
import { EventClassesDetail } from '@/interface';
import { useScopedI18n } from '@/locales/client';
import Link from 'next/link';
import { useState, useRef } from 'react';

interface PromoPackagesProps {
	events: any;
	showAsRelated?: boolean;
}

const tabData = [
	{ label: 'All', value: '' },
	{ label: 'Event', value: 'event' },
	{ label: 'Class', value: 'class' },
	{ label: 'Promo', value: 'promo' }
];

const PromoPackages: React.FC<PromoPackagesProps> = ({ events, showAsRelated }) => {
	const t = useScopedI18n('page.landingPage.promoPackages');
	const [activeTab, setActiveTab] = useState(0);

	const promo = activeTab === 0 ? events : events?.filter((item: any) => item?.category === tabData?.[activeTab]?.value);

	if (showAsRelated) {
		return (
			<div className='w-full'>
				{ promo?.length !== 0 ?
					<CardsScrollHorizontal noHorizontalPadding={ true }>
						{ promo?.map((item: EventClassesDetail, index: number) => (
							<Card
								key={ index }
								id={ item?.id }
								image={ item.img_url_card }
								imageHeight='200px'
								header={
									<Text
										color={ colors.grey.dark }
										fontSize='16px'
										text={ item?.category?.charAt(0).toUpperCase() + item?.category?.slice(1) }
										fontWeight='400'
									/>
								}
								content={
									<CardContentWithInner
										title={ item.title || '' }
										description={ item.short_description || '' }
										RSLocation={ (item.hospitals ?? []).map((hospital: { hospital_name: any; }) => hospital.hospital_name) }
									/>
								}
								footer={ ({ isHover }) => <Button theme={ isHover ? 'primary' : 'secondary' } label={ t('viewDetailsBtnLabel') } /> }
								to={ `/promo/${ item?.slug }` }
								iconShare={ true }
							/>
						)) }
					</CardsScrollHorizontal>
					:
					<Text textAlign='center' fontSize='20px' color={ colors.grey.dark } className='mt-[20px]'>
						<EmptyData menu='Promo and Packages' />
					</Text>
				}
			</div>
		);
	}
	const CardNewsWrapperRef = useRef<HTMLDivElement>(null);

	const handleArrowClick = (direction: 'left' | 'right') => () => {
		CardNewsWrapperRef.current?.scrollBy({
			left: direction === 'left' ? -382 : 382,
			behavior: 'smooth'
		});
	};

	return (
		<div className='w-full'>
			<div className='container-content row justify-between items-center'>
				<Text fontSize='44px' fontType='h2' fontWeight='900' color={ colors.grey.darker } lineHeight='57px' subClassName='heading-section'>
					{ t('heading') }
				</Text>
				<div className='mt-3'>
					<Text fontSize='20px' fontWeight='400' color={ colors.grey.pencil } lineHeight='30px'>
						{ t('subHeading') }
					</Text>
				</div>
			</div>
			<div className='container-content mt-7 lg:mt-[50px] flex row justify-between items-center'>
				<div className='flex gap-x-3 sm:gap-x-[15px]'>
					{ tabData.map((tab, idx) => (
						<div key={ idx }>
							<Button
								theme={ activeTab === idx ? 'primary' : 'secondary' }
								label={ tab.label }
								onClick={ () => setActiveTab(idx) }
								className='!rounded-[10px] py-1 sm:!py-2.5 px-[18px] sm:!px-5 text-sm leading-5 sm:text-base font-bold sm:leading-[23px]'
							/>
						</div>
					)) }
				</div>
				<div className=' mt-3'>
					<Link href='/promo' className='max-sm:hidden'>
						<div className='see-all flex row items-center'>
							<Text fontSize='16px' fontType='p' fontWeight='900' color={ colors.paradiso.default } subClassName='text-right'>
								{ t('allItemBtnLabel') }
							</Text>
							<icons.LongArrowRight className='svg-green ml-2' />
						</div>
					</Link>
				</div>
			</div>
			<div className='w-full'>
				{ promo.length !== 0 ?
					<CardsScrollHorizontal customRef={ CardNewsWrapperRef } className='lg:gap-x-[30px] lg:overflow-hidden lg:grid lg:grid-cols-3 mt-6 sm:mt-[40px]'>
						{ promo?.slice(0, 3)?.map((item: any, index: number) => (
							<Card
								key={ index }
								id={ item?.id }
								image={ item.img_url_card }
								imageHeight='200px'
								className='lg:!w-full !m-0'
								header={
									<Text
										color={ colors.grey.dark }
										fontSize='16px'
										text={ item?.category?.charAt(0).toUpperCase() + item?.category?.slice(1) }
										fontWeight='400'
										subClassName='max-sm:text-xs max-sm:leading-normal'
									/>
								}
								content={
									<CardContentWithInner
										title={ item.title || '' }
										description={ item.short_description || '' }
										RSLocation={ (item?.hospitals ?? [])?.map((hospital: { hospital_name: any; }) => hospital.hospital_name) }
									/>
								}
								footer={ ({ isHover }) => <Button theme={ isHover ? 'primary' : 'secondary' } label={ t('viewDetailsBtnLabel') } className='max-sm:text-sm max-sm:py-2' /> }
								to={ `/promo/${ item?.slug }` }
								iconShare={ true }
							/>
						)) }
					</CardsScrollHorizontal>
					:
					<Text textAlign='center' fontSize='20px' color={ colors.grey.dark } className='mt-[20px]'>
						<EmptyData menu='Promo and Packages' />
					</Text>
				}
			</div>
			<div className='flex container-content'>
				<div className='flex row justify-between items-center'>
					<div className='arrow-left rounded-full w-[34px] h-[34px] md:w-[44px] md:h-[44px] flex items-center justify-center cursor-pointer' onClick={ handleArrowClick('left') }>
						<icons.LongArrowRight className='svg-green ml-2 rotate-180' />
					</div>
					<div />
					<div className='arrow-right rounded-full w-[34px] h-[34px] md:w-[44px] md:h-[44px] flex items-center justify-center cursor-pointer' onClick={ handleArrowClick('right') }>
						<icons.LongArrowRight className='svg-green ml-2' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PromoPackages;