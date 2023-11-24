'use client';

import { useState } from 'react';
import * as Icons from 'react-feather';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dayjs from 'dayjs';

import { colors, icons } from '@/constant';
import images from '@/constant/images';
import PinModal from '@/components/ui/PinModal';
import Text from '@/components/ui/Text';
import { I_VisitHistory } from '@/interface/PatientProfile';
import { usePostCancelBookingMutation } from '@/lib/api/client/appointments';
import { useScopedI18n } from '@/locales/client';

import { CardPatientPortalStyle } from '../../style';
import RecommendDoctorModal from '../ModalRecommendDoctor';
import ModalCancelBook from '../ModalCancelBook';
import DetailKunjungan from '../ModalDetailKunjungan';

interface PropsType {
	status?: string;
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
	type: 'self' | 'others';
	isTelemedicine: boolean,
	date?: string;
	data?: I_VisitHistory;
	isHistory?: boolean;
	time?: string;
	patientBirthDate?: string;
	patientPhone?: string;
	visit_status?: string;
	doctor_id?: string;
}

const CardAppointment = (props: PropsType) => {
	const t = useScopedI18n('page.patientPortal');

	const navigate = useRouter();

	const [modalOpen, setModalOpen] = useState(false);
	const [modalRecommend, setModalRecommend] = useState(false);
	const [showModalCancelBook, setShowModalCancelBook] = useState(false);
	const [showPinModal, setShowPinModal] = useState(false);

	const { data: cancelBookingResponse, trigger: cancelBookingTrigger, error: cancelBookingError } = usePostCancelBookingMutation();

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
		await cancelBookingTrigger({
			id: appointmentId
		});
		setShowPinModal(false);
		navigate.push('/patient-portal/3');
	};

	const isVisitActive = () => {
		const activeStatus = ['arrived not seen', 'seen doctor', 'postponed', 'admitted / arrived', 'admitted', 'arrived'];
		return activeStatus.includes(props.status?.toLowerCase() || '');
	};

	const mappingStatusColor = (code: string) => {
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
		switch (code) {
			case 'C':
				return colors.grey.light;
			case 'X':
				return colors.red.light;
			case 'N':
				return colors.red.light;
			default:
				return colors.grey.light;
		}
	};

	const mappingStatus = (code: string) => {
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
			default:
				return '';
		}
	};

	return (
		<CardPatientPortalStyle
			className='flex flex-col'
		>
			<div className='flex flex-wrap items-center'>
				<Text text={ `Appointment ID: ${ props.id }` } fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } className='md:mr-[15px]' />
				{
					props.type === 'self' ?
						<>
							<Bullet />
							<div>
								<button
									style={ { backgroundColor: mappingStatusColorBackground(props.visit_status ?? '') } }
									className={ 'py-[4px] px-[15px] rounded-[10px] duration-300 mx-[8px] ' }
								>
									<Text
										text={ mappingStatus(props.visit_status ?? '') }
										fontWeight='600'
										fontSize='14px'
										className='max-sm:py-[0px]'
										color={ mappingStatusColor(props.visit_status ?? '') } />
								</button>
							</div>
						</> : <></>
				}
				{
					!props.isTelemedicine && (
						<button
							style={ { backgroundColor: colors.grey.darked } }
							className={ 'py-[4px] px-[15px] rounded-[10px] duration-300 ' }
						>
							<div className='flex items-center gap-[5px]'>
								<Text
									text={ t('jadwalKunjungan.offlineConsultation') }
									fontWeight='600'
									fontSize='14px'
									color={ colors.white.body } />
							</div>
						</button>
					)
				}
				{
					props.isTelemedicine && (
						<button
							style={ { backgroundColor: colors.red.danger } }
							className={ 'py-[4px] px-[15px] rounded-[10px] duration-300 ' }
						>
							<div className='flex items-center gap-[5px]'>
								<Icons.Video color={ colors.white.body } size={ 16 } />
								<Text
									text={ t('jadwalKunjungan.teleconsultationLabel') }
									fontWeight='600'
									fontSize='14px'
									color={ colors.white.body } />
							</div>
						</button>
					)
				}
				{ /* { props.status !== 'Jadwal Selesai' &&
					<div className='flex items-center w-'>
						<Bullet />
						<Text text={ `${ jadwalKunjungan.label.queueNo } : ${ props.queueNo }` } fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } className='pl-[15px]' />
					</div>
				} */ }
				{ props.visit_status === 'C' &&
					<div onClick={ () => navigate.push(`/doctor-detail/${ props.doctor_id }`) } className='btn-success max-sm:hidden cursor-pointer'>{ 'Jadwalkan Lagi' }</div>
				}
				{ props.visit_status === 'X' &&
					<div onClick={ () => navigate.push(`/doctor-detail/${ props.doctor_id }`) } className='btn-success max-sm:hidden cursor-pointer'>{ 'Jadwalkan Ulang' }</div>
				}
				{ props.status !== 'Jadwal Selesai' &&
					<div onClick={ async () => { setShowModalCancelBook(true); } } className='btn-cancel max-sm:hidden cursor-pointer'>{ `X ${ t('jadwalKunjungan.label.cancelAppointment') }` }</div>
				}

			</div>
			{ props.isTelemedicine
				&& <div className='flex items-center mt-[12px] gap-[8px]' >
					<icons.User className={ 'w-3 h-3' } />
					<Text text={ `Pasien: ${ props.patientName }` } fontSize='14px' fontWeight='700' color={ colors.blue.neon } />
				</div>
			}
			<div className='grid grid-cols-[auto_repeat(3,minmax(0,1fr))] mt-[24px] gap-[24px] cursor-pointer'>
				<Image alt='' src={ props.doctorImgUrl || '' } height={ 60 } width={ 60 } className='rounded-full h-[60px] w-[60px]' />
				<div className='flex-1'>
					<Text text={ props.doctorName || '-' } fontSize='16px' fontWeight='700' />
					<Text text={ props.doctorSpeciality || '-' } className='mt-[10px]' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
				</div >
				<div className='flex flex-col-reverse md:flex-col gap-[10px]' >
					<Text text={ dayjs(`${ props.date } ${ props.time }`).format('DD MMMM YYYY hh:mm A') ?? '-' } fontSize='16px' fontWeight='700' />
					<Text text={ 'Visit Schedule' } fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
				</div>
				<div
					className='md:hidden inline-block h-[100px] min-h-[1em] w-0.5 self-stretch bg-neutral-200 opacity-100 dark:opacity-50' />
				<div className='flex flex-col-reverse md:flex-col gap-[10px]' >
					<Text text={ props.clinic_name || '-' } fontSize='16px' fontWeight='700' />
					<Text text={ props.hospital_name || '-' } fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
				</div >
				{ props.status !== 'Jadwal Selesai' &&
					<div className='btn-cancel md:hidden'>{ `X ${ t('jadwalKunjungan.label.cancelAppointment') }` }</div>
				}
			</div >

			{
				props.status === 'Jadwal Selesai' &&
				<div className='flex flex-row gap-x-2 items-center justify-end cursor-pointer mt-[20px]' onClick={ () => {
					handleShowModal && handleShowModal();
				} }>
					<Text fontSize='16px' fontType='p' fontWeight='900' color={ colors.paradiso.default } text={ props.isHistory ? t('riwayatKunjungan.label.recommendDoctor') : t('riwayatKunjungan.label.seeDetail') } />
					<icons.LongArrowRight className='svg-green' style={ { width: '20px' } } />
				</div>
			}
			< DetailKunjungan
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
				nama={ props.patientName }
				doctorImg={ props.doctorImgUrl || images.Doctor1.src }
				doctorName={ props.doctorName || '-' }
				doctorSpec={ props.doctorSpeciality || '-' }
				bookDate={ dayjs(`${ props.date } ${ props.time }`).format('DD MMMM YYYY hh:mm A') ?? '-' }
				bookClinic={ props.clinic_name || '-' }
				hospital={ props.hospital_name || '-' }
				onClickButtonCancelAppointment={ () => setShowPinModal(true) }
				birthDate={ props.patientBirthDate || '-' }
				noHp={ props.patientPhone || '-' }
			/>
			<PinModal visible={ showPinModal } onSuccess={ () => userClickCancelBook(props.id) } />
		</CardPatientPortalStyle >
	);
};

export default CardAppointment;