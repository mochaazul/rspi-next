'use client';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { colors } from '@/constant';
import { HospitalDetail } from '@/interface';
import { PickerItem } from '@/components/ui/DropdownSearch';

import { ClinicResponse } from '@/interface/clinic';
import Form from '@/components/ui/Form';
import Text from '@/components/ui/Text';
import { useScopedI18n } from '@/locales/client';

import Pills from '../Pills';
import useFindDoctor from '../useFindDoctor';

import Combobox, { ItemType } from '@/components/ui/Combobox';
import { I_SpecialtyDropdownResponse } from '@/interface/specialities';
import { isMobile } from 'react-device-detect';

type Props = {
	hospitals: HospitalDetail[],
	clinics: I_SpecialtyDropdownResponse[];
};

const DoctorFilter = ({ hospitals, clinics }: Props) => {

	const d = useScopedI18n('dayName.full');
	const t = useScopedI18n('page.findDoctor');

	const Days = [
		{ key: '1', label: d('sunday'), value: 'Sunday' },
		{ key: '2', label: d('monday'), value: 'Monday' },
		{ key: '3', label: d('tuesday'), value: 'Tuesday' },
		{ key: '4', label: d('wednesday'), value: 'Wednesday' },
		{ key: '5', label: d('thursday'), value: 'Thursday' },
		{ key: '6', label: d('friday'), value: 'Friday' },
		{ key: '7', label: d('saturday'), value: 'Saturday' },
	];

	const searchParams = useSearchParams();

	const params = new URLSearchParams(searchParams);

	const [speacialityValue, setSpecialityValue] = useState<ItemType | null>(null);

	const { hospitalFilter, clinicFilter, createQueryString, specialtyFilter } = useFindDoctor({
		hospitals,
		clinics
	});

	useEffect(() => {
		if (params.get('day')) {
			onChangePreferedDay(params.get('day') ?? '');
		}
	}, []);

	const onChangeHospital = ({ hospital_code, id }: HospitalDetail, checked: boolean) => {
		if (checked) {
			const hospitals = [...hospitalFilter.getAll(), { hospital_code: hospital_code, id: id }].map(item => item.hospital_code).toString();
			createQueryString('hospital_code', hospitals);
		} else {
			hospitalFilter.delete(hospital_code);
		}
	};

	const onCheckedAllHospitals = (checked: boolean) => {
		if (checked) {
			const hospitalCodes = hospitals?.map(hospital => hospital.hospital_code);
			createQueryString('hospital_code', hospitalCodes.toString());
		} else {
			hospitalFilter.clear();
		}
	};

	const onChangePreferedDay = (value: string) => {
		createQueryString('day', value);
	};

	const mapSpeciality = () => {
		if (clinics?.length > 0) {
			return clinics.filter(sp => {
				const filterValue = clinicFilter.getAll();
				const hasFilter = filterValue.some(item => item.value === sp.clinic_category);
				return !hasFilter;
			}).map(sp => ({
				id: sp.clinic_category,
				label: sp.clinic_category,
				value: sp.clinic_category
			}));
		}
		return [];
	};

	const handleRemoveSpecialty = (item: ItemType) => {
		clinicFilter.delete(item);
	};

	const onChooseSpecialty = (item: ItemType | null) => {
		clinicFilter.add(item);
	};

	const onToggleTelemedicine = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
		params.set('telemedicine', String(checked));
	};

	return <>
		<Form>
			{ /* Cari Dokter - title */ }
			<Text
				fontSize='20px'
				lineHeight='24px'
				fontWeight='700'
				className='mb-4 max-sm:hidden'
				color={ colors.grey.darker }
				text={ t('heading') }
			/>
			{ /* Dropdown Hari */ }
			{
				!isMobile &&
				<div className='mb-8'>
					<Form.Dropdown
						placeholder='Select Day'
						multiple
						menuItems={ Days }
						onChangeValueDropdown={ onChangePreferedDay }
						allOptionLabel={ d('all') }
					/>
				</div>
			}
			{ /* Horizontal spacer */ }
			<div className='x-spacer mb-8 max-sm:hidden' />
			{ /* Hospital checkbox with accordion */ }
			<Text
				fontSize='20px'
				lineHeight='24px'
				fontType='p'
				fontWeight='700'
				subClassName='max-sm:text-[16px] max-sm:leading-[23px] mb-6'
			>
				{ t('label.hospital') }
			</Text>

			<div className='flex flex-col gap-4'>
				<div>
					<Form.Checkbox
						label={ 'All Hospitals' }
						$isslider={ false }
						onChange={ evt => onCheckedAllHospitals(evt.target.checked) }
					/>
				</div>
				{
					hospitals?.map((hospital, index) => (
						<div key={ index }>
							<Form.Checkbox
								$isslider={ false }
								onChange={ event => onChangeHospital(hospital, event.target.checked) }
								checked={ hospitalFilter.getAll().some(checked => checked.id === hospital.id) }
								label={ hospital.name ?? '' }
								value={ hospital.id ?? 0 }
							/>
						</div>
					))
				}
			</div>

			{ /* Horizontal spacer */ }
			<div className='x-spacer mb-8 max-sm:hidden mt-8' />
			{ /* Specialty search with accordion */ }
			<Text
				fontSize='20px'
				lineHeight='24px'
				fontType='p'
				fontWeight='700'
				subClassName='max-sm:text-[16px] max-sm:leading-[23px] mb-6 max-sm:mt-8'
			>
				{ t('label.specialty') }
			</Text>

			<>
				<div className='mx-[1px]'>
					<Combobox
						data={ mapSpeciality() }
						placeholder={ 'Search' }
						iconName='Search'
						value={ speacialityValue }
						onSelectValue={ value => {
							if (value) {
								onChooseSpecialty(value);
							}
						} }
					/>

				</div>
				<div className='flex flex-row gap-2 flex-wrap mt-6'>
					{
						specialtyFilter?.getAll()?.map((speciality, index) => {
							return (
								speciality.label &&
								<Pills key={ index } onRemove={ () => handleRemoveSpecialty(speciality) }>
									<Text
										fontSize='16px'
										fontWeight='400'
										lineHeight='19px'
										text={ speciality.label }
									/>
								</Pills>
							);
						})
					}
				</div>
			</>

			{ /* Horizontal spacer */ }
			<div className='x-spacer my-8' />
			{ /* Others with accordion */ }
			{ /* Telemedicine is taken out since RSPI didnt provide this feature yet as per 20 Oct 23 */ }
			{ /* {
				telemedicineFilter.shouldRender() && <>
					<AccordionFilterWrapper title='Others'>
						<div>
							<Form.Checkbox
								label={ 'Telemedicine' }
								checkposition='right'
								onChange={ onToggleTelemedicine }
								checked={ telemedicineFilter.get() }
								isslider
							/>
						</div>
					</AccordionFilterWrapper>
				</>
			} */ }
		</Form>
	</>;
};

export default DoctorFilter;