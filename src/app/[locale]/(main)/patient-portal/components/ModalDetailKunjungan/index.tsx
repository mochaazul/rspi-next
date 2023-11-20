'use client';

import { Modal, Text, Button } from '@/components/ui';
import { Images, colors } from '@/constant';

import { ModalStyle } from '../../style';

interface PropsType {
	visible?: boolean;
	onClose?: () => void;
	id?: string;
}

const labResult = [
	{
		name: 'Imunisasi Jenis A',
		date: 'Senin, 13 Januari 2022 • 16:05 WIB'
	},
	{
		name: 'Imunisasi Jenis A',
		date: 'Senin, 13 Januari 2022 • 16:05 WIB'
	}
];

const DetailKunjungan = (props: PropsType) => {
	return (
		<Modal
			visible={ props.visible }
			onClose={ props.onClose }
			width='558px'
			noPadding={ true }
		>
			<ModalStyle>
				<div>
					<Text text={ `Apointment ID: ${ props.id }` } fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } className='mr-[15px]' />
					<Text text={ 'Konsultasi' } fontSize='20px' fontWeight='700' className='mt-[10px]' />
					<div className='flex my-[30px]'>
						<div><img src={ Images.ProfilePatient.src } alt='' /></div>
						<div className='ml-[15px]'>
							<Text text={ 'Prof. Dr. dr. Aman Bhakti Pulungan, Sp.A, (K), FAAP, FRCPI (Hon.)' } fontSize='16px' fontWeight='700' />
							<Text text={ 'Spesialis Akupunktur Klinik Konsultan' } className='mt-[10px]' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
							<div className='flex justify-between mt-[20px]'>
								<div>
									<Text text={ '01 January 2022, 08:00 AM' } fontSize='14px' fontWeight='700' />
									<Text text={ 'Visit Schedule' } className='mt-[10px]' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
								</div>
								<div>
									<Text text={ 'Poli Spesialis - Klinik Akupuntur' } fontSize='14px' fontWeight='700' />
									<Text text={ 'RSPI - Pondok Indah' } className='mt-[10px]' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
								</div>
							</div>
						</div>
					</div>
					<div className='divider'>
						<Text text={ 'Hasil Lab' } fontSize='14px' fontWeight='700' className='pt-[15px]' />
						{ labResult?.map((labResult, idx) => (
							<div className='flex items-center justify-between mt-[16px]' key={ idx }>
								<Text text={ labResult.date } fontSize='14px' fontWeight='400' />
								<div className='flex gap-[10px]'>
									<div>
										<Button
											theme={ 'outline' }
											$hoverTheme={ 'secondary' }
											label={ 'Download' }
											noPadding={ true }
											className='px-[8px] py-[10px] rounded-sm'
										/>
									</div>
									<div>
										<Button $hoverTheme='secondary' label={ 'Lihat Laporan' } noPadding={ true } className='px-[8px] py-[10px] rounded-sm' />
									</div>
								</div>
							</div>
						)) }
					</div>
					<div className='divider mt-[15px]'>
						<Text text={ 'Riwayat Imunisasi' } fontSize='14px' fontWeight='700' className='pt-[15px]' />
						{ labResult?.map((labResult, idx) => (
							<div className='mt-[10px] mb-[5px]' key={ idx }>
								<Text text={ labResult.name } fontWeight='400' fontSize='14px' className='mb-[5px]' />
								<Text text={ labResult.date } fontSize='12px' fontWeight='400' color={ colors.grey.darkOpacity } />
							</div>
						)) }
					</div>
				</div>
			</ModalStyle>
		</Modal>
	);
};

export default DetailKunjungan;