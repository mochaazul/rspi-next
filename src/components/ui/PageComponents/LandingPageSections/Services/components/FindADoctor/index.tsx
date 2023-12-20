
'use client';
import FindDoctorStyle from './style';
import React, { useEffect, useState } from 'react';
import DropdownSearch from '@/components/ui/DropdownSearch';
import { useScopedI18n } from '@/locales/client';
import { HospitalDetail, I_MasterDoctor, LandingPageFindADoctorForm } from '@/interface';
import { ClinicResponse } from '@/interface/clinic';
import useFindADoctor from './useFindADoctor';
import { FormikProps, useFormik } from 'formik';
import DateField from '@/components/ui/DateField';
import { Dropdown, Form, TextField } from '@/components/ui';
import Button from '@/components/ui/Button';
import Combobox from '@/components/ui/Combobox';
import { I_SpecialtyDropdownResponse } from '@/interface/specialities';
import { useGetDoctors } from '@/lib/api/client/doctors';
import { debounce } from 'lodash';
type Props = {
	isTelemedicine: boolean;
	hospitals: HospitalDetail[],
	specialtys: I_SpecialtyDropdownResponse[];
};

const FindADoctor: React.FC<Props> = ({
	isTelemedicine = false,
	hospitals,
	specialtys,
}) => {
	const t = useScopedI18n('page.landingPage.services.findDoctor');

	const { onSubmitHandler } = useFindADoctor();
	const [doctorFieldSearch, setDoctorFieldSearch] = useState('');

	const hospitalArr = [
		{ key: 'all', value: '', label: t('form.allHospital') },
		...hospitals.map(hospital => ({ key: hospital?.id?.toString(), value: hospital.hospital_code, label: hospital?.name }))
	];
	const mapSpeciality = () => {
		if (specialtys?.length > 0) {
			return specialtys?.map(sp => ({
				id: sp.clinic_category,
				label: sp.clinic_category,
				value: sp.clinic_category
			}));
		}
		return [];
	};

	const formFindDoctor: FormikProps<LandingPageFindADoctorForm> = useFormik<LandingPageFindADoctorForm>({
		initialValues: {
			doctorName: null,
			hospital: '',
			preferredDay: '',
			speciality: null
		},
		onSubmit: values => {
			onSubmitHandler(values.doctorName, values.hospital, values.speciality, values.preferredDay, false);
		}
	});

	async function changeSearchDoctor(value: React.SetStateAction<string>) {
		debouncedSearch(value);
	}

	const debouncedSearch = React.useRef(
		debounce(async (criteria) => {
			setDoctorFieldSearch(criteria);
		}, 500)
	).current;

	const { data: doctorResponse, isLoading: doctorResponseLoading } = useGetDoctors({ query: { keyword: doctorFieldSearch ?? '' } });

	const mapDoctors = () => {

		if (doctorResponse) {
			const dataDoctors = doctorResponse?.flatMap(res => res.data);

			if (dataDoctors.length > 0) {
				return dataDoctors.map((dc: any) => ({
					id: dc.doctor_code,
					label: dc.doctor_name,
					value: dc.doctor_name
				}));
			}
		}
		return [];
	};

	React.useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	return (
		<FindDoctorStyle className='w-full pt-8 pb-6 px-4 md:pt-[30px] md:pb-[30px] md:px-[30px]'>
			<Form
				autoComplete='off'
				className='flex flex-col w-full'
				onSubmit={ e => {
					e.preventDefault();
					formFindDoctor.handleSubmit();
				} }
				onReset={ () => {
					formFindDoctor.setValues({
						doctorName: null,
						hospital: '',
						preferredDay: '',
						speciality: null
					});
				} }
			>
				<div className='form-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 xl:gap-[30px]'>
					<div className='w-full'>
						<div className='mb-2.5'>
							<label className='font-black text-sm'>{ t('form.labels.doctorName') }</label>
						</div>
						<Combobox
							data={ mapDoctors() }
							placeholder={ t('form.placeholder.doctorName') }
							iconName='Search'
							value={ formFindDoctor.values.doctorName }
							onSelectValue={ (value: any) => formFindDoctor.setFieldValue('doctorName', value) }
							inputOnChange={ (value: any) => changeSearchDoctor(value) }
							isLoading={ doctorResponseLoading }
							retainValue
						/>
					</div>
					<div className='w-full'>
						<div className='mb-2.5'>
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
					<div className='w-full'>
						<div className='mb-2.5'>
							<label className='font-black text-sm'>{ t('form.labels.speciality') }</label>
						</div>
						<Combobox
							data={ mapSpeciality() }
							placeholder={ t('form.placeholder.speciality') }
							iconName='Search'
							value={ formFindDoctor.values.speciality }
							onSelectValue={ value => formFindDoctor.setFieldValue('speciality', value) }
							retainValue
						/>
					</div>
					<div className='w-full'>
						{ /* Prefered day nya harusnya day only kan bukan datepicker ? */ }
						<div className='mb-2.5'>
							<label className='font-black text-sm'>{ t('form.labels.date') }</label>
						</div>
						<DateField
							id='preferredDay'
							placeholder={ t('form.placeholder.date') }
							className='input'
							iconName='CalendarIcon'
							iconPosition='left'
							name='preferredDay'
							enableMinDateNow={ true }
							value={ formFindDoctor.values.preferredDay }
							onChangeValue={ evt => {
								formFindDoctor.setFieldValue('preferredDay', evt.value);
							} }
						/>
					</div>
				</div>
				<div className='flex gap-4 mt-8 justify-end'>
					<Button theme='outline' $hoverTheme='primary' type='reset' className='w-auto max-sm:text-sm max-sm:leading-normal py-2.5 px-4 md:py-[15px] md:px-10'>{ t('form.resetBtnLabel') }</Button>
					<Button theme='primary' type='submit' className='w-auto max-sm:text-sm max-sm:leading-normal py-2.5 px-4 md:py-[15px] md:px-10'>{ t('form.submitBtnLabel') }</Button>
				</div>
			</Form>

		</FindDoctorStyle>
	);
};

export default FindADoctor;