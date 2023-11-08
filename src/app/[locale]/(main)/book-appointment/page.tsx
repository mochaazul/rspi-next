import React, { useEffect, useRef, useState } from 'react';
import { useTypedSelector } from '@/hooks';
import { FamilyProfile, FindDoctorState, UserDataDetail, UserState } from '@/interface';
import Image from 'next/image';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Images, colors, icons } from '@/constant';
import { AppointmentState } from '@/interface/Book';
import {
	Breadcrumbs, Button, Form, NotificationPanel, Text
} from '@/components';
import {
	BookAppointmentContainer, BottomBar, DisclaimerAlert, FormCol, FormRow
} from './style';
import useBookAppointment from './useBookAppointment';
import { useAppAsyncDispatch } from '@/hooks/useAppDispatch';
import { bookAppointment } from '@/stores/Appointment';
import ConfirmationModal from './ConfirmationModal';
import ProfileSelector from './ProfileSelector';
import AddProfileModal, { ProfilePayload } from '@/components/AddProfileModal';
import { getFamilyProfiles } from '@/stores/actions';
import { Languages as lang } from '@/constant';
import Radio from '@/components/Radio';
import { isEqual } from 'lodash';
import SuccessConfirmationModal from './SuccessConfirmationModal';
import { formatTimeslot, splitDate } from '@/helpers/datetime';
import * as Icons from 'react-feather';
import { uploadPhotoProfile } from '@/stores/PatientProfile';
import { PatientState } from '@/interface/PatientProfile';
import { userDetail as userDetailAction } from '@/stores/actions';

const genderMenuItems = [
	{ key: 'M', value: 'W', label: 'Male' },
	{ key: 'F', value: 'F', label: 'Female' }
];

const BookAppointment = () => {

	const breadCrumbs = [
		{ name: 'Home', url: '/' },
		{ name: 'Book Appointment', url: '/find-a-doctor' },
	];

	const { slotcode } = useParams();
	const navigate = useNavigate();

	const bookAppointmentDispatch = useAppAsyncDispatch(bookAppointment);
	const getFamilyProfilesDispatch = useAppAsyncDispatch(getFamilyProfiles);
	const uploadPhotoAsuransi = useAppAsyncDispatch(uploadPhotoProfile);
	const getUserDetail = useAppAsyncDispatch<UserDataDetail>(userDetailAction);

	const { familyProfiles, loading: familyProfileLoading, userDetail } = useTypedSelector<UserState>('user');
	const { loading: uploadPhoto } = useTypedSelector<PatientState>('patient');
	const [searchParams, setSearchParams] = useSearchParams();

	const { bookAppointmentFields } = useBookAppointment();

	const { registeredValue, onSubmit, getCurrentForm } = Form.useForm({ fields: bookAppointmentFields });

	const { selectedDoctorTimeSlot, masterDoctors } = useTypedSelector<FindDoctorState>('findDoctor');
	const { loading } = useTypedSelector<AppointmentState>('appointment');

	const [confirmationModal, setConfirmationModalVisible] = useState<boolean>(false);
	const [addProfileModal, setAddProfileModal] = useState<boolean>(false);
	const [successModal, setSuccessModal] = useState<boolean>(false);
	const [tempImageAsuransiFront, setTempImageAsuransiFront] = useState<Blob | null>(null);
	const [tempImageAsuransiBack, setTempImageAsuransiBack] = useState<Blob | null>(null);
	const [imgAsuransiFrontPath, setImgAsuransiFrontPath] = useState<string>('');
	const [imgAsuransiBackPath, setImgAsuransiBackPath] = useState<string>('');

	const [selectedProfile, setSelectedProfile] = useState<FamilyProfile>();
	const [selfProfile, setSelfProfile] = useState<FamilyProfile>();
	const [selectedType, setSelectedType] = useState<string>('');

	const [penjamin, setPenjamin] = useState('');
	const [error, setError] = useState();

	const hasMainProfile = userDetail.name || userDetail.phone || userDetail.gender;

	const uploadAsuransiFrontFileRef = useRef<HTMLInputElement>(null);
	const uploadAsuransiBackFileRef = useRef<HTMLInputElement>(null);

	const language = lang.page.doctorProfile;

	useEffect(() => {
		getFamilyProfilesDispatch();
		getUserDetail();
	}, []);

	useEffect(() => {
		if (hasMainProfile) {
			setSelfProfile({
				birthdate: userDetail.birthdate ?? '',
				email: userDetail.email ?? '',
				gender: userDetail.gender ?? '',
				name: userDetail.name ?? '',
				phone: userDetail.phone ?? '',
				id: userDetail.id ?? 0,
				created_date: '',
				updated_date: '',
				no_mr: '',
				parent_email: '',
				patient_code: ''
			});
		}
	}, [userDetail]);

	const getTimeSlot = () => {
		return selectedDoctorTimeSlot.find(timeSlot => timeSlot.slot_id === slotcode);
	};

	if (!getTimeSlot()) {
		return <>Time slot is not selected</>;
	}

	const getDoctor = () => {
		const timeSlot = getTimeSlot();
		return masterDoctors.find(doctor => doctor.doctor_code === timeSlot?.doctor_code);
	};

	const getClinic = () => {
		const timeSlot = getTimeSlot();
		const doctor = getDoctor();
		const docSchedule = doctor?.doctor_schedule.find(schedule => schedule.hospital_code === timeSlot?.hospital_code);
		return docSchedule?.clinics[0];
	};
	const onCloseProfileModal = (profile: ProfilePayload, isMain?: boolean) => {
		getFamilyProfilesDispatch();
		setAddProfileModal(false);
		if (isMain) {
			setSelfProfile({
				birthdate: profile.dob,
				email: profile.email,
				gender: profile.gender,
				name: profile.name,
				phone: profile.phone,
				id: 0,
				created_date: '',
				updated_date: '',
				no_mr: '',
				parent_email: '',
				patient_code: ''
			});
		}
		setSelectedProfile({
			birthdate: profile.dob,
			email: profile.email,
			gender: profile.gender,
			name: profile.name,
			phone: profile.phone,
			id: 0,
			created_date: '',
			updated_date: '',
			no_mr: '',
			parent_email: '',
			patient_code: ''
		});
	};

	const onAddNewProfile = (type: string) => {
		setSelectedType(type);
		setAddProfileModal(true);
	};

	const onBookVisit = () => {
		setConfirmationModalVisible(true);
	};

	const uploadAsuransiPhotoFront = async () => {
		const formImg = new FormData();
		formImg.append('upload', tempImageAsuransiFront ?? '');
		const responseData = await uploadPhotoAsuransi({ payload: formImg });
		if (responseData.stat_msg === 'Success') {
			const urlImage = 'https://rebel-env.s3.us-west-2.amazonaws.com/rspi/dev/rspi-api/uploads/';
			return urlImage + responseData.data;
		}
		return '';
	};

	const uploadAsuransiPhotoBack = async () => {
		const formImg = new FormData();
		formImg.append('upload', tempImageAsuransiBack ?? '');
		const responseData = await uploadPhotoAsuransi({ payload: formImg });
		if (responseData.stat_msg === 'Success') {
			const urlImage = 'https://rebel-env.s3.us-west-2.amazonaws.com/rspi/dev/rspi-api/uploads/';
			return urlImage + responseData.data;
		}
		return '';
	};

	const onConfirmed = async () => {
		try {

			const timeSlot = getTimeSlot();
			const { dob, email, gender, keluhan, klinik, layanan, name, pembayaran, phone, tindakan, asuransi, noAsuransi } = getCurrentForm();

			const payloadBook = {
				patient_name: selectedProfile?.name,
				'patient_code': selectedProfile?.patient_code,
				'slot_id': timeSlot?.slot_id ?? '',
				'location': timeSlot?.clinic_code, 					// clinic code
				'time_slot': formatTimeslot(timeSlot?.session_app_start ?? ''),
				'date': timeSlot?.date,
				'user_name': 'RSPI_WEB', 						// terserah
				'type': isEqual(selfProfile, selectedProfile) ? 'self' : 'other', 										// self or other
				'doctor_code': timeSlot?.doctor_code,
				'gender': selectedProfile?.gender === 'Female' ? 'F' : 'M',
				'date_of_birth': (selectedProfile?.birthdate && splitDate(selectedProfile.birthdate)) ?? '',
				'phone': selectedProfile?.phone,
				'email': selectedProfile?.email,
				'main_complaint': keluhan.value,
				'necessity_action': tindakan.value,
				'payment_method': penjamin,
				'service': searchParams.get('service'), 					// TEL / APP
				'hospital_code': timeSlot?.hospital_code,
				'insurance_name': asuransi.value,
				'insurance_number': noAsuransi.value,
				'insurance_front_img': tempImageAsuransiFront ? await uploadAsuransiPhotoFront() : '',
				'insurance_back_img': tempImageAsuransiBack ? await uploadAsuransiPhotoBack() : ''
			};

			await bookAppointmentDispatch({
				payload: payloadBook
			});
			setSuccessModal(true);
		} catch (error: any) {
			setConfirmationModalVisible(false);
			setError(error.stat_msg);
		}
	};

	const getHospital = () => {
		const timeSlot = getTimeSlot();
		return getDoctor()?.doctor_schedule.find(schedule => schedule.hospital_code === timeSlot?.hospital_code);
	};

	const genderMap = (val: string) => {
		if (!val) return '';
		return val.toLowerCase() === 'm' || val.toLowerCase() === 'male' ? 'Male' : 'Female';
	};
	return (
		<BookAppointmentContainer
			className='lg:w-[1110px] mx-auto max-sm:px-[15px] md:pt-[60px] pb-[120px]'
		>
			<Breadcrumbs datas={ breadCrumbs } />
			<div className='content-wrapper sm:flex w-full items-center flex-col max-sm:p-[16px]'>
				<ProfileSelector onSelected={ setSelectedProfile } selfProfile={ selfProfile } onAddNewProfileBtn={ onAddNewProfile } />
				{
					error &&
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
							text={ error }
							color={ colors.red.default }
						/>
					</NotificationPanel>
				}
				<Form className='w-full mt-[10px] flex flex-col gap-[12px]'>
					<FormRow className='flex flex-col md:flex-row items-center'>
						<FormCol>
							<Form.TextField
								width='100%'
								{ ...registeredValue('keluhan') }
								label='Keluhan utama saat ini'
							/>
						</FormCol>
						<FormCol>
							<Radio groupLabel='Pilih Penjamin' onChange={ setPenjamin } value={ penjamin } >
								<Radio.Option label={ 'Pribadi' } value={ 'pribadi' } />
								<Radio.Option label={ 'Asuransi' } value={ 'asuransi' } />
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
										{ ...registeredValue('asuransi') }
										label='Nama Asuransi'
										width='100%'
									/>
								</FormCol>
								<FormCol >
									<Form.TextField
										isNumber
										mask={ '9999999999999999' }
										{ ...registeredValue('noAsuransi') }
										label='Nomor Asuransi'
										width='100%'
									/>
								</FormCol>
							</FormRow>
							<FormRow>
								<div className='flex flex-col'>
									<label className='text-sm font-black'>{ language.asuransiCard }</label>
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
											<div className='w-full h-full absolute flex items-center justify-center upload-mask top-0 flex flex-row gap-x-2' onClick={ () => uploadAsuransiFrontFileRef.current?.click() }>
												<Image 
													src={icons.UploadCloud}
													alt=""
													color={ colors.grey.dark } />
												<Text color={ colors.green.brandAccent } fontWeight='600'>Upload foto tampak depan</Text>
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
											<div className='w-full h-full absolute flex items-center justify-center upload-mask top-0 flex flex-row gap-x-2' onClick={ () => uploadAsuransiBackFileRef.current?.click() }>
												<Image
													src={icons.UploadCloud}
													alt=""
													color={ colors.grey.dark } />
												<Text color={ colors.green.brandAccent } fontWeight='600'>Upload foto tampak belakang</Text>
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
						<Button label='Back' theme='outline' className=' w-full md:w-auto' onClick={ () => { navigate(-1); } } />
						<Button label='Book Visit Now' className=' w-full md:w-auto' disabled={ loading } onClick={ () => { onBookVisit(); } } />
					</BottomBar>
				</Form>
				<DisclaimerAlert>
					<Text color={ colors.green.brandAccent }>Disclaimer : Data yang diberikan adalah benar. Pendaftaran dilakukan untuk diri sendiri. Jika pendaftaran dilakukan untuk orang lain, sudah mendapatkan persetujuan dari pihak terkait</Text>
				</DisclaimerAlert>
			</div>

			<ConfirmationModal
				timeSlot={ getTimeSlot() }
				visible={ confirmationModal }
				onClose={ () => { setConfirmationModalVisible(false); } }
				selectedProfile={ selectedProfile }
				noAsuransi={ getCurrentForm().noAsuransi.value }
				namaAsuransi={ getCurrentForm().asuransi.value }
				penjamin={ penjamin }
				onConfirmed={ onConfirmed }
				loading={ loading }
				loadingUploadPhoto={ uploadPhoto }
			/>
			<AddProfileModal
				visible={ addProfileModal }
				onClose={ onCloseProfileModal }
				selfProfile={ selfProfile }
				type={ selectedType }
			/>
			<SuccessConfirmationModal
				hospitalName={ getHospital()?.hospital }
				doctorName={ getDoctor()?.doctor_name }
				date={ getTimeSlot()?.date }
				visible={ successModal }
			/>
		</BookAppointmentContainer>
	);
};

export default BookAppointment;