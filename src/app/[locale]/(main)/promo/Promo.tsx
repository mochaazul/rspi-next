'use client';
import { useEffect, useState } from 'react';

import { EventClassesState, HospitalDetail, HospitalState, Pagination } from '@/interface';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
	Breadcrumbs,
	Button,
	Form,
	PaginationNumber,
	Text,
	Spinner,
	EmptyData
} from '@/components/ui';
import Card, { CardContent } from '@/components/ui/Card';
import { colors } from '@/constant';
import { promoPageEvent } from '@/utils/metaPixelTrack';
import { useScopedI18n } from '@/locales/client';
import { BreadcrumbsType } from '@/components/ui/Breadcrumbs';

import { fetchEvents } from './helpers';
import { EventClassesPromoStyle } from './style';
import { PanelH1 } from '../style';

const EventClassesPromo = ({
	hospitalSelector,
	breadcrumbsPath,
	events,
	pagination
}: {
	breadcrumbsPath: BreadcrumbsType['datas'],
	hospitalSelector: HospitalDetail[],
	events: EventClassesState['events'],
	pagination: Pagination,
}) => {
	const t = useScopedI18n('page.promoPage');
	const searchParam = useSearchParams()!;
	
	const pathname = usePathname();
	const navigate = useRouter();

	const params = new URLSearchParams(searchParam);
	const categoryParams = params.get('category') ?? '';
	const hospitalIDParams = params.get('hospital_id') ?? '';
	const pageParams = params.get('page') ?? 1;
	
	const [loading, setLoading] = useState(false);

	const hospitalArr = Object.values(hospitalSelector || [])?.map(hospital => ({ key: hospital?.id?.toString(), value: hospital?.id?.toString(), label: hospital?.name }));

	useEffect(() => {
		promoPageEvent();
	}, []);

	const filterCategory = (cat: '' | 'event' | 'class' | 'promo') => {
		if (cat === '') {
			params.delete('category');
		} else {
			params.set('category', cat);
		}
		navigate.push(`${ pathname }?${ params.toString() }`);
	};

	const filterHospitalID = (id: string) => {
		params.set('hospital_id', id);
		navigate.push(`${ pathname }?${ params.toString() }`);
	};
	
	const filterPage = (pages: number) => {
		params.set('page', pages.toString());
		navigate.push(`${ pathname }?${ params.toString() }`);
	};

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
						text={ t('heading') }
						className='sm:mt-[50px] mt-[25px]'
						subClassName='max-sm:text-[24px]'
					/>
					<div className='flex sm:flex-row flex-col sm:mt-[50px] mt-[15px] gap-4 sm:items-center'>
						<Text
							fontSize='20px'
							fontWeight='700'
							lineHeight='24px'
							text={ t('hospitalSelectionLabel') }
							subClassName='max-sm:font-black max-sm:text-[16px]'
						/>
						<div className='min-w-[300px]'>
							<Form.Dropdown
								defaultValue={ hospitalIDParams }
								placeholder={ t('allHospitalLabel') }
								menuItems={ [{ key: '', value: '', label: t('allHospitalLabel') }, ...hospitalArr] }
								onChange={ event => filterHospitalID(event.currentTarget.value) }
							/>
						</div>
					</div>
					<div className='flex flex-row mt-[50px] gap-4 items-center max-sm:justify-between'>
						<div>
							<Button className='mb-4' theme={ categoryParams === '' ? 'primary' : 'secondary' } $hoverTheme='primary' onClick={ () => filterCategory('') }>{ t('tabPillsLabel.allLabel') }</Button>
						</div>
						<div>
							<Button className='mb-4' theme={ categoryParams === 'event' ? 'primary' : 'secondary' } $hoverTheme='primary' onClick={ () => filterCategory('event') }>{ t('tabPillsLabel.eventLabel') }</Button>
						</div>
						<div>
							<Button className='mb-4' theme={ categoryParams === 'class' ? 'primary' : 'secondary' } $hoverTheme='primary' onClick={ () => filterCategory('class') }>{ t('tabPillsLabel.classesLabel') }</Button>
						</div>
						<div>
							<Button className='mb-4' theme={ categoryParams === 'promo' ? 'primary' : 'secondary' } $hoverTheme='primary' onClick={ () => filterCategory('promo') }>{ t('tabPillsLabel.promoLabel') }</Button>
						</div>
					</div>
				</div>
				<div className='content'>
					<div className='flex flex-row flex-wrap gap-8 w-full justify-center'>
						{
							loading && <Spinner size='m' className='sm:my-10 my-3' />
						}
						{

							!loading && events?.map((data, index) => {
								return (
									<Card
										id={ data.id }
										key={ index }
										image={ data.img_url_card }
										imageHeight='200px'
										content={ <CardContent title={ data.title } description={ data.short_description } /> }
										footer={ ({ isHover }) => <Button theme={ isHover ? 'primary' : 'secondary' } label={ t('promoItem.detailsBtnLabel') } /> }
										className='mb-0'
										to={ `/promo/${ data.slug }` }
										iconShare={ true }
									/>
								);
							})
						}
						{
							!loading && events?.length === 0 ?
								<Text textAlign='center' fontSize='20px' color={ colors.grey.dark } className='mt-[20px]'>
									<EmptyData menu='Promo and Packages' />
								</Text> : <></>
						}
					</div>
				</div>
				<div className='mt-[50px] flex flex-col items-center'>
					<PaginationNumber
						totalPage={ pagination?.total_page ?? 1 }
						currentPage={ Number(pageParams) ?? 1 }
						onItemClick={ page => filterPage(page) }
					/>
				</div>
			</PanelH1>
		</EventClassesPromoStyle>
	);
};

export default EventClassesPromo;