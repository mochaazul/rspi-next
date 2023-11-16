import { useEffect, useState } from 'react';

import { BreadcrumbsProps, EventClassesState, HospitalState } from '@/interface';
import {
	Breadcrumbs,
	Button,
	Form,
	PaginationNumber,
	Text,
	Layout,
	Spinner,
	EmptyData
} from '@/components/ui';
import Card, { CardContent } from '@/components/ui/Card';
import { useAppDispatch, useTypedSelector } from '@/hooks';
import { getEvents } from '@/stores/EventClasses';
import { Languages, colors } from '@/constant';

import { EventClassesPromoStyle } from './style';
import { promoPageEvent } from '@/utils/metaPixelTrack';

const { heading, hospitalSelectionLabel, allHospitalLabel, tabPillsLabel, promoItem } = Languages.page.promoPage;

const EventClassesPromo = (props: BreadcrumbsProps) => {
	const eventsSelector = useTypedSelector<EventClassesState>('events');
	const eventsDispatch = useAppDispatch(getEvents);

	const [pageNumber, setPageNumber] = useState(1);
	const [hospitalID, setHospitalID] = useState<number | string>('');
	const [category, setCategory] = useState<'' | 'event' | 'class' | 'promo'>('');

	const { hospitals } = useTypedSelector<HospitalState>('hospital');

	const hospitalArr = hospitals.map(hospital => ({ key: hospital?.id?.toString(), value: hospital?.id?.toString(), label: hospital?.name }));

	useEffect(() => {
		promoPageEvent();
		eventsDispatch({
			queryParam: {
				page: pageNumber,
				limit: 10,
				is_publish: true,
				category: category,
				hospital_id: hospitalID
			}
		});
	}, []);

	useEffect(() => {
		eventsDispatch({
			queryParam: {
				page: pageNumber,
				limit: 10,
				is_publish: true,
				category: category,
				hospital_id: hospitalID
			}
		});
	}, [hospitalID, category]);

	return (
		<EventClassesPromoStyle>
			<Layout.PanelH1>
				<div className='header'>
					<Breadcrumbs datas={ props.breadcrumbsPath } />
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
							eventsSelector.loading && <Spinner size='m' className='sm:my-10 my-3' />
						}
						{

							!eventsSelector.loading && eventsSelector?.events?.map((data, index) => (
								<Card
									key={ index }
									image={ data.img_url_card }
									imageHeight='200px'
									content={ <CardContent title={ data.title } description={ data.short_description } /> }
									footer={ ({ isHover }) => <Button theme={ isHover ? 'primary' : 'secondary' } label={ promoItem.detailsBtnLabel } /> }
									className='mb-0'
									to={ `${ data.id }` }
									iconShare={ true }
								/>
							))
						}
						{
							!eventsSelector.loading && eventsSelector?.events?.length == 0 ?
								<Text textAlign='center' fontSize='20px' color={ colors.grey.dark } className='mt-[20px]'>
									<EmptyData menu='Promo and Packages' />
								</Text> : <></>
						}
					</div>
				</div>
				<div className='mt-[50px] flex flex-col items-center'>
					<PaginationNumber
						totalPage={ eventsSelector.pagination?.total_page ?? 1 }
						currentPage={ pageNumber }
						onItemClick={ page => setPageNumber(page) }
					/>
				</div>
			</Layout.PanelH1>
		</EventClassesPromoStyle>
	);
};

export default EventClassesPromo;