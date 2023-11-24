
'use client';
import FindDoctorStyle from './style';
import React from 'react';
import DropdownSearch from '@/components/ui/DropdownSearch';
import { useScopedI18n } from '@/locales/client';
import { HospitalDetail, LandingPageFindADoctorForm } from '@/interface';
import { ClinicResponse } from '@/interface/clinic';
import useFindADoctor from './useFindADoctor';
import { FormikProps, useFormik } from 'formik';
import DateField from '@/components/ui/DateField';
import { Dropdown, Form, TextField } from '@/components/ui';
import Button from '@/components/ui/Button';
import Combobox from '@/components/ui/Combobox';

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

	const {	onSubmitHandler } = useFindADoctor();

	const hospitalArr = [
		{ key: 'all', value: hospitals.map(hospital => hospital.hospital_code).join(','), label: t('form.allHospital') },
		...hospitals.map(hospital => ({ key: hospital?.id?.toString(), value: hospital.hospital_code, label: hospital?.name }))
	];

	const mapSpeciality = () => {
		if (clinics?.length > 0) {
			return clinics?.map(sp => ({
				id: sp.id,
				label: sp.clinic_name,
				value: sp.clinic_code
			}));
		}
		return [];
	};

	const formFindDoctor:FormikProps<LandingPageFindADoctorForm> = useFormik<LandingPageFindADoctorForm>({
		initialValues: {
			doctorName: '',
			hospital: '',
			preferredDay: '',
			speciality: null
		},
		onSubmit: values => {
			onSubmitHandler(values.doctorName, values.hospital, values.speciality, values.preferredDay, false);
		}
	});

	return (
		<FindDoctorStyle>
			<Form
				autoComplete='off'
				className='flex flex-col mx-[30px]'
				onSubmit={ e => {
					e.preventDefault();
					formFindDoctor.handleSubmit();
				} }
				onReset={ () => {
					formFindDoctor.setValues({
						doctorName: '',
						hospital: 'all',
						preferredDay: '',
						speciality: null
					});
				} }
			>
				<div className='form-wrapper'>
					<div className='h-full flex-1'>
						<div className='mb-2'>
							<label className='font-black text-sm'>{ t('form.labels.doctorName') }</label>
						</div>
						<TextField
							className='input'
							placeholder={ t('form.placeholder.doctorName') }
							iconName='Search'
							iconPosition='left'
							name='doctorName'
							onChange={ evt => {
								formFindDoctor.setFieldValue(evt.target.name, evt.target.value);
							} }
							value={ formFindDoctor.values.doctorName }
							{
								...isTelemedicine && { label: t('form.labels.doctorName') }
							}
						/>
					</div>
					<div className='h-full flex-1'>
						<div className='mb-2'>
							<label className='font-black text-sm'>{ t('form.labels.hospital') }</label>
						</div>
						<Dropdown
							menuItems={ hospitalArr }
							placeholder={ t('form.placeholder.hospital') }
							name='hospital'
							onChange={ evt => {
								formFindDoctor.setFieldValue(evt.target.name, evt.target.value);
							} }
							value={ formFindDoctor.values.hospital }
						/>
					</div>
					<div className='h-full flex-1'>
						<div className='mb-2'>
							<label className='font-black text-sm'>{ t('form.labels.speciality') }</label>
						</div>
						<Combobox
							data={ mapSpeciality() }
							placeholder={ t('form.placeholder.speciality') }
							iconName='Search'
							value={ formFindDoctor.values.speciality }
							onSelectValue={ value => formFindDoctor.setFieldValue('speciality', value) }
						/>
						{ /* <DropdownSearch
							isForLanding={ true }
							textFieldProps={ {
								placeholder: t('form.placeholder.speciality'),
								iconName: 'Search',
								iconPosition: 'left',
								className: 'input',
								name: 'speciality',
								value: formFindDoctor.values.speciality,
								onChange: evt => {
									formFindDoctor.setFieldValue('speciality', evt.target.value);
								}
							} }
							pickerItems={ mapSpeciality() }
							onItemClick={ item => {
								formFindDoctor.setFieldValue('speciality', item.label);
							} }
						/> */ }
					</div>
					<div className='h-full flex-1'>
						{ /* Prefered day nya harusnya day only kan bukan datepicker ? */ }
						<div className='mb-2'>
							<label className='font-black text-sm'>{ t('form.labels.date') }</label>
						</div>
						<DateField
							id='preferredDay'
							placeholder={ t('form.placeholder.date') }
							className='input'
							iconName='CalendarIcon'
							iconPosition='left'
							name='preferredDay'
							value={ formFindDoctor.values.preferredDay }
							onChangeValue={ evt => {
								formFindDoctor.setFieldValue('preferredDay', evt.value);
							} }
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