'use client';

import dayjs from 'dayjs';
import Image from 'next/image';

import { Modal, Text, Button } from '@/components/ui';
import { colors, icons } from '@/constant';
import { useScopedI18n } from '@/locales/client';
import { UserDataDetail } from '@/interface';
import { isMobile } from 'react-device-detect';

interface PropsType {
	visible?: boolean;
	onClose?: () => void;
	id?: string;
	patientName?: string;
	patientBirthDate?: string;
	patientPhone?: string;
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
			noPadding={ true }
			onClose={ props.onClose }
			containerClassName={ 'm-0 md:m-4 max-w-lg h-max md:h-max rounded-t-[12px] md:rounded-b-[12px]' }
		>
			<div className='p-4 lg:p-6'>
				<div>
					<div className='flex flex-row'>
						<Text
							text={ t('heading') }
							fontSize='24px'
							fontWeight='700'
							className='flex-1'
							subClassName='max-sm:text-base leading-normal sm:leading-7 max-sm:font-black'
						/>
					</div>
					<Text
						text={ t('warningText') }
						fontSize='14px'
						fontWeight='400'
						className='mt-2'
						color={ colors.grey.darkOpacity }
						subClassName='max-sm:text-xs leading-[18px] sm:leading-[21px]'
					/>

					<div className='mt-6 sm:mt-8 px-4 flex flex-col gap-2 sm:gap-3' >
						<Text
							text={ t('patientData.heading') }
							fontWeight='700'
							fontSize='14px'
							subClassName='leading-normal'
							className='max-sm:mb-1'
						/>
						<div className='grid grid-cols-[110px_auto] sm:grid-cols-[150px_auto]'>
							<Text
								text={ t('patientData.nameLabel') }
								fontWeight='500'
								fontSize='14px'
								subClassName='max-sm:text-xs leading-normal'
								color={ colors.grey.dark }
							/>
							<Text
								text={ props.patientName }
								fontWeight='700'
								fontSize='14px'
								subClassName='max-sm:text-xs leading-normal'
							/>
						</div>
						<div className='grid grid-cols-[110px_auto] sm:grid-cols-[150px_auto]'>
							<Text
								text={ t('patientData.dobLabel') }
								fontWeight='500'
								fontSize='14px'
								subClassName='max-sm:text-xs leading-normal'
								color={ colors.grey.dark }
							/>
							<Text
								text={ props.patientBirthDate ? dayjs(props?.patientBirthDate).format('DD MMMM YYYY') : '-' }
								fontWeight='700'
								fontSize='14px'
								subClassName='max-sm:text-xs leading-normal'
							/>
						</div>
						<div className='grid grid-cols-[110px_auto] sm:grid-cols-[150px_auto]'>
							<Text
								text={ t('patientData.phoneLabel') }
								fontWeight='500'
								fontSize='14px'
								subClassName='max-sm:text-xs leading-normal'
								color={ colors.grey.dark }
							/>
							<Text
								text={ props.patientPhone ?? '-' }
								fontWeight='700'
								fontSize='14px'
								subClassName='max-sm:text-xs leading-normal'
							/>
						</div>
					</div>

					<div className='flex gap-3 mt-6 mb-4 sm:my-8 bg-[#FAFAFA] p-4 rounded-[10px]'>
						<div className='relative overflow-hidden w-8 h-8 sm:w-12 sm:h-12 rounded-full flex-shrink-0'>
							<Image
								className='object-cover object-top'
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								alt=''
								src={ props.doctorImg || '/images/samples/default-avatar.jpg' }
								fill
							/>
						</div>
						<div className='flex flex-col w-full'>
							<Text
								text={ props.doctorName }
								fontSize='14px'
								fontWeight='700'
								lineHeight='21px'
							/>
							<Text
								text={ props.doctorSpec }
								className='mt-2'
								fontSize='14px'
								fontWeight='400'
								color={ colors.grey.darkOpacity }
								subClassName='max-sm:text-xs leading-normal'
							/>
							<div className='flex max-sm:flex-col sm:justify-between mt-3 pt-3 gap-4 sm:gap-2 border-t border-[#F0F2F9]'>
								<div>
									<Text
										text={ props.bookDate }
										fontSize='14px'
										fontWeight='700'
										subClassName='max-sm:text-xs leading-normal'
									/>
									<Text
										text={ t('patientData.consultationScheduleLabel') }
										className='mt-[10px]'
										fontSize='12px'
										fontWeight='400'
										color={ colors.grey.darkOpacity }
										subClassName='!text-xs !leading-normal'
									/>
								</div>
								<div>
									<Text
										text={ props.bookClinic }
										fontSize='14px'
										fontWeight='700'
										subClassName='max-sm:text-xs leading-normal'
									/>
									<Text
										text={ props.hospital }
										className='mt-[10px]'
										fontSize='12px'
										fontWeight='400'
										color={ colors.grey.darkOpacity }
										subClassName='!text-xs !leading-normal'
									/>
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
						className='!rounded-[5px] sm:!rounded-lg !py-2.5 !text-sm sm:!text-base sm:!font-medium'
					/>
				</div>
			</div>
		</Modal>
	);
};

export default ModalCancelBook;