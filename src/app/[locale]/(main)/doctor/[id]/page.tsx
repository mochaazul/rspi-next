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
import NeedLoginModal from '@/components/ui/NeedLoginModal';
import { Images, colors } from '@/constant';
import { DoctorProfileStyle, TimeSlotCard, TimeSlotContainer } from './style';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { useRouter } from 'next/navigation';
import VisitSchedule from './sections/VisitSchedule';
import { TimeSlot } from '@/interface';
import { useGetHospital } from '@/lib/api/client/hospital';
import { useCheckBlacklist, useGetDoctorCalendar, useGetDoctorDetail, useGetDoctorSlot } from '@/lib/api/client/doctors';
import { cookiesHelper } from '@/helpers';
import useSession from '@/session/client';
import BlacklistModal from '@/components/ui/BlacklistModal';

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
	const lang = useCurrentLocale();
	const router = useRouter();

	const [selectedHospital, setSelectedHospital] = useState<string>('');
	const [selectedHospitalPhoneNumber, setSelectedHospitalPhoneNumber] = useState<string>('');
	const [showModalTelp, setShowModalTelp] = useState<boolean>(false);
	const [radioValue, setRadioValue] = useState('APP');
	const [selectedDate, setSelectedDate] = useState<Date>();
	const [selectedDateStatus, setSelectedDateStatus] = useState<string>('');

	const [calendarMonth, setCalendarMonth] = useState<Dayjs>(dayjs());
	const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
	const [blacklistModalVisible, setBlacklistModalVisible] = useState<boolean>(false);

	const { data: hospital, isLoading: hospitalLoading } = useGetHospital();

	const { data: doctor, isLoading, error: doctorError } = useGetDoctorDetail({ param: params.id });

	const { data: blacklistResponse, isMutating: blacklistLoading, trigger: checkBlacklist, error: blacklistError } = useCheckBlacklist();

	const [blacklistMsg, setBlacklistMsg] = useState<string>('');

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

	const selectFirstHospital = () => {
		if (hospitalArr) {
			setSelectedHospital(hospitalArr[0].value ?? '');
		}
	};

	useEffect(() => {
		selectFirstHospital();
	}, [hospitalArr]);

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

	const getBookAppointmentUrl = () => {
		if (selectedTimeSlot?.slot_id) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { available, ...safeParams } = selectedTimeSlot;
			const bookParam = new URLSearchParams(safeParams);
			return '/book-appointment/' + selectedTimeSlot.slot_id + `?${ bookParam.toString() }`;
		}

		return '';
	};

	const onBookHandler = async () => {
		try {
			const token = await cookiesHelper.getToken();
			const userData = await cookiesHelper.getUserData();
			if (!token) {
				return setLoginModalVisible(true);
			}
			const res = await checkBlacklist({
				doctor_code: params.id,
				hospital_code: selectedHospital,
				mr_number: (userData?.no_mr || userData?.medical_record || userData?.patient_id_rspi) ?? ''
			});

			if (res.data.is_blacklist) {

				const msg = lang === 'id' ? res.data.description_id : res.data.description_en;
				setBlacklistMsg(msg);
				return setBlacklistModalVisible(true);
			}

			if (selectedTimeSlot?.slot_id) {
				const bookAppointmentUrl = getBookAppointmentUrl();
				router.push(bookAppointmentUrl);
			}
		} catch (error) {
			console.log('here', error);
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
			if (typeof window !== 'undefined') {
				window?.open(`tel:${ selectedHospitalPhoneNumber }`);
			}
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
	const notFoundDoctor = () => {
		if (doctorError && doctorError.message.toLowerCase() === 'error on get detail doctor detail on schedule') {
			return 'Doctor not found';
		}
		return doctor?.data?.name;
	};

	return (
		<DoctorProfileStyle>
			{
				isLoading
					? <Spinner />
					: <>
						<PhoneModal
							visible={ showModalTelp }
							hospitalDetail={ selectedHospitalDetails() }
							clickCloseContactHospital={ closeContactHospital }
							onClose={ () => setShowModalTelp(false) }
						/>
						<div className='lg:w-[1110px] mx-auto max-sm:mx-[0px] pb-[120px]'>
							<Breadcrumbs datas={ breadcrumbsPath } />
							<div className='content-wrapper sm:flex w-full mt-[40px]'>
								<DoctorAvatar className='max-sm:hidden' profile_url={ doctor?.data?.img_url } />
								<div className='sm:ml-[63px] sm:w-[701px]'>
									<div className='flex gap-[16px]'>
										<DoctorAvatar className='lg:hidden md:hidden' profile_url={ doctor?.data?.img_url ?? Images.DoctorProfile.src } />
										<div className='flex flex-col'>
											<Text text={ notFoundDoctor() } fontSize='24px' fontWeight='900' lineHeight='24px' />
											<Text text={ doctor?.data?.specialty[0] ?? '' } color={ colors.grey.default } fontSize='16px' fontWeight='400' lineHeight='24px' className='max-sm:hidden mt-[8px]' />
											<hr className='my-[8px] md:hidden' />
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
									{ /* APP : mean appointment */ }
									{ /* TEL : mean telemedicine */ }
									<div className='mt-[30px]'>
										<Radio groupLabel='Appointment Type'
											onChange={ setRadioValue }
											value={ radioValue }
											groupContainerClassname='flex flex-col md:flex-row'
										>
											<Radio.Option label={ t('visitAppOptionLabel') } value='APP' />
											{ /* TODO: TAKEN OUT SINCE TrackCare do not support it yet 24 nov 23 */ }
											{ /* <Radio.Option label='Telekonsultasi' value='TEL' /> */ }
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
										<TimeSlotCard className='px-[16px] py-[20px] md:w-[calc(100%/2)]'>
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
									$hoverTheme='primary'
									label={ t('form.btnLabel.back') }
									noPadding={ true }
									className='pt-[13px] px-[40px] pb-[12px] md:w-fit'
									theme='outline'
									onClick={ () => {
										router.back();
									} }
								/>
								<Button
									label={ t('form.btnLabel.submit') }
									noPadding={ true }
									className='pt-[13px] px-[40px] pb-[12px] md:w-fit'
									onClick={ onBookHandler }
									disabled={ !selectedTimeSlot }
								>
									{ blacklistLoading ? <span className='spinner-loader' /> : t('form.btnLabel.submit') }
								</Button>
							</div>
						</div>
					</>
			}
			<NeedLoginModal
				visible={ loginModalVisible }
				toggler={ setLoginModalVisible }
				onClose={ () => setLoginModalVisible(false) }
				callbackUrl={ getBookAppointmentUrl() }
			/>
			<BlacklistModal
				visible={ blacklistModalVisible }
				toggler={ setBlacklistModalVisible }
				onClose={ () => { setBlacklistModalVisible(false); } }
				msg={ blacklistMsg }
			/>
		</DoctorProfileStyle>
	);
};
