'use client';

import dayjs from 'dayjs';
import Image from 'next/image';

import { Modal, Text, Button } from '@/components/ui';
import { colors, icons } from '@/constant';
import { useGetProfile } from '@/lib/api/client/profile';
import { useScopedI18n } from '@/locales/client';
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
	const { data: getProfileResponse, isLoading: getProfileLoading } = useGetProfile(session?.token);
	const t = useScopedI18n('page.patientPortal.cancelBooking');

	return (
		<Modal
			visible={ props.visible }
			width='558px'
			noPadding={ true }
		>
			<ModalStyle>
				<div>
					<div className='flex flex-row'>
						<Text text={ t('heading') } fontSize='24px' fontWeight='700' className='flex-1' />
						<div onClick={ props.onClose } className='cursor-pointer'>
							<icons.Close />
						</div>
					</div>
					<Text text={ t('warningText') } fontSize='14px' fontWeight='400' className='mt-[10px]' color={ colors.grey.darkOpacity } />

					<div className='mt-[24px] px-[16px] flex flex-col gap-[12px]' >
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
								text={ getProfileResponse?.data?.name }
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
								text={ props.birthDate ? dayjs(getProfileResponse?.data?.birthdate).format('DD MMMM YYYY') : '-' }
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
								text={ getProfileResponse?.data?.phone ?? '-' }
								fontWeight='700'
								fontSize='14px'
								lineHeight='20px'
							/>
						</div>
					</div>

					<div className='flex my-[30px]'>
						<Image alt='' src={ props.doctorImg || '' } width={ 60 } height={ 60 } className='rounded-full h-[60px] w-[60px]' />
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
					<Button theme='primary' $hoverTheme='primary' themeColor='red' label={ t('patientData.btnSubmitLabel') } onClick={ props.onClickButtonCancelAppointment } />
				</div>
			</ModalStyle>
		</Modal>
	);
};

export default ModalCancelBook;