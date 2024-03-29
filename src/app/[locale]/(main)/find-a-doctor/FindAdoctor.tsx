'use client';
import * as Icons from 'react-feather';
import _ from 'lodash';
import { useSearchParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';

import { colors } from '@/constant';

import FindADoctorStyle from './style';
import Pills from './Pills';
import DoctorCard from './DoctorCard';
import Text from '@/components/ui/Text';
import { PanelH1, PanelV1 } from '../style';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import DoctorFilter from './DoctorFilter';
import ResultHeader from './ResultHeader';
import LangWrapper from '@/components/ui/LangWrapper';
import useFindDoctor from './useFindDoctor';
import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { useGetDoctors } from '@/lib/api/client/doctors';
import { useScopedI18n } from '@/locales/client';
import { HospitalDetail, I_MasterDoctor, ResponseType } from '@/interface';
import { I_SpecialtyDropdownResponse } from '@/interface/specialities';

type Props ={
  hospital: HospitalDetail[]
  clinics: I_SpecialtyDropdownResponse[]
	doctorFallback: ResponseType<I_MasterDoctor[]>
}

export default function FindADoctorComponent({ hospital, clinics, doctorFallback }:Props) {

	const { onDeletePills, clearSearchParams, doctorNameFilter } = useFindDoctor({ clinics: clinics, hospitals: hospital });

	const [resetSearchDoctor, setResetSearchDoctor] = useState(false);

	const t = useScopedI18n('page.findDoctor');

	const searchParams = useSearchParams();

	const breadCrumbs = [{ name: t('heading'), url: '#' }];

	const { data: doctorResponse, isLoading: doctorLoading, size: currentPage, setSize } = useGetDoctors({ query: Object.fromEntries(searchParams) });

	const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);

	const RenderFilterPane = (
		<div className='filter-pane' >
			<DoctorFilter hospitals={ hospital } clinics={ clinics } />
		</div>
	);

	const loadMore = () => {
		setSize(currentPage + 1);
	};

	const clearParams = () => {
		setResetSearchDoctor(true);
		clearSearchParams();
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
			if (entry === 'hospital_code' && values && hospital) {
				// We need this condition since we need to map hospital name based on hospital code
				const obj = searchParams.get(entry)?.split(',');
				mapped.push(
					...hospital
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
					if (entry === 'clinic_category' && values) {
						// we need this condition to cover the rest of params but not keyword params (search doctor by name)
						const vals = values.split(',').map(item => {
							const sp = clinics.find(sp => sp.clinic_category === item);
							return { id: sp?.clinic_category ?? '-', text: sp?.clinic_category ?? '-', key: entry };
						});
						mapped.push(...vals);
					}
		}
		return mapped;
	};

	const hasSearchParams = () => {
		const searchParamObj = Object.fromEntries(searchParams);
		const paramFound = !_.isEmpty(searchParamObj['clinic_category']) || !_.isEmpty(searchParamObj['hospital_code']) || searchParamObj['telemedicine'] === 'true';
		return paramFound;
	};

	const doctorData = () => {
		if (doctorResponse) {
			return doctorResponse.flatMap(res => res.data);
		}
		if (doctorFallback) {
			return doctorFallback.data;
		}
		return [];
	};

	const doctorCount = () => {
		if (doctorResponse) {
			return doctorResponse[0].pagination.count || 0;
		}
		if (doctorFallback) {
			return doctorFallback.pagination.count || 0;
		}
		return 0;
	};

	useEffect(() => {
		if (!doctorResponse) {
			setSize(currentPage);
		};
	}, [doctorResponse]);

	const hasMore = () => {
		if (doctorResponse) {
			const totalPage = doctorResponse[0].pagination.total_page || 0;
			return currentPage < totalPage;
		}
		return false;
	};

	return (
		<div className='bg-[#FAFAFA] pt-[1px]'>
			<PanelV1 className='pt-[0px] md:pt-[60px]'>
				<PanelH1>
					<LangWrapper>
						<Breadcrumbs datas={ breadCrumbs } />
					</LangWrapper>

					<FindADoctorStyle className='mt-[25px] sm:mt-[50px]'>
						{ /* Filter Pane */ }
						<div className='max-sm:hidden'>
							{ RenderFilterPane }
						</div>

						{ /* Doctors Pane */ }
						<div className='doctors-pane max-sm:pl-0 max-sm:border-0'>

							<ResultHeader doctorCount={ doctorCount() } setter={ doctorNameFilter.set } getter={ doctorNameFilter.get } reset={ resetSearchDoctor } />

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
												onClick={ clearParams }
											/>
									}
								</div>
							</div>

							{ /* Search used filters - pills with remove icon */ }
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

							<InfiniteScroll
								style={ { overflow: 'unset' } }
								className='flex flex-col gap-6 sm:mt-[47px]'
								dataLength={ doctorData().length || 0 }
								next={ loadMore }
								hasMore={ hasMore() }
								loader={ <div className='loader' key={ 0 }>Loading ...</div> }
								scrollThreshold={ '100px' }
							>
								{
									doctorData().map((doctorData, index) => <DoctorCard key={ index } { ...doctorData } />)
								}
							</InfiniteScroll>
							{ /* Doctors result card */ }
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
										label={ t('label.applyFilter') }
										onClick={ () => setFilterModalVisible(false) }
									/>
								</div>
							</div>
						</Modal>
					</FindADoctorStyle>
				</PanelH1>
			</PanelV1>
		</div>

	);
};
