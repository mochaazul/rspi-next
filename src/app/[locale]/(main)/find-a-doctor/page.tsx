'use client';
import * as Icons from 'react-feather';
import _, { debounce } from 'lodash';
import { useSearchParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';

import { colors } from '@/constant';
import { BreadcrumbsProps, I_MasterDoctor } from '@/interface';

import FindADoctorStyle from './style';
import Pills from './Pills';
import DoctorCard from './DoctorCard';
import { getI18n, getScopedI18n } from '@/locales/server';
import useSWR from 'swr';
import fetcher from '@/lib/api/utils/fetcher';
import Text from '@/components/ui/Text';
import Layout from '@/components/Layout/Layout';
import { PanelH1, PanelV1 } from '../style';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import DoctorFilter from './DoctorFilter';
import { Accordion } from '@/components/ui';
import Form from '@/components/ui/Form';
import { useScopedI18n } from '@/locales/client';
import ResultHeader from './ResultHeader';
import LangWrapper from '@/components/ui/LangWrapper';
import useFindDoctor from './useFindDoctor';
import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { findDoctorEvent } from '@/utils/metaPixelTrack';
import { useGetDoctors } from '@/lib/api/client/doctors';
import { useGetHospital } from '@/lib/api/client/hospital';
import { useGetClinics } from '@/lib/api/client/clinics';

const breadCrumbs = [{ name: 'Find a Doctor', url: '#' }];

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

export default function Page(props: BreadcrumbsProps) {

	const searchParams = useSearchParams();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const hasKeyword = searchParams.get('keyword');

	const { data: doctorResponse, error: doctorError, isLoading: doctorLoading, mutate, size, setSize } = useGetDoctors({ query: Object.fromEntries(searchParams)	});

	const { data: hospitalResponse, error: hospitalError, isLoading: hospitalLoading } = useGetHospital();
	const { data: clinicsResponse, error: clinicsError, isLoading: clinicsLoading } = useGetClinics();

	const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);

	const { onDeletePills, clearSearchParams, doctorNameFilter } = useFindDoctor({ clinics: clinicsResponse?.data || [], hospitals: hospitalResponse?.data || [] });

	// useEffect(() => {
	// 	findDoctorEvent();
	// }, []);

	const RenderFilterPane = (
		<div className='filter-pane' >
			<DoctorFilter hospitals={ hospitalResponse?.data || [] } clinics={ clinicsResponse?.data || [] } />
		</div>
	);

	const loadMore = () => {
		setSize(size + 1);
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
			if (entry === 'hospital_code' && values && hospitalResponse) {
				// We need this condition since we need to map hospital name based on hospital code
				const obj = searchParams.get(entry)?.split(',');
				mapped.push(
					...hospitalResponse.data
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
							const sp = clinicsResponse?.data.find(sp => sp.clinic_code === item);
							return { id: sp?.clinic_code ?? '-', text: sp?.clinic_name ?? '-', key: entry };
						});
						mapped.push(...vals);
					}
		}
		return mapped;
	};

	const hasSearchParams = () => {
		const searchParamObj = Object.fromEntries(searchParams);
		const paramFound = !_.isEmpty(searchParamObj[ 'specialty_category' ]) || !_.isEmpty(searchParamObj[ 'hospital_code' ]) || searchParamObj[ 'telemedicine' ] === 'true';
		return paramFound;
	};

	const doctorData = () => {
		if (doctorResponse) {
			return doctorResponse.flatMap(res => res.data);
		}
		return [];
	};

	const doctorCount = () => {
		if (doctorResponse) {
			return doctorResponse[0].pagination.count || 0;
		}
		return 0;
	};

	const hasMore = () => {
		return doctorCount() > size;
	};

	return (
		<PanelV1>
			<PanelH1>
				<LangWrapper>
					<Breadcrumbs datas={ breadCrumbs } />
					<FindADoctorStyle className='mt-[25px] sm:mt-[50px]'>

						{ /* Filter Pane */ }
						<div className='max-sm:hidden'>
							{ RenderFilterPane }
						</div>

						{ /* Doctors Pane */ }
						<div className='doctors-pane max-sm:pl-0 max-sm:border-0'>
							<ResultHeader doctorCount={ doctorCount() } setter={ doctorNameFilter.set } getter={ doctorNameFilter.get } />
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
											<div className='min-w-fit' key={ `filter-pills-${index}` }>
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
									text={ `${ doctorCount() } Doctor Found` }
								/>
							</div>
							{ /* Doctors result card */ }
							<InfiniteScroll
								style={ { overflow: 'unset' } }
								className='flex flex-col gap-6 sm:mt-[47px]'
								dataLength={ doctorData().length || 0 }
								next={ loadMore }
								hasMore={  hasMore() }
								loader={ <div className='loader' key={ 0 }>Loading ...</div> }
								scrollThreshold={ '100px' }
							>
								{
									doctorData().map((doctorData, index) => <DoctorCard key={ index } { ...doctorData } />)
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
								<div className='flex justify-between items-center'>
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
								<div className='x-spacer my-4' />

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
				</LangWrapper>
			</PanelH1>
		</PanelV1>
	);
};
