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

	const { data: appointmentResponse, error: appointmentError, isLoading: appointmentLoading } = useGetAppointmentList({
		query: { type: bookType },
	});

	useEffect(() => {
		if (appointmentError) {
			toast.error(appointmentError?.message);
		}
	}, [appointmentError]);

	return (
		<>
			<Radio onChange={ setBookType } value={ bookType } >
				<Radio.Option label={ t('jadwalKunjungan.options.0') } value={ 'self' } />
				<Radio.Option label={ t('jadwalKunjungan.options.1') } value={ 'other' } />
			</Radio>
			{
				!appointmentLoading
					? isEmpty(appointmentResponse?.data) ?
						<EmptyResultContainer>
							<icons.NoAppointmentSchedule />
							<Text text={ t('jadwalKunjungan.label.empty') }
								fontSize='20px'
								fontWeight='700'
								lineHeight='28px'
							/>
							<Button className='w-52' onClick={ () => navigate.push('/find-a-doctor') }>
								{ t('jadwalKunjungan.label.emptyBtnCta') }
							</Button>
						</EmptyResultContainer>
						: appointmentResponse?.data?.map((data, index) => (
							<div key={ index }>
								<CardAppointment
									id={ data.appointment_id }
									status={ data.status }
									queueNo={ 24211 }
									type={ data.type }
									patientName={ data.patient_name }
									isTelemedicine={ data.service === 'TEL' }
									doctorName={ data.full_name_doctor }
									doctorSpeciality={ data.specialty }
									doctorImgUrl={ data.doctor_photo }
									clinic_name={ data.clinic_name }
									hospital_name={ data.hospital_name }
									date={ data.book_date }
									time={ data.book_time }
									patientBirthDate={ data.patient_birthdate }
									patientPhone={ data.patient_phone }
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