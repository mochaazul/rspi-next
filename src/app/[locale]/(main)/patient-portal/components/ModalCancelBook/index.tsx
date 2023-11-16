'use client';

import dayjs from 'dayjs';
import Image from 'next/image';

import { Modal, Text, Button } from '@/components';
import { colors, icons } from '@/constant';
import useSession from '@/session/client';

import { ModalStyle } from '../../style';
interface PropsType {
	visible?: boolean;
	onClose?: () => void;
	id?: string;
	nama?: string;
	birthDate?: string;
	noHp?: string;
	doctorImg?: string;
	doctorName?: string;
	doctorSpec?: string;
	bookDate?: string;
	bookClinic?: string;
	hospital?: string;
	onClickButtonCancelAppointment: () => void;
}

const ModalCancelBook = (props: PropsType) => {
	const session = useSession();

	return (
		<Modal
			visible={ props.visible }
			width='558px'
			noPadding={ true }
		>
			<ModalStyle>
				<div>
					<div className='flex flex-row'>
						<Text text={ 'Konfirmasi Pembatalan' } fontSize='24px' fontWeight='700' className='flex-1' />
						<div onClick={ props.onClose } className='cursor-pointer'>
							<Image src={ icons.Close } alt="" />
						</div>
					</div>
					<Text text={ 'Apakah Anda yakin ingin membatalkan janji temu dengan dokter?' } fontSize='14px' fontWeight='400' className='mt-[10px]' color={ colors.grey.darkOpacity } />

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
								text={ session.user?.name }
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
								text={ props.birthDate ? dayjs(session.user?.birthdate).format('DD MMMM YYYY') : '-' }
								fontWeight='700'
								fontSize='14px'
								lineHeight='20px'
							/>
						</div>
						<div className='grid grid-cols-[150px_auto]'>
							<Text
								text='No HP : '
								fontWeight='500'
								fontSize='14px'
								lineHeight='20px'
							/>
							<Text
								text={ session.user?.phone ?? '-' }
								fontWeight='700'
								fontSize='14px'
								lineHeight='20px'
							/>
						</div>
					</div>

					<div className='flex my-[30px]'>
						<img src={ props.doctorImg } width={ 60 } className='rounded-full h-[60px] w-[60px]' />
						<div className='ml-[15px]'>
							<Text text={ props.doctorName } fontSize='16px' fontWeight='700' />
							<Text text={ props.doctorSpec } className='mt-[10px]' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
							<div className='flex justify-between mt-[20px] gap-x-2'>
								<div>
									<Text text={ props.bookDate } fontSize='14px' fontWeight='700' />
									<Text text={ 'Jadwal Konsultasi' } className='mt-[10px]' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
								</div>
								<div>
									<Text text={ props.bookClinic } fontSize='14px' fontWeight='700' />
									<Text text={ props.hospital } className='mt-[10px]' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
								</div>
							</div>
						</div>
					</div>
					<Button theme='primary' hoverTheme='primary' themeColor='red' label={ 'Batalkan Kunjungan' } onClick={ props.onClickButtonCancelAppointment } />
				</div>
			</ModalStyle>
		</Modal>
	);
};

export default ModalCancelBook;