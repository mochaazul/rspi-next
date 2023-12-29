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
import Card, { CardContent, CardContentWithInner, CardsScrollHorizontal } from '@/components/ui/Card';
import { colors } from '@/constant';
import { promoPageEvent } from '@/utils/metaPixelTrack';
import { useScopedI18n } from '@/locales/client';
import { BreadcrumbsType } from '@/components/ui/Breadcrumbs';

import { EventClassesPromoStyle } from './style';
import { PanelH1 } from '../style';

type DataEventProps = {
	id: number;
	img_url_card?: string;
	title?: string;
	short_description?: string;
	slug?: string;
	hospitals?: any;
	category: string;
}

type DataHospitalProps = {
	id: number;
	name?: string;
}

const EventClassesPromo = ({
	hospitalSelector,
	breadcrumbsPath,
	events,
	pagination
}: {
	breadcrumbsPath: BreadcrumbsType['datas'],
	hospitalSelector: DataHospitalProps[],
	events: DataEventProps[],
	pagination: Pagination,
}) => {
	const t = useScopedI18n('page.promoPage');
	const searchParam = useSearchParams()!;
	
	const totalPages = pagination?.total_page || 1;

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
		if (id === '') {
			params.delete('hospital_id');
		} else {
			params.set('hospital_id', id);
		}
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
						subClassName='max-sm:text-[24px] text-gray-1'
					/>
					<div className='flex sm:flex-row sm:mt-[42px] mt-[16px] flex-col justify-between items-start sm:items-center'>
						<div className='flex sm:flex-row flex-col sm:gap-4 gap-1 sm:items-center sm:w-auto w-full'>
							<Text
								fontSize='20px'
								fontWeight='700'
								lineHeight='24px'
								text={ t('hospitalSelectionLabel') }
								subClassName='max-sm:font-black max-sm:text-[16px]'
							/>
							<div className='sm:min-w-[300px] min-w-full'>
								<Form.Dropdown
									defaultValue={ hospitalIDParams }
									placeholder={ t('allHospitalLabel') }
									menuItems={ [{ key: '', value: '', label: t('allHospitalLabel') }, ...hospitalArr] }
									onChange={ event => filterHospitalID(event.currentTarget.value) }
								/>
							</div>
						</div>
						<div className='flex flex-row sm:gap-4 gap-[10px] items-center mt-[8px] sm:mt-0 max-sm:justify-between'>
							<div>
								<Button className='sm:rounded-[10px] rounded-[8px] sm:py-[10px] py-[5px] sm:px-[20px] px-[18px] sm:text-[16px] text-[14px]' theme={ categoryParams === '' ? 'primary' : 'secondary' } $hoverTheme='primary' onClick={ () => filterCategory('') }>{ t('tabPillsLabel.allLabel') }</Button>
							</div>
							<div>
								<Button className='sm:rounded-[10px] rounded-[8px] sm:py-[10px] py-[5px] sm:px-[20px] px-[18px] sm:text-[16px] text-[14px]' theme={ categoryParams === 'event' ? 'primary' : 'secondary' } $hoverTheme='primary' onClick={ () => filterCategory('event') }>{ t('tabPillsLabel.eventLabel') }</Button>
							</div>
							<div>
								<Button className='sm:rounded-[10px] rounded-[8px] sm:py-[10px] py-[5px] sm:px-[20px] px-[18px] sm:text-[16px] text-[14px]' theme={ categoryParams === 'class' ? 'primary' : 'secondary' } $hoverTheme='primary' onClick={ () => filterCategory('class') }>{ t('tabPillsLabel.classesLabel') }</Button>
							</div>
							<div>
								<Button className='sm:rounded-[10px] rounded-[8px] sm:py-[10px] py-[5px] sm:px-[20px] px-[18px] sm:text-[16px] text-[14px]' theme={ categoryParams === 'promo' ? 'primary' : 'secondary' } $hoverTheme='primary' onClick={ () => filterCategory('promo') }>{ t('tabPillsLabel.promoLabel') }</Button>
							</div>
						</div>
					</div>
					
				</div>
				{ /* Sebenarnya tingginya mt-41, di kasih 17 karena di card sudah adamt-24 */ }
				<div className='content mt-[0px] sm:mt-[17px]'>
					<div className='hidden sm:grid sm:grid-cols-3 grid-cols-1 gap-x-8 w-full justify-center'>
						{
							loading && <Spinner size='m' className='sm:my-10 my-3' />
						}
						{

							!loading && events?.map((data, index) => {
								return (
									<Card
										id={ data.id }
										slug={ data.slug }
										key={ index }
										image={ data.img_url_card }
										imageHeight='200px'
										header={
											<Text
												color={ colors.grey.dark }
												fontSize='16px'
												text={ data.category.charAt(0).toUpperCase() + data.category.slice(1) }
												fontWeight='400'
												subClassName='max-sm:text-xs max-sm:leading-normal'
											/>
										}
										content={
											<CardContentWithInner
												title={ data.title || '' }
												description={ data.short_description || '' }
												RSLocation={ (data.hospitals ?? []).map((hospital: { hospital_name: any; }) => hospital.hospital_name) }
												index={ index }
											/>
										}
										footer={ ({ isHover }) => <Button theme={ isHover ? 'primary' : 'secondary' } label={ t('promoItem.detailsBtnLabel') } /> }
										className='mb-0 !w-[100%]'
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
					<div className='mobile-view w-full sm:hidden grid grid-cols-1'>
						<CardsScrollHorizontal className='pl-0' >
							{
								events?.map((data, index) => {
									return (
										<Card
											id={ data.id }
											slug={ data.slug }
											key={ index }
											image={ data.img_url_card }
											imageHeight='200px'
											header={
												<Text
													color={ colors.grey.dark }
													fontSize='16px'
													text={ data.category.charAt(0).toUpperCase() + data.category.slice(1) }
													fontWeight='400'
													subClassName='max-sm:text-xs max-sm:leading-normal'
												/>
											}
											content={
												<CardContentWithInner
													title={ data.title || '' }
													description={ data.short_description || '' }
													RSLocation={ (data.hospitals ?? []).map((hospital: { hospital_name: any; }) => hospital.hospital_name) }
													index={ index }
												/>
											}
											footer={ ({ isHover }) => <Button theme={ isHover ? 'primary' : 'secondary' } label={ t('promoItem.detailsBtnLabel') } /> }
											className='mb-0 !w-[90%]'
											to={ `/promo/${ data.slug }` }
											iconShare={ true }
										/>
									);
								})
							}
							
						</CardsScrollHorizontal>
					</div>
				</div>
				<div className='mt-[50px] flex flex-col items-center'>
					{ totalPages > 1 ? <PaginationNumber
						totalPage={ totalPages }
						currentPage={ Number(pageParams) ?? 1 }
						onItemClick={ page => filterPage(page) }
					/>
						: <></>
					}
				</div>
			</PanelH1>
		</EventClassesPromoStyle>
	);
};

export default EventClassesPromo;