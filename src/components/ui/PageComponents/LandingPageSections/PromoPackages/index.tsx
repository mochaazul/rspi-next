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
						{ promo?.map((item : EventClassesDetail, index: number) => (
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
		<div className='w-full mt-12'>
			<div className='px-3 row justify-between items-center md:px-40'>
				<Text fontSize='44px' fontType='h1' fontWeight='900' color={ colors.grey.darker } lineHeight='57px'>
					{ t('heading') }
				</Text>
				<div className='mt-3'>
					<Text fontSize='20px' fontWeight='400' color={ colors.grey.pencil } lineHeight='30px'>
						{ t('subHeading') }
					</Text>
				</div>
			</div>
			<div className='px-3 mt-[50px] flex row justify-between items-center md:px-40'>
				<div className='flex gap-x-[15px]'>
					{ tabData.map((tab, idx) => (
						<div key={ idx }>
							<Button
								theme={ activeTab === idx ? 'primary' : 'secondary' }
								label={ tab.label }
								onClick={ () => setActiveTab(idx) }
							/>
						</div>
					)) }
				</div>
				<div className=' mt-3'>
					<Link href='/promo' className='max-sm:hidden'>
						<div className='see-all flex row items-center'>
							<Text fontSize='16px' fontType='p' fontWeight='900' color={ colors.paradiso.default }>
								{ t('allItemBtnLabel') }
							</Text>
							<icons.LongArrowRight className='svg-green ml-2' />
						</div>
					</Link>
				</div>
			</div>
			<div className='w-full'>
				{ promo.length !== 0 ?
					<CardsScrollHorizontal customRef={ CardNewsWrapperRef }>
						{ promo?.map((item : EventClassesDetail, index: number) => (
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
										RSLocation={ (item?.hospitals ?? [])?.map((hospital: { hospital_name: any; }) => hospital.hospital_name) }
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
			<div className='flex px-3 md:px-40'>
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