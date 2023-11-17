'use client';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

import { BreadcrumbsProps, EventClassesState, HospitalState, Pagination } from '@/interface';
import {
	Breadcrumbs,
	Button,
	Form,
	PaginationNumber,
	Text,
	Spinner,
	EmptyData
} from '@/components/ui';
import { PanelH1, } from '@/app/[locale]/(main)/layout';
import Card, { CardContent } from '@/components/ui/Card';
import { useAppDispatch, useTypedSelector } from '@/hooks';
import { getEvents } from '@/stores/EventClasses';
import { Languages, colors } from '@/constant';
import { EventClassesPromoStyle } from './style';
import { promoPageEvent } from '@/utils/metaPixelTrack';
import { BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import { fetchEvents } from './helpers';

const { heading, hospitalSelectionLabel, allHospitalLabel, tabPillsLabel, promoItem } = Languages.page.promoPage;

const EventClassesPromo = ({
	hospitalSelector,
	breadcrumbsPath,
	events,
	pagination
}:{
	breadcrumbsPath: BreadcrumbsType['datas'],
    hospitalSelector: HospitalState,
	events: EventClassesState['events'],
	pagination: Pagination,
}) => {
	// const eventsData = useTypedSelector<EventClassesState>('events');
	// const eventsDispatch = useAppDispatch(getEvents);

	const [pageNumber, setPageNumber] = useState(1);
	const [hospitalID, setHospitalID] = useState<number | string>('');
	const [category, setCategory] = useState<'' | 'event' | 'class' | 'promo'>('');
	const [eventsData, setEventsData] = useState(events);
	const [loading, setLoading] = useState(false);
	// const { hospitals } = useTypedSelector<HospitalState>('hospital');

	const hospitalArr = Object.values(hospitalSelector || [])?.map(hospital => ({ key: hospital?.id?.toString(), value: hospital?.id?.toString(), label: hospital?.name }));

	useEffect(() => {
		setLoading(true);
		promoPageEvent();
	}, []);

	useEffect(() => {
		setLoading(true);
		fetchEvents({
			page: pageNumber,
			limit: 10,
			is_publish: true,
			category: category,
			hospital_id: hospitalID
		}).then(function(response: any) {
			setEventsData(response.data);
			setLoading(false);
		});
	}, [hospitalID, category]);

	return (
		<EventClassesPromoStyle>
			<PanelH1>
				<div className='header'>
					<Breadcrumbs datas={ breadcrumbsPath } />
					<Text
						fontSize='44px'
						fontType='h1'
						fontWeight='900'
						lineHeight='57px'
						text={ heading }
						className='sm:mt-[50px] mt-[25px]'
						subClassName='max-sm:text-[24px]'
					/>
					<div className='flex sm:flex-row flex-col sm:mt-[50px] mt-[15px] gap-4 sm:items-center'>
						<Text
							fontSize='20px'
							fontWeight='700'
							lineHeight='24px'
							text={ hospitalSelectionLabel }
							subClassName='max-sm:font-black max-sm:text-[16px]'
						/>
						<div className='min-w-[300px]'>
							<Form.Dropdown
								placeholder={ allHospitalLabel }
								menuItems={ [{ key: '', value: '', label: allHospitalLabel }, ...hospitalArr] }
								onChange={ event => setHospitalID(event.currentTarget.value === '' ? '' : parseInt(event.currentTarget.value)) }
							/>
						</div>
					</div>
					<div className='flex flex-row mt-[50px] gap-4 items-center max-sm:justify-between'>
						<div>
							<Button className='mb-4' theme={ category === '' ? 'primary' : 'secondary' } hoverTheme='primary' onClick={ () => setCategory('') }>{ tabPillsLabel.allLabel }</Button>
						</div>
						<div>
							<Button className='mb-4' theme={ category === 'event' ? 'primary' : 'secondary' } hoverTheme='primary' onClick={ () => setCategory('event') }>{ tabPillsLabel.eventLabel }</Button>
						</div>
						<div>
							<Button className='mb-4' theme={ category === 'class' ? 'primary' : 'secondary' } hoverTheme='primary' onClick={ () => setCategory('class') }>{ tabPillsLabel.classesLabel }</Button>
						</div>
						<div>
							<Button className='mb-4' theme={ category === 'promo' ? 'primary' : 'secondary' } hoverTheme='primary' onClick={ () => setCategory('promo') }>{ tabPillsLabel.promoLabel }</Button>
						</div>
					</div>
				</div>
				<div className='content'>
					<div className='flex flex-row flex-wrap gap-8 w-full justify-center'>
						{
							loading && <Spinner size='m' className='sm:my-10 my-3' />
						}
						{

							!loading && eventsData?.map((data, index) => (
								<Card
									key={ index }
									image={ data.img_url_card }
									imageHeight='200px'
									content={ <CardContent title={ data.title } description={ data.short_description } /> }
									footer={ ({ isHover }) => <Button theme={ isHover ? 'primary' : 'secondary' } label={ promoItem.detailsBtnLabel } /> }
									className='mb-0'
									to={ `/promo/${ data.id }` }
									iconShare={ true }
								/>
							))
						}
						{
							!loading && eventsData?.length === 0 ?
								<Text textAlign='center' fontSize='20px' color={ colors.grey.dark } className='mt-[20px]'>
									<EmptyData menu='Promo and Packages' />
								</Text> : <></>
						}
					</div>
				</div>
				<div className='mt-[50px] flex flex-col items-center'>
					<PaginationNumber
						totalPage={ pagination?.total_page ?? 1 }
						currentPage={ pageNumber }
						onItemClick={ page => setPageNumber(page) }
					/>
				</div>
			</PanelH1>
		</EventClassesPromoStyle>
	);
};

export default EventClassesPromo;