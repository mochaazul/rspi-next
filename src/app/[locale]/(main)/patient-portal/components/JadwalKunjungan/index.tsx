import Radio from '@/components/Radio';
import CardAppointment from '../CardAppointment';
import { useEffect, useState } from 'react';
import { useAppAsyncDispatch } from '@/hooks/useAppDispatch';
import { getAppointmentList } from '@/stores/PatientProfile';
import { useTypedSelector } from '@/hooks';
import { PatientState } from '@/interface/PatientProfile';
import { isEmpty } from 'lodash';
import { Button, Spinner, Text } from '@/components';
import { EmptyResultContainer } from 'pages/PatientPortal/style';
import icons from '@/constant/icons';
import { useRouter } from 'next/navigation';
import languages from '@/constant/languages';
import Image from 'next/image';

const JadwalKunjungan = () => {
	const navigate = useRouter();

	const [bookType, setBookType] = useState('self');

	const { appointments, loading } = useTypedSelector<PatientState>('patient');

	const getAppointmentsDispatch = useAppAsyncDispatch(getAppointmentList);

	useEffect(() => {
		getAppointmentsDispatch({ queryParam: { type: bookType } });
	}, [bookType]);

	return (
		<>
			<Radio onChange={ setBookType } value={ bookType } >
				<Radio.Option label={ 'Diri Sendiri' } value={ 'self' } />
				<Radio.Option label={ 'Orang Lain' } value={ 'other' } />
			</Radio>
			{
				!loading

					? isEmpty(appointments) ?
						<EmptyResultContainer>
							<Image src={ icons.NoAppointmentSchedule } alt="" />
							<Text text={ languages.page.patientPortal.jadwalKunjungan.label.empty }
								fontSize='20px'
								fontWeight='700'
								lineHeight='28px'
							/>
							<Button className='w-52' onClick={ () => navigate.push('/find-a-doctor') }>Jadwalkan Kunjungan</Button>
						</EmptyResultContainer>
						: appointments?.map((data, index) => (
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