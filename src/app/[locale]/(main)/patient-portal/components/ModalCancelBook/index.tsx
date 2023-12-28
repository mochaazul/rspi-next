'use client';

import dayjs from 'dayjs';
import Image from 'next/image';

import { Modal, Text, Button } from '@/components/ui';
import { colors, icons } from '@/constant';
import { useScopedI18n } from '@/locales/client';
import { UserDataDetail } from '@/interface';

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
	patientProfile: UserDataDetail;
}

const ModalCancelBook = (props: PropsType) => {
	const t = useScopedI18n('page.patientPortal.cancelBooking');

	return (
		<Modal
			visible={ props.visible }
			width='558px'
			noPadding={ true }
			onClose={ props.onClose }
		>
			<ModalStyle>
				<div>
					<div className='flex flex-row'>
						<Text text={ t('heading') } fontSize='24px' fontWeight='700' className='flex-1' />
					</div>
					<Text text={ t('warningText') } fontSize='14px' fontWeight='400' lineHeight='20px' className='mt-2' color={ colors.grey.darkOpacity } />

					<div className='mt-8 px-[16px] flex flex-col gap-[12px]' >
						<Text
							text={ t('patientData.heading') }
							fontWeight='700'
							fontSize='14px'
							lineHeight='20px'
						/>
						<div className='grid grid-cols-[150px_auto]'>
							<Text
								text={ t('patientData.nameLabel') }
								fontWeight='500'
								fontSize='14px'
								lineHeight='20px'
							/>
							<Text
								text={ props.patientProfile?.name }
								fontWeight='700'
								fontSize='14px'
								lineHeight='20px'
							/>
						</div>
						<div className='grid grid-cols-[150px_auto]'>
							<Text
								text={ t('patientData.dobLabel') }
								fontWeight='500'
								fontSize='14px'
								lineHeight='20px'
							/>
							<Text
								text={ props.birthDate ? dayjs(props.patientProfile?.birthdate).format('DD MMMM YYYY') : '-' }
								fontWeight='700'
								fontSize='14px'
								lineHeight='20px'
							/>
						</div>
						<div className='grid grid-cols-[150px_auto]'>
							<Text
								text={ t('patientData.phoneLabel') }
								fontWeight='500'
								fontSize='14px'
								lineHeight='20px'
							/>
							<Text
								text={ props.patientProfile?.phone ?? '-' }
								fontWeight='700'
								fontSize='14px'
								lineHeight='20px'
							/>
						</div>
					</div>

					<div className='flex my-8 bg-[#FAFAFA] p-4 rounded-[10px]'>
						<div className='relative overflow-hidden w-[60px] h-[60px] rounded-full flex-shrink-0'>
							<Image
								className='object-cover object-top'
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								alt=''
								src={ props.doctorImg || '/images/samples/default-avatar.jpg' }
								fill
							/>
						</div>
						<div className='ml-[15px]'>
							<Text text={ props.doctorName } fontSize='16px' fontWeight='700' />
							<Text text={ props.doctorSpec } className='mt-[10px]' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
							<div className='flex justify-between mt-[20px] gap-x-2'>
								<div>
									<Text text={ props.bookDate } fontSize='14px' fontWeight='700' />
									<Text text={ t('patientData.consultationScheduleLabel') } className='mt-[10px]' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
								</div>
								<div>
									<Text text={ props.bookClinic } fontSize='14px' fontWeight='700' />
									<Text text={ props.hospital } className='mt-[10px]' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
								</div>
							</div>
						</div>
					</div>
					<Button
						theme='primary'
						$hoverTheme='primary'
						themeColor={ colors.red.default }
						label={ t('patientData.btnSubmitLabel') }
						onClick={ props.onClickButtonCancelAppointment }
						className='!rounded-lg !py-2.5 !text-base !font-medium'
					/>
				</div>
			</ModalStyle>
		</Modal>
	);
};

export default ModalCancelBook;