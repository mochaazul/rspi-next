import { useState } from 'react';

import {
	Button, Form, Modal, NotificationPanel, Text
} from '@/components';
import { colors, Images, icons, Languages } from '@/constant';
import { CardPatientPortalStyle } from 'pages/PatientPortal/style';

import DetailKunjungan from '../ModalDetailKunjungan';
import * as Icons from 'react-feather';
import dayjs from 'dayjs';
import { I_VisitHistory } from '@/interface/PatientProfile';
import RecommendDoctorModal from '../ModalRecommendDoctor';
import images from '@/constant/images';
import ModalCancelBook from '../ModalCancelBook';
import PinModal from '@/components/PinModal';
import useAppDispatch, { useAppAsyncDispatch } from '@/hooks/useAppDispatch';
import { cancelBooking } from '@/stores/actions';
import { navigation } from '@/helpers';
import { UserDataDetail } from '@/interface/user';
import { userDetail as userDetailAction } from '@/stores/actions';
import Image from 'next/image';


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
	const { navigate } = navigation();

	const [modalOpen, setModalOpen] = useState(false);
	const [modalReccomend, setModalRecommed] = useState(false);
	const [showModalCancelBook, setShowModalCancelBook] = useState(false);
	const [showPinModal, setShowPinModal] = useState(false);
	const userDetail = useAppAsyncDispatch<UserDataDetail>(userDetailAction);

	const { jadwalKunjungan, riwayatKunjungan } = Languages.page.patientPortal;

	const handleShowModal = () => {
		if (!props.isHistory) {
			setModalOpen(!modalOpen);
		} else {
			setModalRecommed(true);
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

	const userCancelBooking = useAppDispatch(cancelBooking);

	const userClickCancelBook = async (appointmentId: string) => {
		await userCancelBooking({
			id: appointmentId
		});
		setShowPinModal(false);
		navigate('/patient-portal/3');
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
				return 'Jadwal Selesai';
			case 'X':
				return 'Jadwal Dibatalkan';
			case 'N':
				return 'Tidak Hadir';
			case 'H':
				return 'Hold';
			case 'T':
				return 'Transferred';
			case 'A':
				return 'Arrived';
			case 'P':
				return 'Postponed';
			case 'S':
				return 'Seen';
			case 'U':
				return 'Arrived Not Seen';
			default:
				return '';
		}
	};

	return (
		<CardPatientPortalStyle
			className='flex flex-col'
		>
			<div className='flex flex-wrap items-center'>
				<Text text={ `Apointment ID: ${ props.id }` } fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } className='md:mr-[15px]' />
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
				{
					!props.isTelemedicine && (
						<button
							style={ { backgroundColor: colors.grey.darked } }
							className={ 'py-[4px] px-[15px] rounded-[10px] duration-300 ' }
						>
							<div className='flex items-center gap-[5px]'>
								<Text
									text={ 'Konsultasi Tatap Muka' }
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
									text={ 'Telekonsultasi' }
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
					<div onClick={ () => navigate(`/doctor-detail/${ props.doctor_id }`) } className='btn-success max-sm:hidden cursor-pointer'>{ `Jadwalkan Lagi` }</div>
				}
				{ props.visit_status === 'X' &&
					<div onClick={ () => navigate(`/doctor-detail/${ props.doctor_id }`) } className='btn-success max-sm:hidden cursor-pointer'>{ `Jadwalkan Ulang` }</div>
				}
				{ props.status !== 'Jadwal Selesai' &&
					<div onClick={ async () => {
						await userDetail();
						setShowModalCancelBook(true);
					} } className='btn-cancel max-sm:hidden cursor-pointer'>{ `X ${ jadwalKunjungan.label.cancelAppointment }` }</div>
				}

			</div>
			{ props.isTelemedicine
				&& <div className='flex items-center mt-[12px] gap-[8px]' >
					<Image src={icons.User} alt="" sizes={12} />
					<Text text={ `Pasien: ${ props.patientName }` } fontSize='14px' fontWeight='700' color={ colors.blue.neon } />
				</div>
			}
			<div className='grid grid-cols-[auto_repeat(3,minmax(0,1fr))] mt-[24px] gap-[24px] cursor-pointer'>
				<img src={ props.doctorImgUrl } width={ 60 } className='rounded-full h-[60px] w-[60px]' />
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
					<div className='btn-cancel md:hidden'>{ `X ${ jadwalKunjungan.label.cancelAppointment }` }</div>
				}
			</div >

			{
				props.status === 'Jadwal Selesai' &&
				<div className='flex flex-row gap-x-2 items-center justify-end cursor-pointer mt-[20px]' onClick={ () => {
					handleShowModal && handleShowModal();
				} }>
					<Text fontSize='16px' fontType='p' fontWeight='900' color={ colors.paradiso.default } text={ props.isHistory ? riwayatKunjungan.label.recommendDoctor : riwayatKunjungan.label.seeDetail } />
					<Image src={icons.LongArrowRight} alt="" className='svg-green' style={ { width: '20px' } } />
				</div>
			}
			< DetailKunjungan
				visible={ modalOpen }
				onClose={ handleShowModal }
				id={ props.id }
			/>
			<RecommendDoctorModal
				visible={ modalReccomend }
				onClose={ () => { setModalRecommed(false); } }
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
				doctorImg={ props.doctorImgUrl || images.Doctor1 }
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