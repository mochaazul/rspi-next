import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button, Text, Form } from '@/components';
import { colors, Languages as lang } from '@/constant';
import { useAppDispatch, useTypedSelector } from '@/hooks';
import { HospitalDetail, HospitalState } from '@/interface';
import { getClinics, getSpecialities } from '@/stores/Specialities';
import { I_SpecialitiesState } from '@/interface/specialities';
import { PickerItem } from '@/components/DropdownSearch';

import Pills from '../Pills';
import { AccordionFilterWrapper } from '../page';
import useFindDoctor from '../useFindDoctor';

const language = lang.page.findDoctor;
const dayLang = lang.dayName.full;

const Days = [
	{ key: '1', label: dayLang.sunday, value: 'Sunday' },
	{ key: '2', label: dayLang.monday, value: 'Monday' },
	{ key: '3', label: dayLang.tuesday, value: 'Tuesday' },
	{ key: '4', label: dayLang.wednesday, value: 'Wednesday' },
	{ key: '5', label: dayLang.thursday, value: 'Thursday' },
	{ key: '6', label: dayLang.friday, value: 'Friday' },
	{ key: '7', label: dayLang.saturday, value: 'Saturday' },
];

const DoctorFilter = () => {

	const hospitalSelector = useTypedSelector<HospitalState>('hospital');
	const { specialities, clinics } = useTypedSelector<I_SpecialitiesState>('specialities');
	const getSpecialitiesDispatch = useAppDispatch(getSpecialities);
	const getClinicsDispatch = useAppDispatch(getClinics);

	const [searchParams, setSearchParams] = useSearchParams();

	const { hospitalFilter, telemedicineFilter, clinicFilter } = useFindDoctor();

	useEffect(() => {
		getClinicsDispatch();
	}, []);

	// Tidak menggunakan helper form karena
	// Helper form pada skeleton tidak support untuk ekstrak value onChange
	// Value form pada helper form hanya dapat di ambil ketika trigger onSubmit
	// TODO : Add support for onChange values on form Component
	// TODO : Add checkbox support on useForm

	const onChangeHospital = ({ hospital_code, id }: HospitalDetail, checked: boolean) => {
		if (checked) {
			const hospitals = [...hospitalFilter.getAll(), { hospital_code: hospital_code, id: id }].map(item => item.hospital_code).toString();
			setSearchParams(prev => {
				prev.set('hospital', hospitals);
				return prev;
			});
		} else {
			hospitalFilter.delete(hospital_code);
		}
	};

	const onCheckedAllHospitals = (checked: boolean) => {
		if (checked) {
			setSearchParams(prev => {
				const hospitals = hospitalSelector.hospitals.map(hospital => hospital.hospital_code);
				prev.set('hospital', hospitals.toString());
				return prev;
			});
		} else {
			hospitalFilter.clear();
		}
	};

	const onChangePreferedDay = (value: string) => {
		setSearchParams(prev => {
			prev.set('day', value);
			return prev;
		});
	};

	const mapSpeciality = () => {
		if (clinics?.length > 0) {
			return clinics.filter(sp => {
				const filterValue = clinicFilter.getAll();
				const hasFilter = filterValue.some(item => item.id === sp.id);
				return !hasFilter;
			}).map(sp => ({
				id: sp.id,
				label: sp.clinic_name,
				speciality_code: sp.clinic_code
			}));
		}
		return [];
	};

	const handleRemoveSpecialty = (item: PickerItem) => {
		clinicFilter.delete(item);
	};

	const onChooseSpecialty = (item: PickerItem) => {
		clinicFilter.add(item);
	};

	const onToggleTelemedicine = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
		setSearchParams(prev => {
			prev.set('telemedicine', String(checked));
			return prev;
		});
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
				text={ language.heading }
			/>
			{ /* Dropdown Hari */ }
			<div className='mb-8'>
				<Form.Dropdown
					placeholder='Select Day'
					multiple
					menuItems={ Days }
					onChangeValueDropdown={ onChangePreferedDay }
				/>
			</div>
			{ /* Horizontal spacer */ }
			<div className='x-spacer mb-8 max-sm:hidden' />
			{ /* Hospital checkbox with accordion */ }
			<AccordionFilterWrapper title='Hospital'>
				<div className='flex flex-col gap-4'>
					<div>
						<Form.Checkbox
							label={ 'All Hospitals' }
							isslider={ false }
							onChange={ evt => onCheckedAllHospitals(evt.target.checked) }
						/>
					</div>
					{
						hospitalSelector.hospitals.map((hospital, index) => (
							<div key={ index }>
								<Form.Checkbox
									isslider={ false }
									onChange={ event => onChangeHospital(hospital, event.target.checked) }
									checked={ hospitalFilter.getAll().some(checked => checked.id === hospital.id) }
									label={ hospital.name ?? '' }
									value={ hospital.id ?? 0 }
								/>
							</div>
						))
					}
				</div>
			</AccordionFilterWrapper>
			{ /* Horizontal spacer */ }
			<div className='x-spacer mb-8 max-sm:hidden' />
			{ /* Specialty search with accordion */ }
			<AccordionFilterWrapper title='Specialty' hideToggler>
				<>
					<div className='mx-[1px]'>
						<Form.DropdownSearch
							textFieldProps={ {
								placeholder: 'Search',
								featherIcon: 'Search',
								iconPosition: 'left',
								iconColor: colors.grey.light
							} }
							pickerItems={ mapSpeciality() }
							onItemClick={ onChooseSpecialty }
						/>
					</div>
					<div className='flex flex-row gap-2 flex-wrap mt-6'>
						{
							clinicFilter?.getAll()?.map((speciality, index) => {
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
			</AccordionFilterWrapper>
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