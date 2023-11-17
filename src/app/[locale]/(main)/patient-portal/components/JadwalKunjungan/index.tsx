'use client';

import { useState } from 'react';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Radio from '@/components/ui/Radio';
import { Button, Spinner, Text } from '@/components/ui';
import icons from '@/constant/icons';
import languages from '@/constant/languages';
import { useGetAppointmentList } from '@/lib/api/client/appointments';

import CardAppointment from '../CardAppointment';
import { EmptyResultContainer } from '../../style';

const JadwalKunjungan = () => {
	const navigate = useRouter();

	const [bookType, setBookType] = useState('self');

	const { data: appointmentResponse, error: appointmentError, isLoading: appointmentLoading } = useGetAppointmentList({
		query: { type: bookType },
	});

	return (
		<>
			<Radio onChange={ setBookType } value={ bookType } >
				<Radio.Option label={ 'Diri Sendiri' } value={ 'self' } />
				<Radio.Option label={ 'Orang Lain' } value={ 'other' } />
			</Radio>
			{
				!appointmentLoading
					? isEmpty(appointmentResponse?.data) ?
						<EmptyResultContainer>
							<icons.NoAppointmentSchedule />
							<Text text={ languages.page.patientPortal.jadwalKunjungan.label.empty }
								fontSize='20px'
								fontWeight='700'
								lineHeight='28px'
							/>
							<Button className='w-52' onClick={ () => navigate.push('/find-a-doctor') }>Jadwalkan Kunjungan</Button>
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