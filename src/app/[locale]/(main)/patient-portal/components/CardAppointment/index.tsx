'use client';

import { useState } from 'react';
import * as Icons from 'react-feather';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dayjs from 'dayjs';

import { colors, icons } from '@/constant';
import PinModal from '@/components/ui/PinModal';
import Text from '@/components/ui/Text';
import { I_VisitHistory } from '@/interface/PatientProfile';
import { usePostCancelBookingMutation } from '@/lib/api/client/appointments';
import { useScopedI18n } from '@/locales/client';

import { CardPatientPortalStyle } from '../../style';
import RecommendDoctorModal from '../ModalRecommendDoctor';
import ModalCancelBook from '../ModalCancelBook';
import DetailKunjungan from '../ModalDetailKunjungan';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { UserDataDetail } from '@/interface';

interface PropsType {
	status?: 'appointment' | 'history';
	queueNo?: number;
	id: string;
	doctorName?: string;
	doctorSpeciality?: string;
	schedule?: string;
	location?: string;
	showDetail?: boolean;
	patientName?: string;
	doctorImgUrl?: string;
	clinic_name?: string;
	hospital_name?: string;
	type: 'self' | 'other';
	isTelemedicine: boolean,
	date?: string;
	data?: I_VisitHistory;
	isHistory?: boolean;
	time?: string;
	patientBirthDate?: string;
	patientPhone?: string;
	visit_status?: string;
	doctor_id?: string;
	patientProfile: UserDataDetail;
}

const CardAppointment = (props: PropsType) => {
	const t = useScopedI18n('page.patientPortal');

	const { mutate } = useSWRConfig();

	const navigate = useRouter();

	const [modalOpen, setModalOpen] = useState(false);
	const [modalRecommend, setModalRecommend] = useState(false);
	const [showModalCancelBook, setShowModalCancelBook] = useState(false);
	const [showPinModal, setShowPinModal] = useState(false);

	const { data: cancelBookingResponse, trigger: cancelBookingTrigger, error: cancelBookingError, isMutating: isLoadingCancelBook } = usePostCancelBookingMutation();

	const handleShowModal = () => {
		if (!props.isHistory) {
			setModalOpen(!modalOpen);
		} else {
			setModalRecommend(true);
		}
	};

	const Bullet = () => {
		return (
			<button style={ {
				width: '6px',
				height: '6px',
				borderRadius: '50px',
				background: colors.grey.light,
			} } />
		);
	};

	const userClickCancelBook = async (appointmentId: string) => {
		try {
			await cancelBookingTrigger({
				appointment_id: appointmentId
			});
			mutate((key: any) => typeof key === 'string' && key.startsWith('appointmentList'));
			toast.success('Cancel Booking Success', {
				hideProgressBar: true,
				pauseOnHover: false,
			});
			setShowPinModal(false);
			setShowModalCancelBook(false);

		} catch (error) {
			toast.error('Error');
		}
	};

	const isVisitActive = (code: string) => {
		return props.status === 'appointment' && ['U', 'S', 'P', 'A'].includes(code);
	};

	const mappingStatusColor = (code: string) => {
		if (isVisitActive(code)) {
			return colors.paradiso.default;
		}

		switch (code) {
			case 'C':
				return colors.grey.darkOpacity;
			case 'X':
				return colors.red.default;
			case 'N':
				return colors.red.default;
			default:
				return colors.grey.darkOpacity;
		}
	};

	const mappingStatusColorBackground = (code: string) => {
		if (isVisitActive(code)) {
			return colors.paradiso.opacity10;
		}

		switch (code) {
			case 'C':
				return colors.grey.lighterOpacity;
			case 'X':
				return colors.red.defaultOpacity10;
			case 'N':
				return colors.red.defaultOpacity10;
			default:
				return colors.grey.lighterOpacity;
		}
	};

	const mappingStatus = (code: string) => {
		if (isVisitActive(code)) {
			return t('jadwalKunjungan.label.activeSchedule');
		}

		switch (code) {
			case 'C':
				return t('jadwalKunjungan.statusLabel.C');
			case 'X':
				return t('jadwalKunjungan.statusLabel.X');
			case 'N':
				return t('jadwalKunjungan.statusLabel.N');
			case 'H':
				return t('jadwalKunjungan.statusLabel.H');
			case 'T':
				return t('jadwalKunjungan.statusLabel.T');
			case 'A':
				return t('jadwalKunjungan.statusLabel.A');
			case 'P':
				return t('jadwalKunjungan.statusLabel.P');
			case 'S':
				return t('jadwalKunjungan.statusLabel.S');
			case 'U':
				return t('jadwalKunjungan.statusLabel.U');
			case 'D':
				return t('jadwalKunjungan.statusLabel.D');
			default:
				return '';
		}
	};

	const renderButtonCancelAppointment = (className?: string) => {
		if (props.status === 'appointment') {
			return (
				<button onClick={ () => setShowModalCancelBook(true) } className={ `btn-cancel group hover:text-white hover:bg-[#EB5757] focus:outline-none focus:ring-0 cursor-pointer flex items-center gap-[5px] ${ className }` }>
					<icons.Close className='w-4 h-4 [&>path]:fill-[#EB5757] group-hover:[&>path]:fill-white' />
					<span className='inline-block'>{ t('jadwalKunjungan.label.cancelAppointment') }</span>
				</button>
			);
		}

		return null;
	};

	const renderPatientName = () => {
		if (props.type === 'other' && props.patientName)
			return (
				<div className='flex items-center mt-[12px] gap-[8px]' >
					<icons.User className='w-4 h-4' />
					<Text text={ `Patient: ${ props.patientName }` } fontSize='16px' fontWeight='700' color={ colors.blue.neon } />
				</div>
			);
	};

	const renderButtonReschedule = (className?: string) => {
		if (props.visit_status === 'C' && props.status === 'history') {
			return (
				<button onClick={ () => navigate.push(`/doctor/${ props.doctor_id }`) } className={ `btn-success cursor-pointer ${ className }` }>{ t('jadwalKunjungan.label.rescheduleAgain') }</button>
			);
		}

		if (props.visit_status === 'X') {
			return (
				<button onClick={ () => navigate.push(`/doctor/${ props.doctor_id }`) } className={ `btn-success group flex items-center justify-center gap-[5px] ${ className }` }>
					<icons.ArrowsClockwise className='group-hover:[&>path]:fill-white' />
					{ t('jadwalKunjungan.label.reschedule') }
				</button>
			);
		}

		return null;
	};

	return (
		<CardPatientPortalStyle
			className='flex flex-col mb-4 sm:mb-5'
		>
			<div className='flex flex-wrap items-center gap-1 md:gap-2.5'>
				<Text text={ `Appointment ID: ${ props.id }` } fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />

				<Bullet />
				{ props.visit_status && (
					<div>
						<button
							style={ { backgroundColor: mappingStatusColorBackground(props.visit_status ?? '') } }
							className='py-[3px] px-[15px] rounded-[10px] duration-300 cursor-default'
						>
							<Text
								text={ mappingStatus(props.visit_status ?? '') }
								fontWeight='700'
								fontSize='14px'
								subClassName='leading-normal text-center'
								color={ mappingStatusColor(props.visit_status ?? '') } />
						</button>
					</div>
				) }
				{
					!props.isTelemedicine && (
						<button
							style={ { backgroundColor: colors.grey.darked } }
							className={ 'py-1 px-2.5 rounded-[100px] duration-300 cursor-default' }
						>
							<div className='flex items-center justify-center'>
								<Text
									text={ t('jadwalKunjungan.offlineConsultation') }
									fontWeight='700'
									fontSize='14px'
									subClassName='text-center'
									color={ colors.white.default } />
							</div>
						</button>
					)
				}
				{
					props.isTelemedicine && (
						<button
							style={ { backgroundColor: colors.red.danger } }
							className={ 'py-1 px-2.5 rounded-[100px] duration-300 ' }
						>
							<div className='flex items-center gap-[5px]'>
								<Icons.Video color={ colors.white.body } size={ 16 } />
								<Text
									text={ t('jadwalKunjungan.teleconsultationLabel') }
									fontWeight='700'
									fontSize='14px'
									color={ colors.white.body } />
							</div>
						</button>
					)
				}
				<div className='max-md:hidden my-auto ml-auto mr-0'>
					{ renderButtonReschedule() }
					{ renderButtonCancelAppointment() }
				</div>

			</div>
			{ renderPatientName() }

			<div className='flex flex-col md:flex-row md:grid md:grid-cols-3 mt-4 sm:mt-6 gap-8 md:gap-6'>
				<div className='flex gap-[15px] md:col-span-1'>
					<div className='relative overflow-hidden w-12 h-12 md:w-[60px] md:h-[60px] rounded-full flex-shrink-0'>
						<Image
							className='object-cover object-top'
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							alt=''
							src={ props.doctorImgUrl || '/images/samples/default-avatar.jpg' }
							fill
						/>
					</div>
					<div className='flex flex-col gap-2.5'>
						<Text text={ props.doctorName || '-' } fontSize='16px' fontWeight='700' />
						<Text text={ props.doctorSpeciality || '-' } fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } subClassName='max-sm:text-xs !leading-normal' />
					</div>
				</div>
				<div className='max-md:divide-x divide-[#EAEAEA] md:col-span-2 grid grid-cols-2 items-start max-md:justify-between md:gap-6'>
					<div className='flex flex-col-reverse md:flex-col gap-[10px] max-md:pr-2'>
						<div>
							<Text text={ dayjs(`${ props.date } ${ props.time }`).format('DD MMMM YYYY, hh:mm A') ?? '-' } fontSize='16px' fontWeight='700' subClassName='!text-center md:text-left !leading-normal' />
							{ props.queueNo && !props.isTelemedicine && (
								<Text text={ `${ t('jadwalKunjungan.label.queueNo') } ${ props.queueNo }` } fontSize='16px' fontWeight='700' className='max-md:hidden !leading-normal' />
							) }
						</div>
						<Text text={ t('jadwalKunjungan.label.visitSchedule') } fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } subClassName='!text-center md:text-left max-sm:text-xs !leading-normal' />
					</div>
					<div className='flex flex-col-reverse md:flex-col gap-[10px] max-md:pl-2' >
						<Text text={ props.clinic_name || '-' } fontSize='16px' fontWeight='700' subClassName='!text-center md:text-left !leading-normal' />
						<Text text={ props.hospital_name || '-' } fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } subClassName='!text-center md:text-left max-sm:text-xs !leading-normal' />
					</div>
				</div>
			</div>
			<div className='md:hidden w-full flex flex-col items-center'>
				{ renderButtonCancelAppointment('mt-8') }
				{ renderButtonReschedule('mt-8') }
			</div>

			{
				props.status === 'history'
				&& props.visit_status === 'C'
				&&
				<div className='flex flex-row gap-x-2 items-center justify-center md:justify-end cursor-pointer mt-8 md:mt-5' onClick={ handleShowModal }>
					<Text fontSize='16px' fontType='p' fontWeight='900' color={ colors.paradiso.default } text={ props.isHistory ? t('riwayatKunjungan.label.recommendDoctor') : t('riwayatKunjungan.label.seeDetail') } subClassName='max-md:text-center' />
					<icons.LongArrowRight className='[&>path]:stroke-green-secondary w-5 h-5 max-md:hidden' />
				</div>
			}
			<DetailKunjungan
				visible={ modalOpen }
				onClose={ handleShowModal }
				id={ props.id }
			/>
			<RecommendDoctorModal
				visible={ modalRecommend }
				onClose={ () => { setModalRecommend(false); } }
				visitHistory={ props.data }
			/>
			{
				props.isTelemedicine &&
				<div className='flex' />
			}

			<ModalCancelBook
				visible={ showModalCancelBook }
				onClose={ () => { setShowModalCancelBook(false); } }
				patientName={ props.patientName || '-' }
				doctorImg={ props.doctorImgUrl }
				doctorName={ props.doctorName || '-' }
				doctorSpec={ props.doctorSpeciality || '-' }
				bookDate={ dayjs(`${ props.date } ${ props.time }`).format('DD MMMM YYYY hh:mm A') ?? '-' }
				bookClinic={ props.clinic_name || '-' }
				hospital={ props.hospital_name || '-' }
				onClickButtonCancelAppointment={ () => setShowPinModal(true) }
				patientBirthDate={ props.patientBirthDate || '-' }
				patientPhone={ props.patientPhone || '-' }
				patientProfile={ props.patientProfile }
			/>
			<PinModal visible={ showPinModal } onSuccess={ () => userClickCancelBook(props.id) } isLoading={ isLoadingCancelBook } onClose={ () => setShowPinModal(false) } />
		</CardPatientPortalStyle >
	);
};

export default CardAppointment;