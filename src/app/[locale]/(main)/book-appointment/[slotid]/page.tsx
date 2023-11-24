'use client';

import { useRef, useState, useEffect } from 'react';
import { FormikProps, useFormik } from 'formik';
import { BookingPayload, FamilyProfile, UserDataDetail, PayloadPushNotification } from '@/interface';

import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { colors, icons } from '@/constant';
import {
	BookAppointmentContainer, BottomBar, DisclaimerAlert, FormCol, FormRow
} from './style';
import ConfirmationModal from './ConfirmationModal';
import Radio from '@/components/ui/Radio';
import SuccessConfirmationModal from './SuccessConfirmationModal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProfileSelector from './ProfileSelector';
import NotificationPanel from '@/components/ui/NotificationPanel';
import Text from '@/components/ui/Text';
import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import AddProfileModal from './AddProfileModal';
import { useGetFamilyProfile, useGetProfile } from '@/lib/api/client/profile';
import { useScopedI18n } from '@/locales/client';
import { formatTimeslot, splitDate } from '@/helpers/datetime';
import { isEqual } from 'lodash';
import { useBookAppointmentAPI, usePushNotifAPI } from '@/lib/api/client/booking';
import { useGetDoctorDetail } from '@/lib/api/client/doctors';

const genderMenuItems = [
	{ key: 'M', value: 'W', label: 'Male' },
	{ key: 'F', value: 'F', label: 'Female' }
];

type BookingFormState = {
	keluhan: string;
	tindakan: string;
	asuransi: string;
	noAsuransi: string;
};

const BookAppointment = () => {
	const t = useScopedI18n('page.bookingAppointment');

	const breadCrumbs = [
		{ name: t('heading'), url: '#' },
	];

	const searchParams = useSearchParams();
	const navigate = useRouter();

	const timeSlot = Object.fromEntries(searchParams);

	const { data: userProfile, isLoading: profileLoading } = useGetProfile();
	const { data: familyProfile, isLoading: familyProfileLoading } = useGetFamilyProfile();
	const { trigger: bookAppointment, error: bookingError, isMutating: bookingLoading } = useBookAppointmentAPI();
	const { trigger: pushNotification, error: pushNotifError, isMutating: pushNotifLoading } = usePushNotifAPI();
	const { data: doctorResponse } = useGetDoctorDetail({ param: timeSlot?.doctor_code });

	const [confirmationModal, setConfirmationModalVisible] = useState<boolean>(false);
	const [addProfileModal, setAddProfileModal] = useState<boolean>(false);
	const [successModal, setSuccessModal] = useState<boolean>(false);
	const [tempImageAsuransiFront, setTempImageAsuransiFront] = useState<Blob | null>(null);
	const [tempImageAsuransiBack, setTempImageAsuransiBack] = useState<Blob | null>(null);
	const [imgAsuransiFrontPath, setImgAsuransiFrontPath] = useState<string>('');
	const [imgAsuransiBackPath, setImgAsuransiBackPath] = useState<string>('');

	const [selectedProfile, setSelectedProfile] = useState<UserDataDetail>();
	const [selfProfile, setSelfProfile] = useState<FamilyProfile>();
	const [selectedType, setSelectedType] = useState<string>('');

	const [penjamin, setPenjamin] = useState('');
	const [error, setError] = useState();

	const uploadAsuransiFrontFileRef = useRef<HTMLInputElement>(null);
	const uploadAsuransiBackFileRef = useRef<HTMLInputElement>(null);

	const hasMainProfile = userProfile?.data?.name || userProfile?.data?.phone || userProfile?.data?.gender;

	useEffect(() => {
		if (hasMainProfile) {
			setSelfProfile({
				birthdate: userProfile?.data?.birthdate ?? '',
				email: userProfile?.data?.email ?? '',
				gender: userProfile?.data?.gender ?? '',
				name: userProfile?.data?.name ?? '',
				phone: userProfile?.data?.phone ?? '',
				id: userProfile?.data?.id ?? 0,
				created_date: '',
				updated_date: '',
				no_mr: '',
				parent_email: '',
				patient_code: ''
			});
		}
	}, [userProfile?.data]);

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

	// const uploadAsuransiPhotoFront = async () => {
	// 	const formImg = new FormData();
	// 	formImg.append('upload', tempImageAsuransiFront ?? '');
	// 	const responseData = await uploadPhotoAsuransi({ payload: formImg });
	// 	if (responseData.stat_msg === 'Success') {
	// 		const urlImage = 'https://rebel-env.s3.us-west-2.amazonaws.com/rspi/dev/rspi-api/uploads/';
	// 		return urlImage + responseData.data;
	// 	}
	// 	return '';
	// };

	// const uploadAsuransiPhotoBack = async () => {
	// 	const formImg = new FormData();
	// 	formImg.append('upload', tempImageAsuransiBack ?? '');
	// 	const responseData = await uploadPhotoAsuransi({ payload: formImg });
	// 	if (responseData.stat_msg === 'Success') {
	// 		const urlImage = 'https://rebel-env.s3.us-west-2.amazonaws.com/rspi/dev/rspi-api/uploads/';
	// 		return urlImage + responseData.data;
	// 	}
	// 	return '';
	// };

	const onConfirmed = async () => {
		try {
			const pushNotifPayload:PayloadPushNotification = {
				category: 'Kategori Pesan Pemberitahuan',
				source: 'Sumber Rebel',
				title_idn: 'Judul Indonesia Update Fitur Pasien Portal',
				title_en: 'Judul English Patient portal New Fiture',
				text_idn: 'Isi Indonesia Ada Fitur Baru di pasien portal',
				text_en: 'Isi English Patient Portal New Fiture',
				icon: 'Bell',
				url: '/Patient-Portal',
				notif_type: 1,
				desc_type: 'Push by email account',
				email_patient: 'abc@gmail.com',
				medical_record: '100377120',
				sent_datetime: '2023-08-09 07:38:50',
				read_flag: 0
			};
			await pushNotification(pushNotifPayload);
			
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
				'payment_method': penjamin,
				'service': searchParams.get('service') ?? 'APP', // TEL / APP
				'hospital_code': timeSlot?.hospital_code,
				'insurance_name': asuransi,
				'insurance_number': noAsuransi,
				'insurance_front_img': '',
				'insurance_back_img': ''
				// 'insurance_front_img': tempImageAsuransiFront ? await uploadAsuransiPhotoFront() : '',
				// 'insurance_back_img': tempImageAsuransiBack ? await uploadAsuransiPhotoBack() : ''
			};
			await bookAppointment(payloadBook).then(res => {
				console.log(res, 'res');
			});



			
			setSuccessModal(true);
		} catch (error: any) {
			setConfirmationModalVisible(false);
			setError(error.stat_msg);
		}
	};
	return (
		<BookAppointmentContainer
			className='lg:w-[1110px] mx-auto max-sm:px-[15px] md:pt-[60px] pb-[120px]'
		>
			<Breadcrumbs datas={ breadCrumbs } />
			<div className='content-wrapper sm:flex w-full items-center flex-col max-sm:p-[16px]'>
				<ProfileSelector onSelected={ setSelectedProfile } selfProfile={ userProfile?.data } familyProfiles={ familyProfile?.data } onAddNewProfileBtn={ onAddNewProfile } />
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
					<FormRow className='flex flex-col md:flex-row items-center'>
						<FormCol>
							<Form.TextField
								width='100%'
								label={ t('form.complaintLabel') }
								placeholder={ t('form.complaintLabel') }
								required={ true }
								id='keluhan'
								name='keluhan'
								value={ formikBooking.values.keluhan }
								onChange={ formikBooking.handleChange }
							/>
						</FormCol>
						<FormCol>
							<Radio groupLabel={ t('form.guarantor') } onChange={ setPenjamin } value={ penjamin } >
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
										mask={ '9999999999999999' }
										label={ t('form.insuranceNumber') }
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
									<label className='text-sm font-black'>{ t('form.insuranceCard.label') }</label>
									<div className='flex flex-row mt-2'>
										<div className='w-[420px] h-[200px] mr-3 relative overflow-hidden cursor-pointer pt-2 border border-dashed rounded-lg'>
											{
												tempImageAsuransiFront ?
													<img
														src={ URL.createObjectURL(tempImageAsuransiFront) }
														alt={ 'Temp Image' }
														className='w-full h-full object-cover border border-dashed'
													/> : <></>
											}
											<div className='w-full h-full absolute items-center justify-center upload-mask top-0 flex flex-row gap-x-2' onClick={ () => uploadAsuransiFrontFileRef.current?.click() }>
												<Image
													src={ icons.UploadCloud }
													alt=''
													color={ colors.grey.dark } />
												<Text color={ colors.green.brandAccent } fontWeight='600'>{ t('form.insuranceCard.front') }</Text>
											</div>
											<input
												type='file'
												ref={ uploadAsuransiFrontFileRef }
												onChange={ () => setTempImageAsuransiFront(uploadAsuransiFrontFileRef.current?.files?.[0] ? uploadAsuransiFrontFileRef.current?.files[0] : null) }
												className='hidden'
												accept='image/*'
											/>
										</div>
										<div className='w-[420px] h-[200px] mr-3 relative overflow-hidden cursor-pointer pt-2 border border-dashed rounded-lg'>
											{
												tempImageAsuransiBack ?
													<img
														src={ URL.createObjectURL(tempImageAsuransiBack) }
														alt={ 'Temp Image' }
														className='w-full h-full object-cover border border-dashed'
													/> : <></>
											}
											<div className='w-full h-full absolute items-center justify-center upload-mask top-0 flex flex-row gap-x-2' onClick={ () => uploadAsuransiBackFileRef.current?.click() }>
												<Image
													src={ icons.UploadCloud }
													alt=''
													color={ colors.grey.dark } />
												<Text color={ colors.green.brandAccent } fontWeight='600'>{ t('form.insuranceCard.back') }</Text>
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
					<BottomBar >
						<Button label='Back' theme='outline' className=' w-full md:w-auto' onClick={ () => { navigate.back(); } } />
						<Button label='Book Visit Now' className=' w-full md:w-auto' disabled={ bookingLoading } onClick={ () => { onBookVisit(); } } />

					</BottomBar>
				</Form>
				<DisclaimerAlert>
					<Text color={ colors.green.brandAccent }>{ t('form.disclaimer') }</Text>
				</DisclaimerAlert>
			</div>
			<AddProfileModal
				visible={ addProfileModal }
				// onClose={ onCloseProfileModal }
				onClose={ () => { setAddProfileModal(false); } }
				selfProfile={ userProfile?.data }
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
			// loadingUploadPhoto={ uploadPhoto }
			/>

			<SuccessConfirmationModal
				hospitalName={ doctorResponse?.data.hospital[0].hospital_name }
				doctorName={ doctorResponse?.data.name ?? '' }
				date={ timeSlot?.date }
				visible={ successModal }
			/>
		</BookAppointmentContainer>
	);
};

export default BookAppointment;