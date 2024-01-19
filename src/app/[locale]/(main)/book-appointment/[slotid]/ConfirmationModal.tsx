'use client';

import dayjs from 'dayjs';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';

import { useRouter } from 'next/navigation';

import { splitDate } from '@/helpers/datetime';
import {
	Button,
	Checkbox,
	Modal,
	Spinner,
	Text
} from '@/components/ui';

import { colors } from '@/constant';
import {
	FindDoctorDetail,
	ResponseType,
	UserDataDetail
} from '@/interface';

import { ConfirmationModalContainer } from './style';
import DoctorProfileWidget from './DoctorProfileWidget';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { guarantorOptions } from './BookingForm';

type Props = {
	visible: boolean,
	onClose: () => void;
	selectedProfile?: UserDataDetail;
	timeSlot?: any,
	penjamin?: string,
	namaAsuransi?: string;
	noAsuransi?: string;
	onConfirmed: () => void;
	loading?: boolean;
	loadingUploadPhoto?: boolean;
	doctorResponse?: ResponseType<FindDoctorDetail>;
};

export const ConfirmationModal = ({
	doctorResponse,
	visible,
	onClose,
	selectedProfile,
	timeSlot,
	penjamin,
	namaAsuransi,
	noAsuransi,
	onConfirmed,
	loading,
	loadingUploadPhoto
}: Props) => {

	const navigate = useRouter();
	const t = useScopedI18n('page.bookingAppointment.confirmationModal');
	const currentLang = useCurrentLocale();

	const [checked, setChecked] = useState<boolean>(false);

	const toProfilPage = () => {
		navigate.push('/user-information');
	};

	if (selectedProfile && selectedProfile.phone && timeSlot) {
		return <Modal
			paddingSm='24px'
			visible={ visible }
			onClose={ onClose }
			width='w-full'
			borderRadius={ '0px' }
			containerClassName={ `m-0 ${ isMobile && 'absolute bottom-0' } max-w-lg h-max md:h-max rounded-t-[12px] md:rounded-b-[12px]` }
		>
			<ConfirmationModalContainer>
				<Text
					text={ t('heading') }
					fontWeight='700'
					fontSize='24px'
					lineHeight='28px'
					subClassName='text-base md:text-[24px]'
				/>
				<Text
					text={ t('subHeading') }
					fontWeight='400'
					fontSize='14px'
					lineHeight='20px'
					color={ colors.grey.dark }
					subClassName='text-xs md:text-sm pt-[8px]'
				/>
				<div className='mt-[24px] px-[12px] flex flex-col gap-[12px]' >
					<Text
						text={ t('patientDetail.heading') }
						fontWeight='700'
						fontSize='14px'
						lineHeight='20px'
					/>
					<div className={ 'grid grid-cols-[110px_auto] sm:grid-cols-[150px_auto]' }>
						<Text
							text={ t('patientDetail.name') }
							fontWeight='500'
							fontSize='14px'
							lineHeight='20px'
							subClassName='text-xs md:text-sm'
						/>
						<Text
							text={ selectedProfile.name }
							fontWeight='700'
							fontSize='14px'
							lineHeight='20px'
							subClassName='text-xs md:text-sm'
						/>
					</div>
					<div className={ 'grid grid-cols-[110px_auto] sm:grid-cols-[150px_auto]' }>
						<Text
							text={ t('patientDetail.birthDate') }
							fontWeight='500'
							fontSize='14px'
							lineHeight='20px'
							subClassName='text-xs md:text-sm'
						/>
						<Text
							text={ dayjs(splitDate(selectedProfile.birthdate)).format('DD MMMM YYYY') }
							fontWeight='700'
							fontSize='14px'
							lineHeight='20px'
							subClassName='text-xs md:text-sm'
						/>
					</div>
					<div className={ 'grid grid-cols-[110px_auto] sm:grid-cols-[150px_auto]' }>
						<Text
							text={ t('patientDetail.phone') }
							fontWeight='500'
							fontSize='14px'
							lineHeight='20px'
							subClassName='text-xs md:text-sm'
						/>
						<Text
							text={ selectedProfile.phone }
							fontWeight='700'
							fontSize='14px'
							lineHeight='20px'
							subClassName='text-xs md:text-sm'
						/>
					</div>
					<div className={ 'grid grid-cols-[110px_auto] sm:grid-cols-[150px_auto]' }>
						<Text
							text={ t('patientDetail.email') }
							fontWeight='500'
							fontSize='14px'
							lineHeight='20px'
							subClassName='text-xs md:text-sm'
						/>
						<Text
							text={ selectedProfile.email }
							fontWeight='700'
							fontSize='14px'
							lineHeight='20px'
							subClassName='text-xs md:text-sm'
						/>
					</div>
					<div className={ 'grid grid-cols-[110px_auto] sm:grid-cols-[150px_auto]' }>
						<Text
							text={ t('patientDetail.guarantor') }
							fontWeight='500'
							fontSize='14px'
							lineHeight='20px'
							subClassName='text-xs md:text-sm'
						/>
						<Text
							text={ penjamin ? guarantorOptions[currentLang][penjamin] : '-' }
							className='capitalize'
							fontWeight='700'
							fontSize='14px'
							lineHeight='20px'
							subClassName='text-xs md:text-sm'
						/>
					</div>
					{
						penjamin === 'asuransi'
						&& <>
							<hr />
							<Text
								text={ t('insuranceDataLabel') }
								fontWeight='700'
								fontSize='14px'
								lineHeight='20px'
							/>
							<div className={ 'grid grid-cols-[110px_auto] sm:grid-cols-[150px_auto]' }>
								<Text
									text={ t('patientDetail.name') }
									fontWeight='500'
									fontSize='14px'
									lineHeight='20px'
									subClassName='text-xs md:text-sm'
								/>
								<Text
									text={ namaAsuransi ?? '-' }
									fontWeight='700'
									fontSize='14px'
									lineHeight='20px'
									subClassName='text-xs md:text-sm'
								/>
							</div>
							<div className={ 'grid grid-cols-[110px_auto] sm:grid-cols-[150px_auto]' }>
								<Text
									text={ t('insuranceNumber') }
									fontWeight='500'
									fontSize='14px'
									lineHeight='20px'
									subClassName='text-xs md:text-sm'
								/>
								<Text
									text={ noAsuransi ?? '-' }
									fontWeight='700'
									fontSize='14px'
									lineHeight='20px'
									subClassName='text-xs md:text-sm'
								/>
							</div>
						</>
					}
				</div>
				<DoctorProfileWidget doctorData={ doctorResponse?.data } timeSlot={ timeSlot } />

				<div className='my-[24px] flex items-center'>
					<Checkbox label={ t('toc') } onChange={ evt => {
						setChecked(evt.target.checked);
					} } />
				</div>
				<Button onClick={ onConfirmed } disabled={ !checked || loading } className='text-sm md:text-base' >
					{ loading || loadingUploadPhoto ? <Spinner /> : t('confirmBtnLabel') }
				</Button>
			</ConfirmationModalContainer>
		</Modal>;
	} else {
		return <Modal borderRadius='12px' visible={ visible } onClose={ onClose }>
			<ConfirmationModalContainer >
				<Text
					text={ t('profileIncompleteMsg') }
					fontWeight='700'
					fontSize='24px'
					lineHeight='28px'
					className='pb-2'
				/>
				<Text
					text={ t('redirectLabel') }
					fontWeight='400'
					fontSize='14px'
					lineHeight='20px'
					color={ colors.grey.dark }
					className='pb-4'
				/>
				<Button label={ t('redirectBtnLabel') } onClick={ toProfilPage } className='text-sm md:text-base' />
			</ConfirmationModalContainer>
		</Modal>;
	}

	return <></>;
};

export default ConfirmationModal;