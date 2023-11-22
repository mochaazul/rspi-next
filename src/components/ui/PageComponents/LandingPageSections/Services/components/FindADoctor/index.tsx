
'use client';
import FindDoctorStyle from './style';
import React, { useState } from 'react';
import { PickerItem } from '@/components/ui/DropdownSearch';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import { useScopedI18n } from '@/locales/client';
import { HospitalDetail } from '@/interface';
import { ClinicResponse } from '@/interface/clinic';
import useFindADoctor from './useFindADoctor';

type Props = {
	isTelemedicine: boolean;
	hospitals: HospitalDetail[],
	clinics: ClinicResponse[];
};

const FindADoctor: React.FC<Props> = ({
	isTelemedicine = false,
	hospitals,
	clinics
}) => {
	const t = useScopedI18n('page.landingPage.services.findDoctor');

	const {
		findADoctorField,
		onSubmitHandler
	} = useFindADoctor();

	const {
		onSubmit, registeredValue
	} = Form.useForm({ fields: findADoctorField });

	const hospitalArr = [
		{ key: 'all', value: hospitals.map(hospital => hospital.hospital_code).join(','), label: t('form.allHospital') },
		...hospitals.map(hospital => ({ key: hospital?.id?.toString(), value: hospital.hospital_code, label: hospital?.name }))
	];

	const onSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
		const { doctorName, hospital, preferredDay } = onSubmit(evt);
		onSubmitHandler(doctorName.value, hospital.value, selectedSpeciality?.speciality_code, preferredDay.value, isTelemedicine);
	};

	const mapSpeciality = () => {
		if (clinics?.length > 0) {
			return clinics?.map(sp => ({
				id: sp.id,
				label: sp.clinic_name,
				speciality_code: sp.clinic_code
			}));
		}
		return [];
	};

	const [selectedSpeciality, setSelectedSpeciality] = useState<PickerItem>();

	const onChooseSpecialty = (item: PickerItem) => {
		setSelectedSpeciality(item);
	};

	return (
		<FindDoctorStyle>
			<Form
				onSubmit={ onSubmitForm }
				autoComplete='off'
				className='flex flex-col mx-[30px]'
			>
				<div className='form-wrapper'>
					<div className='h-full flex-1'>
						<div className='mb-2'>
							<label className='font-black text-sm'>{ t('form.labels.doctorName') }</label>
						</div>
						<Form.TextField
							id='doctorName'
							className='input'
							placeholder={ t('form.placeholder.doctorName') }
							iconName='Search'
							iconPosition='left'
							{ ...registeredValue('doctorName') }
							{
							...isTelemedicine && { label: t('form.labels.doctorName') }
							}
						/>
					</div>
					<div className='h-full flex-1'>
						<div className='mb-2'>
							<label className='font-black text-sm'>{ t('form.labels.hospital') }</label>
						</div>
						<Form.Dropdown
							menuItems={ hospitalArr }
							placeholder={ t('form.placeholder.hospital') }
							{
								...registeredValue('hospital')
							}
						/>
					</div>
					<div className='h-full flex-1'>
						<div className='mb-2'>
							<label className='font-black text-sm'>{ t('form.labels.speciality') }</label>
						</div>
						<Form.DropdownSearch
							isForLanding={ true }
							textFieldProps={ {
								placeholder: t('form.placeholder.speciality'),
								iconName: 'Search',
								iconPosition: 'left',
								className: 'input',
							} }
							pickerItems={ mapSpeciality() }
							onItemClick={ onChooseSpecialty }
						/>
					</div>
					<div className='h-full flex-1'>
						{ /* Prefered day nya harusnya day only kan bukan datepicker ? */ }
						<div className='mb-2'>
							<label className='font-black text-sm'>{ t('form.labels.date') }</label>
						</div>
						<Form.DateField
							id='preferredDay'
							placeholder={ t('form.placeholder.date') }
							className='input'
							iconName='CalendarIcon'
							iconPosition='left'
							{
								...registeredValue('preferredDay', true)
							}
						/>
					</div>
				</div>
				<div className='flex flex-1 gap-4 mt-8 justify-end'>
					<Button className='shrink-0 sm:max-w-[121px] max-sm:flex-1' theme='outline' type='reset'>{ t('form.resetBtnLabel') }</Button>
					<Button className='shrink-0 sm:max-w-[216px] max-sm:flex-1' theme='primary' type='submit'>{ t('form.submitBtnLabel') }</Button>
				</div>
			</Form>
		</FindDoctorStyle>
	);
};

export default FindADoctor;