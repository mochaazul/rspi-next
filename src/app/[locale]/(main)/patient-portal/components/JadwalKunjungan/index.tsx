'use client';

import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import Radio from '@/components/ui/Radio';
import { Button, Spinner, Text } from '@/components/ui';
import icons from '@/constant/icons';
import { useGetAppointmentList } from '@/lib/api/client/appointments';
import { useScopedI18n } from '@/locales/client';
import { UserDataDetail } from '@/interface';

import CardAppointment from '../CardAppointment';
import { EmptyResultContainer } from '../../style';

type JadwalKunjunganProps = {
	patientProfile: UserDataDetail;
};

const JadwalKunjungan = ({ patientProfile }: JadwalKunjunganProps) => {
	const t = useScopedI18n('page.patientPortal');

	const navigate = useRouter();

	const [bookType, setBookType] = useState('self');

	const { data: appointmentResponse, error: appointmentError, isLoading: appointmentLoading, isValidating } = useGetAppointmentList({
		query: { type: bookType },
	});

	useEffect(() => {
		if (appointmentError) {
			toast.error(appointmentError?.message);
		}
	}, [appointmentError]);

	return (
		<>
			<Radio onChange={ setBookType } value={ bookType } groupContainerClassname='md:divide-x md:divide-[#D0D5DD] gap-4 md:gap-0 mt-0 mb-4 md:mb-6'>
				<Radio.Option label={ t('jadwalKunjungan.options.0') } value={ 'self' } className='md:px-4 md:py-2.5' />
				<Radio.Option label={ t('jadwalKunjungan.options.1') } value={ 'other' } className='md:px-4 md:py-2.5' />
			</Radio>
			{
				!appointmentLoading || !isValidating
					? isEmpty(appointmentResponse?.data) ?
						<EmptyResultContainer>
							<div className='flex flex-col items-center gap-4 lg:gap-6'>
								<icons.NoAppointmentSchedule className='w-[120px] h-[120px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px]' />
								<Text
									text={ t('jadwalKunjungan.label.empty') }
									fontSize='20px'
									fontWeight='700'
									lineHeight='28px'
									textAlign='center'
								/>
							</div>
							<Button className='w-auto whitespace-nowrap py-3 sm:py-[15px] px-10 max-sm:text-sm' onClick={ () => navigate.push('/find-a-doctor') }>
								{ t('jadwalKunjungan.label.emptyBtnCta') }
							</Button>
						</EmptyResultContainer>
						: appointmentResponse?.data?.map((data, index) => (
							<div key={ index }>
								<CardAppointment
									id={ data.appointment_id }
									status='appointment'
									queueNo={ + data.q_number }
									type={ data.type }
									patientName={ bookType === 'other' ? data.patient_name : patientProfile?.name }
									isTelemedicine={ data.service === 'TEL' }
									doctorName={ data.full_name_doctor }
									doctorSpeciality={ data.specialty }
									doctorImgUrl={ data.doctor_photo }
									clinic_name={ data.clinic_name }
									hospital_name={ data.hospital_name }
									date={ data.book_date }
									time={ data.book_time }
									patientBirthDate={ bookType === 'other' ? data.patient_birthdate : patientProfile?.birthdate }
									patientPhone={ bookType === 'other' ? data.phone : patientProfile?.phone }
									visit_status={ data.app_status }
									patientProfile={ patientProfile }
								/>
							</div>
						))
					: <div className='min-h-[250px] flex item-center'>
						<Spinner size='m' />
					</div>
			}
		</>
	);
};

export default JadwalKunjungan;