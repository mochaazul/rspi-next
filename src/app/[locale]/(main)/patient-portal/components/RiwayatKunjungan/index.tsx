'use client';

import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import Link from 'next/link';

import { icons } from '@/constant';
import { Button, Spinner, Text } from '@/components/ui';
import { useGetVisitHistory } from '@/lib/api/client/hospital';
import { useScopedI18n } from '@/locales/client';
import useSession from '@/session/client';

import CardAppointment from '../CardAppointment';
import { EmptyResultContainer } from '../../style';

const RiwayatKunjungan = () => {
	const t = useScopedI18n('page.patientPortal');
	const session = useSession();

	const { data: visitHistoryResponse, error: visitHistoryError, isLoading: visitHistoryLoading } = useGetVisitHistory(session?.token);

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
			<Text text={ t('riwayatKunjungan.empty') }
				fontSize='20px'
				fontWeight='700'
				lineHeight='28px'
			/>
			<Link href={ '/find-a-doctor' }>
				<Button label={ t('riwayatKunjungan.btnConsultationSchedule') } className='w-[200px]' />
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
						status={ t('riwayatKunjungan.label.doneAppointment') }
						queueNo={ 24211 }
						type='other'
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