'use client';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import dayjs, { Dayjs } from 'dayjs';
import Spinner from '@/components/ui/Spinner';
import PhoneModal from '@/components/ui/PhoneModal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import DoctorAvatar, { ShareDoctor } from './sections/DoctorAvatar';
import Text from '@/components/ui/Text';
import Radio from '@/components/ui/Radio';
import Calendar from '@/components/ui/Calendar';
import Button from '@/components/ui/Button';
import { Images, colors } from '@/constant';
import { DoctorProfileStyle, TimeSlotCard, TimeSlotContainer } from './style';
import { useScopedI18n } from '@/locales/client';
import { useRouter } from 'next/navigation';
import VisitSchedule from './sections/VisitSchedule';
import { TimeSlot } from '@/interface';
import { useGetHospital } from '@/lib/api/client/hospital';
import { useGetDoctorCalendar, useGetDoctorDetail, useGetDoctorSlot } from '@/lib/api/client/doctors';

type FormAppointment = {
	clinic: string,
	appointmentDate: string,
	hospital: string;
};

type Props = {
	params: {
		id: string;
	};
};

export default function Page({ params }: Props) {
	const t = useScopedI18n('page.doctorProfile');

	const router = useRouter();

	const [selectedHospital, setSelectedHospital] = useState<string>('');
	const [selectedHospitalPhoneNumber, setSelectedHospitalPhoneNumber] = useState<string>('');
	const [selectedHospitalName, setSelectedHospitalName] = useState<string>('');
	const [showModalTelp, setShowModalTelp] = useState<boolean>(false);
	const [radioValue, setRadioValue] = useState('Appointment');
	const [selectedDate, setSelectedDate] = useState<Date>();
	const [selectedDateStatus, setSelectedDateStatus] = useState<string>('');

	const [calendarMonth, setCalendarMonth] = useState<Dayjs>(dayjs());

	const { data: hospital, isLoading: hospitalLoading } = useGetHospital();

	const { data: doctor, isLoading } = useGetDoctorDetail({ param: params.id });

	const { data: doctorCalendar, isLoading: doctorCalendarLoading } = useGetDoctorCalendar(
		calendarMonth.format('YYYY-MM-DD'),
		selectedHospital,
		{
			query: {
				start_date: calendarMonth.format('YYYY-MM-DD'),
				hospital_code: selectedHospital,
				doctor_code: params.id,
				service: radioValue
			}
		});

	const { data: doctorSlot, isLoading: doctorSlotLoading } = useGetDoctorSlot({
		param: params.id,
		query: {
			hospital_code: selectedHospital,
			preferred_day: dayjs(selectedDate).format('YYYY-MM-DD'),
			service: radioValue
		}
	});

	const hospitalArr = doctor?.data.hospital.map(hospital => ({ key: hospital?.hospital_code, value: hospital?.hospital_code, label: hospital?.hospital_name }));

	const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>();

	const breadcrumbsPath = [
		{ name: t('bookAppointmentLabel'), url: '/find-a-doctor' },
		{ name: doctor?.data.name || '', url: '#' }
	];

	const getCalendar = (month: number, year: number) => {
		const inputDate = dayjs(`${ year }-${ month }-01`, 'YYYY-MM-DD');
		const todayDate = dayjs();
		// get input date based on start day of the month
		// compare it with today date
		// check if the month and year is the same as today then, use today instead
		// else use input date with start day of the month to 1
		const sameMonth = month === dayjs().month() + 1; // month will be 0 based so we need to add 1
		const sameYear = year === dayjs().year();

		if (sameMonth && sameYear) {
			setCalendarMonth(todayDate);
		} else {
			setCalendarMonth(inputDate);
		}

	};

	const onBookHandler = () => {

		if (selectedTimeSlot?.slot_id) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { available, ...safeParams } = selectedTimeSlot;
			const bookParam = new URLSearchParams(safeParams);
			router.push('/book-appointment/' + selectedTimeSlot.slot_id + `?${ bookParam.toString() }`);
		}
	};

	const onChangeDate = (val: any) => {
		const isDateSelectable = doctorCalendar?.data.find(dc => dc.date_schedule === dayjs(val?.toString()).format('YYYY-MM-DD') && dc.status !== 'Slot not available');
		if (val && isDateSelectable) {
			setSelectedDate(val as Date);
			setSelectedDateStatus(isDateSelectable.status);
		}
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

	const selectedHospitalDetails = () => {
		return hospital?.data.find(hospital => hospital.hospital_code === selectedHospital);
	};

	return (
		<DoctorProfileStyle className='lg:mt-[50px]'>
			{
				isLoading
					? <Spinner />
					: <>
						<PhoneModal
							visible={ showModalTelp }
							hospitalDetail={ selectedHospitalDetails() }
							clickCloseContactHospital={ closeContactHospital }
						/>
						<div className='lg:w-[1110px] mx-auto max-sm:mx-[0px] md:pt-[60px] pb-[120px]'>
							<Breadcrumbs datas={ breadcrumbsPath } />
							<div className='content-wrapper sm:flex w-full'>
								<DoctorAvatar className='max-sm:hidden' profile_url={ doctor?.data?.img_url ?? Images.DoctorProfile.src } />
								<div className='sm:ml-[63px] sm:w-[701px]'>
									<div className='flex gap-[16px]'>
										<DoctorAvatar className='lg:hidden md:hidden' profile_url={ doctor?.data?.img_url ?? Images.DoctorProfile.src } />
										<div className='flex flex-col'>
											<Text text={ doctor?.data?.name } fontSize='24px' fontWeight='900' lineHeight='24px' />
											<Text text={ doctor?.data?.specialty[0] ?? '' } color={ colors.grey.default } fontSize='16px' fontWeight='400' lineHeight='24px' className='max-sm:hidden mt-[8px]' />
											<hr className='my-[8px] md:hidden ' />
											<ShareDoctor className=' md:hidden' />
										</div>
									</div>
									<hr className='mt-[24px] max-sm:hidden' />
									<div className='mt-[30px]'>
										<Radio groupLabel={ t('chooseRs') } onChange={ setSelectedHospital } value={ selectedHospital }
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
											<Calendar
												calendarData={ doctorCalendar?.data || [] }
												value={ selectedDate }
												onChange={ onChangeDate }
												onChangeMonth={ (month, year) => {
													getCalendar(month, year);
												} }
												loading={ doctorCalendarLoading } />
										</TimeSlotCard>
										<TimeSlotCard className='px-[24px] py-[20px] md:w-[calc(100%/2)]'>
											<VisitSchedule
												isLoading={ doctorSlotLoading }
												timeslot={ doctorSlot?.data || [] }
												hospital={ selectedHospital }
												onSelect={ timeSlot => {
													setSelectedTimeSlot(timeSlot);
												} }
												selectedDate={ selectedDate }
												clinic={ doctor?.data?.clinic }
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
									$hoverTheme='secondary'
									label={ 'Back' }
									noPadding={ true }
									className='pt-[13px] px-[40px] pb-[12px] md:w-fit'
									theme='outline'
									onClick={ () => {
										router.back();
									} }
								/>
								<Button
									$hoverTheme='secondary'
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
