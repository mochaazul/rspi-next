'use client';

import Image from 'next/image';
import dayjs from 'dayjs';

import { icons } from '@/constant';
import Text from '@/components/ui/Text';
import { I_VisitHistory, ResponseType, UserDataDetail } from '@/interface';
import { useScopedI18n } from '@/locales/client';
import { getAge } from '@/helpers/getAge';
import { splitDate } from '@/helpers/datetime';
import CardUserStyle from './style';

type CardUserMRProps = {
	patientProfile?: ResponseType<UserDataDetail>;
	lastVisitedHospital?: I_VisitHistory;
};

const CardUserMR: React.FC<CardUserMRProps> = ({ patientProfile, lastVisitedHospital }) => {
	const t = useScopedI18n('page.profilePage');

	const renderCardUserWithMR = () => {
		return (
			<CardUserStyle>
				<div className='card-shadow p-4 lg:p-5 bg-white'>
					<div className='flex justify-between lg:justify-center lg:grid lg:grid-cols-4 lg:gap-4 lg:items-center'>
						<div className='flex items-center'>
							<div className='mr-4 lg:mr-[18px] relative overflow-hidden'>
								{ (patientProfile?.data?.img_url)
									? (
										<div className='flex-shrink-0 w-12 h-12 lg:w-[60px] lg:h-[60px] rounded-full relative overflow-hidden'>
											<Image
												src={ patientProfile?.data?.img_url }
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
									text={ patientProfile?.data?.name }
								/>
								<Text
									fontWeight='400'
									fontSize='14px'
									lineHeight='17px'
									className='capitalize'
									text={ patientProfile?.data?.birthdate && patientProfile?.data?.gender && `${ getAge(splitDate(patientProfile?.data?.birthdate)) }, ${ patientProfile?.data?.gender }` }
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
								text={ patientProfile?.data?.patient_code }
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
			</CardUserStyle>
		);
	};

	return renderCardUserWithMR();
};

export default CardUserMR;