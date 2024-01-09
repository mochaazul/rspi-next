'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import Link from 'next/link';

import { icons } from '@/constant';
import { Button, Spinner, Text } from '@/components/ui';
import { useGetVisitHistory } from '@/lib/api/client/hospital';
import { useScopedI18n } from '@/locales/client';
import useSession from '@/session/client';
import { UserDataDetail } from '@/interface';

import CardAppointment from '../CardAppointment';
import { EmptyResultContainer } from '../../style';

type RiwayatKunjunganProps = {
	patientProfile: UserDataDetail;
};

const RiwayatKunjungan = ({ patientProfile }: RiwayatKunjunganProps) => {
	const t = useScopedI18n('page.patientPortal');
	const session = useSession();

	const { data: visitHistoryResponse, error: visitHistoryError, isLoading: visitHistoryLoading } = useGetVisitHistory(session?.token);

	useEffect(() => {
		if (visitHistoryError) {
			toast.error(visitHistoryError?.message);
		}
	}, [visitHistoryError]);

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
			<div className='flex flex-col items-center gap-4 lg:gap-6'>
				<icons.EmptyVisitHistories className='w-[120px] h-[120px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px]' />
				<Text text={ t('riwayatKunjungan.empty') }
					fontSize='20px'
					fontWeight='700'
					lineHeight='28px'
					textAlign='center'
					subClassName='max-sm:text-sm max-sm:leading-normal'
				/>
			</div>
			<Link href={ '/find-a-doctor' } className='max-sm:mt-2'>
				<Button label={ t('riwayatKunjungan.btnConsultationSchedule') } className='w-auto whitespace-nowrap py-3 sm:py-[15px] px-10 max-sm:text-sm' />
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
						status='history'
						queueNo={ + visitHistory.q_number }
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
						patientProfile={ patientProfile }
						isHistory
					/>
				);
			}) }
		</>
	);
};

export default RiwayatKunjungan;