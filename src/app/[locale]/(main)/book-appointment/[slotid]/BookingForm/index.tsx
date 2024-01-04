'use client';

import { useRef, useState, useEffect } from 'react';
import { FormikProps, useFormik } from 'formik';
import {
	BookingPayload, FamilyProfile, UserDataDetail, PayloadPushNotification, ResponseType, FindDoctorDetail
} from '@/interface';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { colors, icons } from '@/constant';
import {
	BookAppointmentContainer, BottomBar, DisclaimerAlert, FormCol, FormRow
} from '../style';
import ConfirmationModal from '../ConfirmationModal';
import Radio from '@/components/ui/Radio';
import SuccessConfirmationModal from '../SuccessConfirmationModal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProfileSelector from '../ProfileSelector';
import NotificationPanel from '@/components/ui/NotificationPanel';
import Text from '@/components/ui/Text';
import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import AddProfileModal from '../AddProfileModal';
import { useGeneralUploads, useGetFamilyProfile, useGetProfile } from '@/lib/api/client/profile';
import { useScopedI18n } from '@/locales/client';
import { formatTimeslot, splitDate } from '@/helpers/datetime';
import { isEqual } from 'lodash';
import { useBookAppointmentAPI, usePushNotifAPI } from '@/lib/api/client/booking';
import { useNotification } from '@/lib/api/client/header';
import useSession from '@/session/client';
import { useSWRConfig } from 'swr';

type BookingFormState = {
	keluhan: string;
	tindakan: string;
	asuransi: string;
	noAsuransi: string;
};

type BookAppointmentProps = {
	doctorResponse: ResponseType<FindDoctorDetail>;
	familyProfiles: UserDataDetail[];
	userProfile: UserDataDetail;
};

type GuarantorOption = {
	id: { [key: string]: string; };
	en: { [key: string]: string; };
};

export const guarantorOptions: GuarantorOption = {
	id: {
		pribadi: 'pribadi',
		asuransi: 'asuransi',
	},
	en: {
		pribadi: 'self',
		asuransi: 'insurance',
	}
};

const BookAppointment = ({ doctorResponse, familyProfiles, userProfile }: BookAppointmentProps) => {
	const t = useScopedI18n('page.bookingAppointment');
	const session = useSession();
	const { mutate } = useSWRConfig();
	const breadCrumbs = [
		{ name: t('heading'), url: '#' },
	];

	const searchParams = useSearchParams();
	const navigate = useRouter();

	const timeSlot = Object.fromEntries(searchParams);

	const { trigger: bookAppointment, error: bookingError, isMutating: bookingLoading } = useBookAppointmentAPI();
	const { trigger: uploadPhotoPatient } = useGeneralUploads();
	const { trigger: pushNotification, error: pushNotifError, isMutating: pushNotifLoading } = usePushNotifAPI();

	const paramGetNotif = {
		query: {
			medical_record: session.user?.medical_record ?? '',
			email: session.user?.email,
		},
	};
	const {
		data: getNotification,
	} = useNotification(paramGetNotif);

	const [confirmationModal, setConfirmationModalVisible] = useState<boolean>(false);
	const [addProfileModal, setAddProfileModal] = useState<boolean>(false);
	const [successModal, setSuccessModal] = useState<boolean>(false);
	const [tempImageAsuransiFront, setTempImageAsuransiFront] = useState<File | null>(null);
	const [tempImageAsuransiBack, setTempImageAsuransiBack] = useState<File | null>(null);
	const [imgAsuransiFrontPath, setImgAsuransiFrontPath] = useState<string>('');
	const [imgAsuransiBackPath, setImgAsuransiBackPath] = useState<string>('');

	const [selectedProfile, setSelectedProfile] = useState<UserDataDetail>();
	const [selfProfile, setSelfProfile] = useState<FamilyProfile>();
	const [selectedType, setSelectedType] = useState<string>('');

	const [penjamin, setPenjamin] = useState('');
	const [error, setError] = useState();

	const uploadAsuransiFrontFileRef = useRef<HTMLInputElement>(null);
	const uploadAsuransiBackFileRef = useRef<HTMLInputElement>(null);

	const hasMainProfile = userProfile.name || userProfile.phone || userProfile.gender;

	useEffect(() => {
		if (hasMainProfile) {
			setSelfProfile({
				birthdate: userProfile.birthdate ?? '',
				email: userProfile.email ?? '',
				gender: userProfile.gender ?? '',
				name: userProfile.name ?? '',
				phone: userProfile.phone ?? '',
				id: userProfile.id ?? 0,
				created_date: '',
				updated_date: '',
				no_mr: userProfile.no_mr ?? '',
				parent_email: '',
				patient_code: ''
			});
		}
	}, [userProfile]);

	const formikBooking: FormikProps<BookingFormState> = useFormik<BookingFormState>({
		initialValues: {
			keluhan: '',
			tindakan: '',
			asuransi: '',
			noAsuransi: ''
		},
		onSubmit: (_, { setSubmitting }) => {
			setConfirmationModalVisible(true);
			setSubmitting(false);
		},
	});

	// const getClinic = () => {
	// 	const timeSlot = getTimeSlot();
	// 	const doctor = getDoctor();
	// 	const docSchedule = doctor?.doctor_schedule.find(schedule => schedule.hospital_code === timeSlot?.hospital_code);
	// 	return docSchedule?.clinics[0];
	// };

	// const onCloseProfileModal = (profile: ProfilePayload, isMain?: boolean) => {
	// 	getFamilyProfilesDispatch();
	// 	setAddProfileModal(false);
	// 	if (isMain) {
	// 		setSelfProfile({
	// 			birthdate: profile.dob,
	// 			email: profile.email,
	// 			gender: profile.gender,
	// 			name: profile.name,
	// 			phone: profile.phone,
	// 			id: 0,
	// 			created_date: '',
	// 			updated_date: '',
	// 			no_mr: '',
	// 			parent_email: '',
	// 			patient_code: ''
	// 		});
	// 	}
	// 	setSelectedProfile({
	// 		birthdate: profile.dob,
	// 		email: profile.email,
	// 		gender: profile.gender,
	// 		name: profile.name,
	// 		phone: profile.phone,
	// 		id: 0,
	// 		created_date: '',
	// 		updated_date: '',
	// 		no_mr: '',
	// 		parent_email: '',
	// 		patient_code: ''
	// 	});
	// };

	const onAddNewProfile = (type: string) => {
		setSelectedType(type);
		setAddProfileModal(true);
	};

	const onBookVisit = () => {
		if (formikBooking.values.keluhan && penjamin?.length) {
			formikBooking.handleSubmit();
		} else {
			alert('Pastikan Data Keluhan dan Penjamin Terisi');
		}
	};

	const uploadAsuransiPhotoFront = async () => {
		if (tempImageAsuransiFront !== null) {
			const responseData = await uploadPhotoPatient({ payload: tempImageAsuransiFront });
			if (responseData.stat_msg === 'Success') {
				return responseData.data;
			}
		}
		return '';
	};

	const uploadAsuransiPhotoBack = async () => {
		if (tempImageAsuransiBack !== null) {
			const responseData = await uploadPhotoPatient({ payload: tempImageAsuransiBack });
			if (responseData.stat_msg === 'Success') {
				return responseData.data;
			}
		}
		return '';
	};

	const serviceMap = (type: string) => {
		switch (type) {
			case 'Appointment':
				return 'APP';
			case 'Telemedicine':
				return 'TEL';
			default:
				return 'APP';
		}
	};

	const onConfirmed = async () => {
		try {
			const { keluhan, tindakan, asuransi, noAsuransi } = formikBooking.values;
			const payloadBook: BookingPayload = {
				patient_name: selectedProfile?.name?.trim() ?? '',
				'patient_code': selectedProfile?.patient_code ?? '',
				'slot_id': timeSlot?.slot_id ?? '',
				'location': timeSlot?.clinic_code, // clinic code
				'time_slot': formatTimeslot(timeSlot?.session_app_start ?? ''),
				'date': timeSlot?.date,
				'user_name': 'RSPI_WEB',	// terserah
				'type': isEqual(selfProfile?.email, selectedProfile?.email) ? 'self' : 'other', 	// self or other
				'doctor_code': timeSlot?.doctor_code,
				'gender': selectedProfile?.gender === 'Female' ? 'F' : 'M',
				'date_of_birth': (selectedProfile?.birthdate && splitDate(selectedProfile.birthdate)) ?? '',
				'phone': selectedProfile?.phone ?? '',
				'main_complaint': keluhan,
				'necessity_action': tindakan,
				'payment_method_idn': guarantorOptions.id[penjamin],
				'payment_method_en': guarantorOptions.en[penjamin],
				'service': serviceMap(searchParams.get('service') ?? ''), // TEL / APP
				'hospital_code': timeSlot?.hospital_code,
				'insurance_name': asuransi,
				'insurance_number': noAsuransi,
				'insurance_front_img': tempImageAsuransiFront ? await uploadAsuransiPhotoFront() : '',
				'insurance_back_img': tempImageAsuransiBack ? await uploadAsuransiPhotoBack() : ''
			};

			await bookAppointment(payloadBook).then(res => {
				const pushNotifPayload: PayloadPushNotification = {
					category: isEqual(selfProfile?.email, selectedProfile?.email) ? 'konfirmasi_booking_self' : 'konfirmasi_booking_other',
					source: 'Rebelworks',
					title_idn: 'Permintaan booking Berhasil',
					title_en: 'Booking Appointment Successful',
					text_idn: 'Permintaan booking anda untuk ' + selectedProfile?.name?.trim() + ' ke ' + doctorResponse?.data?.name + ' pada ' + timeSlot?.date + ' ' + timeSlot?.session_app_start + ' sudah berhasil. Mohon konfirmasi ketidakhadiran 1 jam sebelum jadwal mulai praktek dokter untuk menghindari blacklist oleh system kami.',
					text_en: 'Your appointment for ' + selectedProfile?.name?.trim() + ' ' + doctorResponse?.data?.name + ' on ' + timeSlot?.date + ' ' + timeSlot?.session_app_start + ' has been booked. Please contact us at least 1 hour before the doctors schedule if you wish to cancel in order to avoid blacklist',
					icon: 'Bell',
					url: '/patient-portal',
					notif_type: '1',
					desc_type: 'Push by email account',
					email_patient: selfProfile?.email,
					medical_record: selfProfile?.no_mr ?? '',
					sent_datetime: timeSlot?.date + ' ' + timeSlot?.session_app_start,
					read_flag: '0'
				};
				pushNotification(pushNotifPayload);
				// Invalidate cache with given key, so the data will be re-fetched from server
				mutate('getNotification');
				mutate((key: any) => typeof key === 'string' && key.startsWith('appointmentList'), undefined);

			});

			setSuccessModal(true);
		} catch (error: any) {
			setConfirmationModalVisible(false);
			setError(error.stat_msg);
		}
	};
	return (
		<BookAppointmentContainer>
			<div className='lg:w-[1110px] mx-auto max-sm:px-[15px] pb-[120px]'>
				<Breadcrumbs datas={ breadCrumbs } />
				<div className='content-wrapper sm:flex w-full items-center flex-col max-sm:p-[16px]'>
					<ProfileSelector onSelected={ setSelectedProfile } selfProfile={ userProfile } familyProfiles={ familyProfiles } onAddNewProfileBtn={ onAddNewProfile } />
					{
						bookingError &&
						<NotificationPanel
							showIconLeft={ false }
							showIconRight={ false }
							mode={ 'error' }
							visible={ true }
						>
							<Text
								fontType={ null }
								fontSize='14px'
								fontWeight='500'
								text={ bookingError.message }
								color={ colors.red.default }
							/>
						</NotificationPanel>
					}
					<Form className='w-full mt-[10px] flex flex-col gap-[12px]'>
						<FormRow className='flex flex-col md:flex-row md:items-center'>
							<FormCol>
								<Form.TextField
									width='100%'
									label={ t('form.complaintLabel') }
									labelClassName='font-normal text-base'
									placeholder={ t('form.complaintLabel') }
									required={ true }
									id='keluhan'
									name='keluhan'
									value={ formikBooking.values.keluhan }
									onChange={ formikBooking.handleChange }
								/>
							</FormCol>
							<FormCol>
								<Radio groupLabel={ t('form.guarantor') } onChange={ setPenjamin } value={ penjamin } labelClassName='text-base font-normal leading-5' >
									<Radio.Option label={ t('form.selfInsurance') } value={ 'pribadi' } />
									<Radio.Option label={ t('form.thirdPartyInsurance') } value={ 'asuransi' } />
								</Radio>
							</FormCol>
						</FormRow>
						{
							penjamin === 'asuransi'
							&&
							<div className='flex flex-col'>
								<FormRow className='flex flex-col md:flex-row'>
									<FormCol >
										<Form.TextField
											label={ t('form.insuranceName') }
											labelClassName='font-normal text-base'
											placeholder={ t('form.insuranceName') }
											width='100%'
											id='asuransi'
											name='asuransi'
											value={ formikBooking.values.asuransi }
											onChange={ formikBooking.handleChange }
										/>
									</FormCol>
									<FormCol >
										<Form.TextField
											isNumber
											label={ t('form.insuranceNumber') }
											labelClassName='font-normal text-base'
											placeholder={ t('form.insuranceNumber') }
											width='100%'
											id='noAsuransi'
											name='noAsuransi'
											value={ formikBooking.values.noAsuransi }
											onChange={ formikBooking.handleChange }
										/>
									</FormCol>
								</FormRow>
								<FormRow>
									<div className='flex flex-col'>
										<label className='text-base font-normal'>{ t('form.insuranceCard.label') }</label>
										<div className='flex flex-row mt-2'>
											<div className='w-[150px] h-[100px] md:w-[420px] md:h-[200px] mr-3 relative overflow-hidden cursor-pointer pt-2 border border-dashed rounded-lg'>
												{
													tempImageAsuransiFront ?
														<img
															src={ URL.createObjectURL(tempImageAsuransiFront) }
															alt={ 'Temp Image' }
															className='w-full h-full object-cover border border-dashed'
														/> : <></>
												}
												<div className='w-full h-full absolute items-center justify-center upload-mask top-0 flex flex-row px-3 gap-x-1 md:gap-x-2' onClick={ () => uploadAsuransiFrontFileRef.current?.click() }>
													<icons.UploadCloud />
													<label color={ colors.green.brandAccent } className='text-[#358888] font-bold text-xs leading-[18px] md:text-base md:leading-[16px]'>{ t('form.insuranceCard.front') }</label>
												</div>
												<input
													type='file'
													ref={ uploadAsuransiFrontFileRef }
													onChange={ () => setTempImageAsuransiFront(uploadAsuransiFrontFileRef.current?.files?.[0] ? uploadAsuransiFrontFileRef.current?.files[0] : null) }
													className='hidden'
													accept='image/*'
												/>
											</div>
											<div className='w-[150px] h-[100px] md:w-[420px] md:h-[200px] mr-3 relative overflow-hidden cursor-pointer pt-2 border border-dashed rounded-lg'>
												{
													tempImageAsuransiBack ?
														<img
															src={ URL.createObjectURL(tempImageAsuransiBack) }
															alt={ 'Temp Image' }
															className='w-full h-full object-cover border border-dashed'
														/> : <></>
												}
												<div className='w-full h-full absolute items-center justify-center upload-mask top-0 flex flex-row px-3 gap-x-1 md:gap-x-2' onClick={ () => uploadAsuransiBackFileRef.current?.click() }>
													<icons.UploadCloud />
													<label color={ colors.green.brandAccent } className='text-[#358888] font-bold text-xs leading-[18px] md:text-base md:leading-[16px]'>{ t('form.insuranceCard.back') }</label>
												</div>
												<input
													type='file'
													ref={ uploadAsuransiBackFileRef }
													onChange={ () => setTempImageAsuransiBack(uploadAsuransiBackFileRef.current?.files?.[0] ? uploadAsuransiBackFileRef.current?.files[0] : null) }
													className='hidden'
													accept='image/*'
												/>
											</div>
										</div>
									</div>

								</FormRow>
							</div>

						}
					</Form>
					<DisclaimerAlert>
						<Text color={ colors.green.brandAccent }>{ t('form.disclaimer') }</Text>
					</DisclaimerAlert>
				</div>
			</div>
			<BottomBar>
				<div className='lg:w-[1110px] w-full mx-auto max-sm:mx-[15px] md:flex md:justify-end gap-[12px] flex justify-between'>
					<Button label={ t('form.btnLabel.back') } theme='outline' $hoverTheme='primary' className='pt-[13px] px-[40px] pb-[12px] w-full md:w-auto' onClick={ () => { navigate.back(); } } />
					<Button label={ t('form.btnLabel.submit') } className='pt-[13px] px-[40px] pb-[12px] w-full md:w-auto' disabled={ bookingLoading } onClick={ () => { onBookVisit(); } } />
				</div>
			</BottomBar>
			<AddProfileModal
				visible={ addProfileModal }
				// onClose={ onCloseProfileModal }
				onClose={ () => { setAddProfileModal(false); } }
				selfProfile={ userProfile }
				type={ selectedType }
			/>
			<ConfirmationModal
				timeSlot={ timeSlot }
				visible={ confirmationModal }
				onClose={ () => { setConfirmationModalVisible(false); } }
				selectedProfile={ selectedProfile }
				noAsuransi={ formikBooking.values.noAsuransi }
				namaAsuransi={ formikBooking.values.asuransi }
				penjamin={ penjamin }
				onConfirmed={ onConfirmed }
				doctorResponse={ doctorResponse }
				loading={ bookingLoading }
			// loadingUploadPhoto={ uploadPhoto }
			/>

			<SuccessConfirmationModal
				hospitalName={ doctorResponse?.data?.hospital?.[0]?.hospital_name }
				doctorName={ doctorResponse?.data?.name ?? '' }
				date={ timeSlot?.date }
				visible={ successModal }
				onClose={ () => setConfirmationModalVisible(false) }
			/>
		</BookAppointmentContainer>
	);
};

export default BookAppointment;