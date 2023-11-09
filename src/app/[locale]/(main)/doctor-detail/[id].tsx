import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { isMobile } from 'react-device-detect';

import { useAppDispatch, useTypedSelector } from '@/hooks';
import {
	Breadcrumbs,
	Text,
	Button,
	Spinner
} from '@/components';
import { Images, colors, Languages as lang } from '@/constant';
import { DoctorTimeSlotParam, FindDoctorState, HospitalState, TimeSlot } from '@/interface';
import { getDoctorCalendar, getDoctorDetail, getDoctorTimeSlot } from '@/stores/FindDoctor';

import VisitSchedule from './sections/VisitSchedule';
import { DoctorProfileStyle, TimeSlotCard, TimeSlotContainer } from './style';
import { useNavigate, useParams } from 'react-router-dom';
import DoctorAvatar, { ShareDoctor } from './sections/DoctorAvatar';
import Radio from '@/components/Radio';
import Calendar from '@/components/Calendar';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import dayjs from 'dayjs';
import { getHospitalByHospitalCode } from '@/stores/Hospital';
import { useAppAsyncDispatch } from '@/hooks/useAppDispatch';
import PhoneModal from '@/components/PhoneModal';
import { debounce } from 'lodash';

type FormAppointment = {
	clinic: string,
	appointmentDate: string,
	hospital: string;
};

const DetailDoctorProfile = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const doctorDetailDispatch = useAppDispatch(getDoctorDetail);
	const getDoctorTimeSlotDispatch = useAppDispatch<DoctorTimeSlotParam>(getDoctorTimeSlot);
	const getDoctorCalendarDisptach = useAppDispatch(getDoctorCalendar);
	const hospitalDetailDispatch = useAppAsyncDispatch(getHospitalByHospitalCode);

	const { id } = useParams();

	const { detail, loading, doctorCalendar, doctorCalendarLoading } = useTypedSelector<FindDoctorState>('findDoctor');

	const { hospitals } = useTypedSelector<HospitalState>('hospital');

	const hospitalArr = detail?.hospital.map(hospital => ({ key: hospital?.hospital_name, value: hospital?.hospital_code, label: hospital?.hospital_name }));

	const [selectedHospital, setSelectedHospital] = useState<string>('');
	const [selectedHospitalPhoneNumber, setSelectedHospitalPhoneNumber] = useState<string>('');
	const [selectedHospitalName, setSelectedHospitalName] = useState<string>('');
	const [showModalTelp, setShowModalTelp] = useState<boolean>(false);
	const [radioValue, setRadioValue] = useState('Appointment');
	const [selectedDate, setSelectedDate] = useState<Date>();
	const [selectedDateStatus, setSelectedDateStatus] = useState<string>('');
	const navigate = useNavigate();

	const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>();

	const language = lang.page.doctorProfile;

	const breadcrumbsPath = [
		{ name: 'Book Appointment', url: '/find-a-doctor' },
		{ name: detail?.name || '', url: '#' }
	];

	useEffect(() => {
		doctorDetailDispatch({ id });
	}, []);

	useEffect(() => {
		onChangeForm();
	}, [radioValue, selectedHospital]);

	useEffect(() => {
		if (hospitalArr?.length === 1)
			setSelectedHospital(hospitalArr?.[0].value ?? '');
		if (hospitals.length > 0) {
			hospitalDetailDispatch({ id: selectedHospital + '/hospital-code' }).then(e => {
				setSelectedHospitalPhoneNumber(e.data.phone);
				setSelectedHospitalName(e.data.name);
			});
		}
	}, [detail, hospitals]);

	const onChangeForm = () => {

		if (selectedHospital) {
			getCalendar();
		}

		hospitalDetailDispatch({ id: selectedHospital + '/hospital-code' }).then(e => {
			setSelectedHospitalPhoneNumber(e.data.phone);
		});

	};

	const getCalendar = (month?: number, year?: number) => {
		const todayDate = dayjs();
		const futureDate = month && month > todayDate.month() + 1
			? dayjs().add(1, 'month')
				.startOf('month')
				.format('YYYY-MM-DD')
			: null;
		getDoctorCalendarDisptach({
			queryParam: {
				hospital_code: selectedHospital,
				service: radioValue,
				// TODO REMOVED SINCE NO LONGER PRESENT ON REQUEST PARAM
				// month: month ?? dayjs(selectedDate).get('M') + 1,
				// year: year ?? dayjs(selectedDate).get('year'),
				start_date: futureDate ?? todayDate.format('YYYY-MM-DD'),
				doctor_code: id
			}
		});
	};

	const onBookHandler = () => {
		if (selectedTimeSlot?.slot_id) {
			navigate('/book-appointment/' + selectedTimeSlot.slot_id + `?service=${ radioValue === 'Telemedicine' ? 'TEL' : 'APP' }`);
		}
	};

	const onChangeDate = (val: Value) => {
		const isDateSelectable = doctorCalendar.find(dc => dc.date_schedule === dayjs(val?.toString()).format('YYYY-MM-DD') && dc.status !== 'Slot not available');
		if (val && isDateSelectable) {
			setSelectedDate(val as Date);
			setSelectedDateStatus(isDateSelectable.status);
			onChangeDateDebounced(selectedHospital, val as Date, radioValue);
		}
	};

	const getDoctorSlot = (hospital: string, date: Date, service: string) => {
		getDoctorTimeSlotDispatch({
			id: id,
			queryParam: {
				'hospital_code': hospital,
				'preferred_day': dayjs(date).format('YYYY-MM-DD'),
				'service': service
			}
		});
	};

	const onChangeDateDebounced = useCallback(debounce(getDoctorSlot, 300, { leading: false }), []);

	const getDoctorHospital = () => {
		return detail?.hospital;
	};

	const clickContactHospital = () => {
		if (isMobile) {
			window.open(`tel:${ selectedHospitalPhoneNumber }`);
		} else {
			setShowModalTelp(true);
		}
	};

	const closeContactHospital = () => {
		setShowModalTelp(false);
	};
	return (
		<DoctorProfileStyle className='lg:mt-[50px]'>
			{
				loading
					? <Spinner />
					: <>
						<PhoneModal visible={ showModalTelp } hospitalName={ selectedHospitalName } hospitalPhone={ selectedHospitalPhoneNumber } clickCloseContactHospital={ closeContactHospital } />
						<div className='lg:w-[1110px] mx-auto max-sm:mx-[0px] md:pt-[60px] pb-[120px]'>
							<Breadcrumbs datas={ breadcrumbsPath } />
							<div className='content-wrapper sm:flex w-full'>
								<DoctorAvatar className='max-sm:hidden' profile_url={ detail?.img_url ?? Images.DoctorProfile } />
								<div className='sm:ml-[63px] sm:w-[701px]'>
									<div className='flex gap-[16px]'>
										<DoctorAvatar className='lg:hidden md:hidden' profile_url={ detail?.img_url ?? Images.DoctorProfile } />
										<div className='flex flex-col'>
											<Text text={ detail?.name } fontSize='24px' fontWeight='900' lineheight='24px' />
											<Text text={ detail?.specialty[0] ?? '' } color={ colors.grey.default } fontSize='16px' fontWeight='400' lineheight='24px' className='max-sm:hidden mt-[8px]' />
											<hr className='my-[8px] md:hidden ' />
											<ShareDoctor className=' md:hidden' />
										</div>
									</div>
									<hr className='mt-[24px] max-sm:hidden' />
									<div className='mt-[30px]'>
										<Radio groupLabel={ language.chooseRs } onChange={ setSelectedHospital } value={ selectedHospital }
											groupContainerClassname='flex flex-col md:flex-row'
										>
											{
												hospitalArr && hospitalArr.map(hospital => {
													return (
														<>
															<Radio.Option label={ hospital.label ?? '' } value={ hospital.value } key={ hospital.key } />
														</>
													);
												})
											}
										</Radio>
									</div>

									<div className='mt-[30px]'>
										<Radio groupLabel='Appointment Type'
											onChange={ setRadioValue }
											value={ radioValue }
											groupContainerClassname='flex flex-col md:flex-row'
										>
											<Radio.Option label='Kunjungan Tatap Muka' value='Appointment' />
											<Radio.Option label='Telekonsultasi' value='Telemedicine' />
										</Radio>
									</div>

									<TimeSlotContainer
										className='flex flex-col md:flex-row'
									>
										<TimeSlotCard className='md:w-[calc(100%/2)]'>
											<Calendar value={ selectedDate } onChange={ onChangeDate } onChangeMonth={ (month, year) => {
												getCalendar(month, year);
											} } loading={ doctorCalendarLoading } />
										</TimeSlotCard>
										<TimeSlotCard className='px-[24px] py-[20px] md:w-[calc(100%/2)]'>
											<VisitSchedule hospital={ selectedHospital } onSelect={ timeSlot => {
												setSelectedTimeSlot(timeSlot);
											} }
												selectedDate={ selectedDate }
												clinic={ detail?.clinic }
												onClickContactHospital={ clickContactHospital }
												dateStatus={ selectedDateStatus }
											/>
										</TimeSlotCard>
									</TimeSlotContainer>
								</div>
							</div>
						</div>
						<div className='bg-white pt-[26px] pb-[30px] footer'>
							<div className='lg:w-[1110px] w-full mx-auto max-sm:mx-[15px] md:flex md:justify-end gap-[12px] flex justify-between'>
								<Button
									hoverTheme='secondary'
									label={ 'Back' }
									noPadding={ true }
									className='pt-[13px] px-[40px] pb-[12px] md:w-fit'
									theme='outline'
									onClick={ () => {
										navigate(-1);
									} }
								/>
								<Button
									hoverTheme='secondary'
									label={ 'Next' }
									noPadding={ true }
									className='pt-[13px] px-[40px] pb-[12px] md:w-fit'
									onClick={ onBookHandler }
									disabled={ !selectedTimeSlot }
								/>
							</div>
						</div>
					</>
			}

		</DoctorProfileStyle>
	);
};

export default DetailDoctorProfile;