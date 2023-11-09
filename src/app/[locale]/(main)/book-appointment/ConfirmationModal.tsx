import { useRouter } from 'next/navigation';

import { Button, Checkbox, Modal, Spinner, Text } from '@/components';
import { ConfirmationModalContainer } from './style';
import { colors } from '@/constant';
import DoctorProfileWidget from './DoctorProfileWidget';
import { FamilyProfile, FindDoctorState, TimeSlot } from '@/interface';
import dayjs from 'dayjs';
import { useTypedSelector } from '@/hooks';
import { useState } from 'react';
import { splitDate } from '@/helpers/datetime';

type Props = {
	visible: boolean,
	onClose: () => void;
	selectedProfile?: FamilyProfile;
	timeSlot?: TimeSlot,
	penjamin?: string,
	namaAsuransi?: string;
	noAsuransi?: string;
	onConfirmed: () => void;
	loading?: boolean;
	loadingUploadPhoto?: boolean;
};

export const ConfirmationModal = ({ visible, onClose, selectedProfile, timeSlot, penjamin, namaAsuransi, noAsuransi, onConfirmed, loading, loadingUploadPhoto }: Props) => {
	const navigate = useRouter();
	const { selectedDoctorTimeSlot, masterDoctors } = useTypedSelector<FindDoctorState>('findDoctor');
	const [checked, setChecked] = useState<boolean>(false);
	const getDoctor = () => {
		return masterDoctors.find(doctor => doctor.doctor_code === timeSlot?.doctor_code);
	};

	const toProfilPage = () => {
		navigate.push('/user-information');
	};

	if (selectedProfile && selectedProfile.phone && timeSlot && getDoctor()) {
		return <Modal borderRadius='12px' visible={ visible } onClose={ onClose }>
			<ConfirmationModalContainer >
				<Text
					text='Konfirmasi Booking Appointment'
					fontWeight='700'
					fontSize='24px'
					lineHeight='28px'
				/>
				<Text
					text='Silahkan periksa dan konfirmasi kebenaran informasi berikut:'
					fontWeight='400'
					fontSize='14px'
					lineHeight='20px'
					color={ colors.grey.dark }
				/>
				<div className='mt-[24px] px-[16px] flex flex-col gap-[12px]' >
					<Text
						text='Data Pasien'
						fontWeight='700'
						fontSize='14px'
						lineHeight='20px'
					/>
					<div className='grid grid-cols-[150px_auto]'>
						<Text
							text='Nama : '
							fontWeight='500'
							fontSize='14px'
							lineHeight='20px'
						/>
						<Text
							text={ selectedProfile.name }
							fontWeight='700'
							fontSize='14px'
							lineHeight='20px'
						/>
					</div>
					<div className='grid grid-cols-[150px_auto]'>
						<Text
							text='Tanggal Lahir : '
							fontWeight='500'
							fontSize='14px'
							lineHeight='20px'
						/>
						<Text
							text={ dayjs(splitDate(selectedProfile.birthdate)).format('DD MMMM YYYY') }
							fontWeight='700'
							fontSize='14px'
							lineHeight='20px'
						/>
					</div>
					<div className='grid grid-cols-[150px_auto]'>
						<Text
							text='Nomor HP : '
							fontWeight='500'
							fontSize='14px'
							lineHeight='20px'
						/>
						<Text
							text={ selectedProfile.phone }
							fontWeight='700'
							fontSize='14px'
							lineHeight='20px'
						/>
					</div>
					<div className='grid grid-cols-[150px_auto]'>
						<Text
							text='Email : '
							fontWeight='500'
							fontSize='14px'
							lineHeight='20px'
						/>
						<Text
							text={ selectedProfile.email }
							fontWeight='700'
							fontSize='14px'
							lineHeight='20px'
						/>
					</div>
					<div className='grid grid-cols-[150px_auto]'>
						<Text
							text='Penjamin : '
							fontWeight='500'
							fontSize='14px'
							lineHeight='20px'
						/>
						<Text
							text={ penjamin ?? '-' }
							className='capitalize'
							fontWeight='700'
							fontSize='14px'
							lineHeight='20px'
						/>
					</div>
					<hr />
					{
						penjamin === 'asuransi'
						&& <>
							<Text
								text='Data Asuransi'
								fontWeight='700'
								fontSize='14px'
								lineHeight='20px'
							/>
							<div className='grid grid-cols-[150px_auto]'>
								<Text
									text='Nama : '
									fontWeight='500'
									fontSize='14px'
									lineHeight='20px'
								/>
								<Text
									text={ namaAsuransi ?? '-' }
									fontWeight='700'
									fontSize='14px'
									lineHeight='20px'
								/>
							</div>
							<div className='grid grid-cols-[150px_auto]'>
								<Text
									text='Nomor : '
									fontWeight='500'
									fontSize='14px'
									lineHeight='20px'
								/>
								<Text
									text={ noAsuransi ?? '-' }
									fontWeight='700'
									fontSize='14px'
									lineHeight='20px'
								/>
							</div>
						</>
					}
				</div>
				<DoctorProfileWidget doctorData={ getDoctor() } timeSlot={ timeSlot } />
				<div className='my-[32px] flex items-center'>
					<Checkbox label='Saya menyatakan bahwa seluruh data diatas ' labelBold=' sudah benar.' onChange={ evt => {
						setChecked(evt.target.checked);
					} } />
				</div>
				<Button onClick={ onConfirmed } disabled={ !checked } >
					{ loading || loadingUploadPhoto ? <Spinner /> : 'Konfirmasi' }
				</Button>
			</ConfirmationModalContainer>
		</Modal>;
	}
	else {
		return <Modal borderRadius='12px' visible={ visible } onClose={ onClose }>
			<ConfirmationModalContainer >
				<Text
					text='Terdapat Data Diri yang Belum Lengkap'
					fontWeight='700'
					fontSize='24px'
					lineHeight='28px'
					className='pb-2'
				/>
				<Text
					text='Silahkan klik tombol di bawah ini untuk diarahkan ke halaman profil'
					fontWeight='400'
					fontSize='14px'
					lineHeight='20px'
					color={ colors.grey.dark }
					className='pb-4'
				/>
				<Button label='Menuju Halaman Profil' onClick={ toProfilPage } />
			</ConfirmationModalContainer>
		</Modal>;
	}

	return <></>;
};

export default ConfirmationModal;