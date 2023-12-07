'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';

import { icons } from '@/constant';
import Text from '@/components/ui/Text';
import { I_VisitHistory, ResponseType, UserDataDetail } from '@/interface';
import { useScopedI18n } from '@/locales/client';
import { getAge } from '@/helpers/getAge';
import { splitDate } from '@/helpers/datetime';
import { MedicalRecordReminder, Spinner } from '@/components/ui';

import CardUserStyle from './style';

type CardUserProps = {
	patientProfile?: UserDataDetail;
	lastVisitedHospital?: I_VisitHistory;
	isLoading?: boolean;
};

const CardUser: React.FC<CardUserProps> = ({
	patientProfile,
	lastVisitedHospital,
	isLoading
}) => {
	const t = useScopedI18n('page.profilePage');

	const isUserWithMR = useMemo(() => {
		return patientProfile?.no_mr && patientProfile?.mr_active;
	}, [patientProfile?.no_mr, patientProfile?.mr_active]);

	const setGender = () => {
		if (patientProfile?.gender?.toLowerCase() === 'male') {
			return t('gender.male');
		}

		if (patientProfile?.gender?.toLowerCase() === 'female') {
			return t('gender.female');
		}

		return '';
	};

	const renderCardUserWithMR = () => {
		return (
			<div className='card-shadow p-4 lg:p-5 bg-white'>
				<div className='flex justify-between lg:justify-center lg:grid lg:grid-cols-4 lg:gap-4 lg:items-center'>
					<div className='flex items-center'>
						<div className='mr-4 lg:mr-[18px] relative overflow-hidden'>
							{ (patientProfile?.img_url)
								? (
									<div className='flex-shrink-0 w-12 h-12 lg:w-[60px] lg:h-[60px] rounded-full relative overflow-hidden'>
										<Image
											src={ patientProfile?.img_url }
											alt=''
											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
											className='w-full h-full object-cover'
											fill
										/>
									</div>
								)
								: <icons.EmptyProfile className='flex-shrink-0 w-12 h-12 lg:w-[60px] lg:h-[60px]' />
							}
						</div>
						<div className='flex flex-col gap-1 lg:gap-y-2.5'>
							<Text
								fontWeight='700'
								fontSize='16px'
								lineHeight='19px'
								text={ patientProfile?.name }
							/>
							<Text
								fontWeight='400'
								fontSize='14px'
								lineHeight='17px'
								className='capitalize'
								text={ patientProfile?.birthdate && patientProfile?.gender && `${ getAge(splitDate(patientProfile?.birthdate)) }, ${ setGender() }` }
							/>
						</div>
					</div>
					<div className='flex flex-col gap-1 lg:gap-y-2.5'>
						<Text
							fontWeight='400'
							fontSize='14px'
							lineHeight='17px'
							subClassName='max-lg:text-center'
							text={ t('profileDetail.patientIdLabel') }
						/>
						<Text
							fontWeight='700'
							fontSize='16px'
							lineHeight='19px'
							subClassName='max-lg:text-center'
							text={ patientProfile?.patient_code }
						/>
					</div>
					<div className='max-lg:hidden flex flex-col gap-y-2.5'>
						<Text
							fontWeight='400'
							fontSize='14px'
							lineHeight='17px'
							text={ t('profileDetail.lastVisitedHospitalLabel') }
						/>
						<Text
							fontWeight='700'
							fontSize='16px'
							lineHeight='19px'
							text={ lastVisitedHospital?.hospital_name ?? '-' }
						/>
					</div>
					<div className='max-lg:hidden flex flex-col gap-y-2.5'>
						<Text
							fontWeight='400'
							fontSize='14px'
							lineHeight='17px'
							text={ t('profileDetail.lastVisitedDateLabel') }
						/>
						<Text
							fontWeight='700'
							fontSize='16px'
							lineHeight='19px'
							text={ lastVisitedHospital?.visit_date ? dayjs(lastVisitedHospital?.visit_date).format('DD MMM YYYY') : '-' }
						/>
					</div>
				</div>
				<div className='hidden pt-6 mt-6 border-t border-[#F0F2F9] max-lg:flex justify-between'>
					<div className='flex flex-col gap-1'>
						<Text
							fontWeight='400'
							fontSize='14px'
							lineHeight='17px'
							text={ t('profileDetail.lastVisitedHospitalLabel') }
							textAlign='center'
						/>
						<Text
							fontWeight='700'
							fontSize='16px'
							lineHeight='19px'
							text={ lastVisitedHospital?.hospital_name ?? '-' }
							textAlign='center'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<Text
							fontWeight='400'
							fontSize='14px'
							lineHeight='17px'
							text={ t('profileDetail.lastVisitedDateLabel') }
							textAlign='center'
						/>
						<Text
							fontWeight='700'
							fontSize='16px'
							lineHeight='19px'
							text={ lastVisitedHospital?.visit_date ? dayjs(lastVisitedHospital?.visit_date).format('DD MMM YYYY') : '-' }
							textAlign='center'
						/>
					</div>
				</div>
			</div>
		);
	};

	const renderComponent = () => {
		if (isLoading) {
			return (
				<div className='card-shadow p-4 lg:p-5 bg-white h-[140px] lg:h-[90px] flex items-center justify-center'>
					<Spinner />
				</div>
			);
		}

		if (isUserWithMR) return renderCardUserWithMR();

		return <MedicalRecordReminder isFloating={ false } />;
	};

	return (
		<CardUserStyle>
			{ renderComponent() }
		</CardUserStyle>
	);
};

export default CardUser;