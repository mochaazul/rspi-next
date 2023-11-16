'use client';

import { useCallback, useEffect, useState } from 'react';
import * as Icons from 'react-feather';
import _, { debounce, isEqual } from 'lodash';
import { useSearchParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
	Accordion,
	Breadcrumbs,
	Button,
	Form,
	Layout,
	Modal,
	Text,
} from '@/components';
import { colors, Languages as lang } from '@/constant';
import { BreadcrumbsProps, FindDoctorState, HospitalState, I_MasterDoctorParams } from '@/interface';
import { useAppDispatch, useTypedSelector } from '@/hooks';

import { getAllDoctor, loadMoreDoctor } from '@/stores/FindDoctor';

import FindADoctorStyle from './style';
import Pills from './Pills';
import DoctorCard from './DoctorCard';
import { DoctorDataSamples } from './DoctorsDataSample';
import useFindDoctor from './useFindDoctor';
import DoctorFilter from './DoctorFilter';
import { findDoctorEvent } from '@/utils/metaPixelTrack';
import { I_SpecialitiesState } from '@/interface/specialities';

export const AccordionFilterWrapper = ({ title, children, hideToggler }: { title: string; children: React.ReactElement; hideToggler?: boolean; }) => (
	<div className='mt-4 sm:mt-12'>
		<Accordion
			openedIndex={ 0 }
			onlyOpenOne={ true }
			itemTheme={ itemType => <Accordion.ItemFilterMenu { ...itemType } hideTogler={ hideToggler } /> }
			datas={ [{
				title: title,
				desc: '',
				isJSXDesc: true,
				desc_jsx: children
			}] }
		/>
	</div>
);

const FindADoctor = (props: BreadcrumbsProps) => {
	const hospitalSelector = useTypedSelector<HospitalState>('hospital');
	const { masterDoctors, pagination, loading } = useTypedSelector<FindDoctorState>('findDoctor');
	const { specialities, clinics } = useTypedSelector<I_SpecialitiesState>('specialities');

	const getMasterDoctor = useAppDispatch<I_MasterDoctorParams>(getAllDoctor);
	const loadMoreMasterDoctor = useAppDispatch<I_MasterDoctorParams>(loadMoreDoctor);

	const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);

	const searchParams = useSearchParams()!;
	const params = new URLSearchParams(searchParams);

	const { onDeletePills } = useFindDoctor();

	const language = lang.page.findDoctor;

	useEffect(() => {
		findDoctorEvent();
	}, []);

	useEffect(() => {
		debounceFilter(searchParams);
	}, [searchParams]);

	const onChangeParam = (params: URLSearchParams) => {
		getMasterDoctor({
			queryParam: Object.fromEntries(params)
		});
	};

	const debounceFilter = useCallback(debounce(onChangeParam, 1000, { leading: true }), []);

	const RenderFilterPane = (
		<div className='filter-pane' >
			<DoctorFilter />
		</div>
	);

	const loadMore = () => {
		if (!loading) {
			loadMoreMasterDoctor({
				queryParam: Object.fromEntries(searchParams),
				pagination: {
					page: pagination.page ? pagination.page + 1 : 1
				}
			});
		}
	};

	const doctorCount = () => pagination?.count || 0;

	const onSearchDoctorByName = (value: string) => {
		params.set('keyword', value);
	};

	const getFilterValues = () => {
		const entries = Object.fromEntries(searchParams);
		const mapped: {
			id: string,
			text: string,
			key: string;
		}[] = [];
		for (const entry in entries) {
			const values = searchParams.get(entry);
			if (entry === 'hospital' && values) {
				// We need this condition since we need to map hospital name based on hospital code
				const obj = searchParams.get(entry)?.split(',');
				mapped.push(
					...hospitalSelector.hospitals
						.filter(hospital => obj?.includes(hospital.hospital_code))
						.map(item =>
						({
							id: item.hospital_code,
							text: item.name ?? '',
							key: entry
						})
						)
				);
			} else
				if (entry === 'telemedicine' && values) {
					// we need this condition since the value stored in params was string boolean "true"|"false" and we want to render it as "Telemedicine" text
					JSON.parse(values) && mapped.push({ id: 'Telemedicine', text: 'Telemedicine', key: entry });
				} else
					if (entry === 'clinic_code' && values) {
						// we need this condition to cover the rest of params but not keyword params (search doctor by name)
						const vals = values.split(',').map(item => {
							const sp = clinics.find(sp => sp.clinic_code === item);
							return { id: sp?.clinic_code ?? '-', text: sp?.clinic_name ?? '-', key: entry };
						});
						mapped.push(...vals);
					}
		}
		return mapped;
	};

	const clearSearchParams = () => {
		searchParams.forEach((value, key) => {
			params.delete(value);
		});
	};

	const hasSearchParams = () => {
		const searchParamObj = Object.fromEntries(searchParams);
		const paramFound = !_.isEmpty(searchParamObj['clinic_code']) || !_.isEmpty(searchParamObj['hospital']) || searchParamObj['telemedicine'] === 'true';
		return paramFound;
	};

	return (
		<Layout.PanelV1>
			<Layout.PanelH1>
				<Breadcrumbs datas={ props.breadcrumbsPath } />
				<FindADoctorStyle className='mt-[25px] sm:mt-[50px]'>

					{ /* Filter Pane */ }
					<div className='max-sm:hidden'>
						{ RenderFilterPane }
					</div>

					{ /* Doctors Pane */ }
					<div className='doctors-pane max-sm:pl-0 max-sm:border-0'>
						{ /* Doctor found counter */ }
						<Text
							fontSize='20px'
							fontWeight='700'
							lineHeight='24px'
							className='mb-6 max-sm:hidden'
							text={ `${ doctorCount() } ${ language.label.doctorFound }` }
						/>
						{ /* Cari Dokter - title - Mobile */ }
						<Text
							fontType='h2'
							fontSize='20px'
							lineHeight='24px'
							fontWeight='700'
							className='mb-6 sm:hidden'
							color={ colors.grey.darker }
							text={ language.heading }
						/>
						{ /* Input nama  dokter */ }
						<Form.TextField
							placeholder={ language.label.doctorName }
							featherIcon='Search'
							iconPosition='right'
							onChange={ ({ target }) => onSearchDoctorByName(target.value) }
							iconColor={ colors.grey.light }
						/>
						{ /* Search used filters - pills with remove icon */ }
						<div className='flex justify-between mt-4 w-full items-center max-sm:overflow-x-auto'>
							{ /* Applied dilter pills */ }
							<div className='flex gap-2 sm:flex-wrap max-sm:flex-nowrap max-sm:pb-2'>
								<div className='filter-pill min-w-fit sm:hidden'>
									<div onClick={ () => setFilterModalVisible(true) }>
										<Icons.Filter size={ 18 } color={ colors.paradiso.default } />
										<Text
											fontSize='16px'
											fontWeight='400'
											lineHeight='19px'
											color={ colors.paradiso.default }
											text='Filter'
										/>
									</div>
								</div>
								{
									getFilterValues().map((filter, index) => (
										<div className='min-w-fit' key={ `filter-pills-${ index }` }>
											<Pills onRemove={ () => onDeletePills(filter) }>
												<Text
													fontSize='16px'
													fontWeight='400'
													lineHeight='19px'
													text={ filter.text }
												/>
											</Pills>
										</div>
									))
								}
							</div>
							<div className='cursor-pointer max-sm:hidden min-w-fit'>
								{
									hasSearchParams() &&
									<Text
										fontSize='16px'
										fontWeight='400'
										lineHeight='19px'
										color={ colors.red.default }
										text='Clear All'
										onClick={ clearSearchParams }
									/>
								}
							</div>
						</div>
						{ /* Doctor found counter - Mobile */ }
						<div>
							<Text
								fontSize='14px'
								fontWeight='700'
								lineHeight='17px'
								className='mb-2 mt-6 sm:hidden'
								text={ `${ doctorCount() } ${ language.label.doctorFound }` }
							/>
						</div>
						{ /* Doctors result card */ }
						<InfiniteScroll
							style={ { overflow: 'unset' } }
							className='flex flex-col gap-6 sm:mt-[47px]'
							dataLength={ masterDoctors.length }
							next={ loadMore }
							hasMore={ pagination.page !== pagination.total_page }
							loader={ <div className='loader' key={ 0 }>Loading ...</div> }
							scrollThreshold={ '100px' }
						>
							{
								masterDoctors && masterDoctors.map((doctorData, index) => <DoctorCard key={ index } { ...doctorData } />)
							}
						</InfiniteScroll>
					</div>

					{ /* Popup Filter - Mobile only */ }
					<Modal
						visible={ filterModalVisible }
						onClose={ () => setFilterModalVisible(false) }
						width='90%'
						borderRadius='16px'
						backdropColor={ colors.black.opacity64 }
					>
						<div className='relative flex flex-col'>
							<div className='flex justify-between items-center mb-4'>
								<Text
									fontSize='16px'
									lineHeight='19px'
									fontType='h4'
									fontWeight='900'
									color={ colors.grey.darker }
									text='Filter'
									className=''
								/>
								<Icons.X color={ colors.grey.darker } size={ 20 } className='cursor-pointer' onClick={ () => setFilterModalVisible(false) } />
							</div>

							{ /* Filter form */ }
							<div>
								{ RenderFilterPane }
							</div>

							<div className='mt-4'>
								<Button
									theme='primary'
									themeColor={ colors.green.brandAccent }
									label='Terapkan'
									onClick={ () => setFilterModalVisible(false) }
								/>
							</div>
						</div>
					</Modal>
				</FindADoctorStyle>
			</Layout.PanelH1>
		</Layout.PanelV1>
	);
};

export default FindADoctor;