import { useAppDispatch, useTypedSelector } from '@/hooks';
import CardAppointment from '../CardAppointment';
import { getVisitHistories } from '@/stores/PatientProfile';
import { useEffect } from 'react';
import { PatientState } from '@/interface/PatientProfile';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { EmptyResultContainer } from 'pages/PatientPortal/style';
import { Languages, icons } from '@/constant';
import { Button, Spinner, Text } from '@/components/ui';
import Link from 'next/link';
import Image from 'next/image';

const { empty } = Languages.page.patientPortal.riwayatKunjungan;

const RiwayatKunjungan = () => {

	const getVisitHistoriesDispatch = useAppDispatch(getVisitHistories);
	const { visitHistories, loading } = useTypedSelector<PatientState>('patient');

	useEffect(() => {
		getVisitHistoriesDispatch();
	}, []);

	const sortVisitHistories = () => {
		return visitHistories.slice().sort((a, b) => {
			const dateTimeA = dayjs(`${ a.visit_date } ${ a.visit_time }`).unix();
			const dateTimeB = dayjs(`${ b.visit_date } ${ b.visit_time }`).unix();
			return dateTimeB - dateTimeA;
		});
	};

	if (loading) {
		return <div className='min-h-[250px] flex item-center'>
			<Spinner size='m' />
		</div>;
	}

	if (isEmpty(visitHistories)) {
		return (<EmptyResultContainer>
			<Image src={ icons.EmptyVisitHistories } alt="" />
			<Text text={ empty }
				fontSize='20px'
				fontWeight='700'
				lineHeight='28px'
			/>
			<Link href={ '/find-a-doctor' }>
				<Button label='Jadwalkan Konsultasi' className='w-[200px]' />
			</Link>
		</EmptyResultContainer>);
	}

	return (
		<>
			{ sortVisitHistories().map(visitHistory => {

				return (
					<CardAppointment
						key={ visitHistory.appointment_id }
						id={ visitHistory.appointment_id }
						status='Jadwal Selesai'
						queueNo={ 24211 }
						type='others'
						isTelemedicine={ false }
						data={ visitHistory }
						date={ visitHistory.visit_date }
						time={ visitHistory.visit_time }
						doctorName={ visitHistory.doctor_name }
						doctorImgUrl={ visitHistory.doctor_photo }
						doctorSpeciality={ visitHistory.doctor_specialty }
						clinic_name={ visitHistory.clinic_name }
						hospital_name={ visitHistory.hospital_name }
						visit_status={ visitHistory.visit_status }
						doctor_id={ visitHistory.doctor_code }
						isHistory
					/>
				);
			}) }
		</>
	);
};

export default RiwayatKunjungan;