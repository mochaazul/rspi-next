'use client';

import { useEffect } from 'react';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import Image from 'next/image';

import { Languages, icons } from '@/constant';
import { Button, Spinner, Text } from '@/components/ui';
import { useGetVisitHistory } from '@/lib/api/client/hospital';

import CardAppointment from '../CardAppointment';
import { EmptyResultContainer } from '../../style';

const { empty } = Languages.page.patientPortal.riwayatKunjungan;

const RiwayatKunjungan = () => {
	const { data: visitHistoryResponse, error: visitHistoryError, isLoading: visitHistoryLoading } = useGetVisitHistory();

	const sortVisitHistories = () => {
		return visitHistoryResponse?.data.slice().sort((a, b) => {
			const dateTimeA = dayjs(`${ a.visit_date } ${ a.visit_time }`).unix();
			const dateTimeB = dayjs(`${ b.visit_date } ${ b.visit_time }`).unix();
			return dateTimeB - dateTimeA;
		});
	};

	if (visitHistoryLoading) {
		return <div className='min-h-[250px] flex item-center'>
			<Spinner size='m' />
		</div>;
	}

	if (isEmpty(visitHistoryResponse?.data)) {
		return (<EmptyResultContainer>
			<icons.EmptyVisitHistories />
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
			{ sortVisitHistories()?.map(visitHistory => {

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