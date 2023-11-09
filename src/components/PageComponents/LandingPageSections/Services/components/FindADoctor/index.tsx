
'use client';
import useFindADoctor from './useFindADoctor';
import FindDoctorStyle from './style';
import React, { useEffect, useState } from 'react';
import { getScopedI18n } from '@/locales/server';
import { PickerItem } from '@/components/ui/DropdownSearch';
import Button from '@/components/ui/Button';
import { getClinics } from '@/lib/api/clinics';
import { getHospital } from '@/lib/api/hospital';
import Form from '@/components/ui/Form';

type Props = {
	isTelemedicine: boolean;
};

const FindADoctor: React.FC<Props> = ({
	isTelemedicine = false
}) => {
	// const {
	// 	findADoctorField,
	// 	clinics,
	// 	onSubmitHandler
	// } = useFindADoctor();

	// const {
	// 	registeredValue, onSubmit, setFieldsValue
	// } = Form.useForm({ fields: findADoctorField });

	// const hospitalArr = hospitals.map(hospital => ({ key: hospital?.id?.toString(), value: hospital.hospital_code, label: hospital?.name }));

	// const onSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
	// 	const { doctorName, hospital, speciality, preferredDay } = onSubmit(evt);
	// 	onSubmitHandler(doctorName.value, hospital.value, selectedSpeciality?.speciality_code, preferredDay.value, isTelemedicine);
	// };

	// const mapSpeciality = () => {
	// 	if (clinics?.data?.length > 0) {
	// 		return clinics?.data?.filter(sp => {
	// 			const filterValue = clinicFilter.getAll();
	// 			const hasFilter = filterValue.some(item => item.id === sp.id);
	// 			return !hasFilter;
	// 		}).map(sp => ({
	// 			id: sp.id,
	// 			label: sp.clinic_name,
	// 			speciality_code: sp.clinic_code
	// 		}));
	// 	}
	// 	return [];
	// };

	const [selectedSpeciality, setSelectedSpeciality] = useState<PickerItem>();
	const onChooseSpecialty = (item: PickerItem) => {
		setSelectedSpeciality(item);
	};

	return (
		<FindDoctorStyle>
			<Form
				// onSubmit={ onSubmitForm }
				autoComplete='off'
				className='flex flex-col mx-[30px]'
			>
				<div className='form-wrapper'>
					<div className='h-full flex-1'>
						<div className='mb-2'>
							<label className='font-black text-sm'>{ 'Doctor name' }</label>
						</div>
					 <Form.TextField
							id='doctorName'
							className='input'
							placeholder={ 'doctorname' }
							iconName='Search'
							iconPosition='left'
							{
								...isTelemedicine && { label: 'doctorname' }
							}
						/>
					</div>
					<div className='h-full flex-1'>
						<div className='mb-2'>
							<label className='font-black text-sm'>{ 'Hospital' }</label>
						</div>
						 <Form.Dropdown
							menuItems={ [{ key: '1', label: 'hospital1', value: 'h1' }] }
						/>
					</div>
					<div className='h-full flex-1'>
						<div className='mb-2'>
							<label className='font-black text-sm'>{ 'speciality' }</label>
						</div>
						<Form.DropdownSearch
							isForLanding={ true }
							textFieldProps={ {
								placeholder: 'speciality',
								iconName: 'Search',
								iconPosition: 'left',
								className: 'input',
							} }
							pickerItems={ [{ id: 1, label: 'emptty', specialty_code: 'wow' }] }
							onItemClick={ onChooseSpecialty }
						/>
					</div>
					<div className='h-full flex-1'>
						{ /* Prefered day nya harusnya day only kan bukan datepicker ? */ }
						<div className='mb-2'>
							<label className='font-black text-sm'>{ 'Preferred day' }</label>
						</div>
						<Form.DateField
							id='preferredDay'
							placeholder={ 'date' }
							className='input'
							iconName='CalendarIcon'
							iconPosition='left'
						/>
					</div>
				</div>
				<div className='flex flex-1 gap-4 mt-8 justify-end'>
					<Button className='shrink-0 sm:max-w-[121px] max-sm:flex-1' theme='outline' type='reset'>{ 'reset' }</Button>
					<Button className='shrink-0 sm:max-w-[216px] max-sm:flex-1' theme='primary' type='submit'>{ 'submit' }</Button>
				</div>
			</Form>
		</FindDoctorStyle>
	);
};

export default FindADoctor;