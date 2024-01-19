'use client';

import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import { Spinner, Text } from '@/components/ui';
import { colors, icons } from '@/constant';
import { useGetVaccineHistory } from '@/lib/api/client/hospital';
import { useScopedI18n } from '@/locales/client';

import { CardPatientPortalStyle, EmptyResultContainer } from '../../style';

const RiwayatVaksin = () => {
	const t = useScopedI18n('page.patientPortal.riwayatVaksin');

	const { data: vaccineHistoryResponse, error: vaccineHistoryError, isLoading: vaccineHistoryLoading } = useGetVaccineHistory();

	useEffect(() => {
		if (vaccineHistoryError?.message?.toLowerCase() !== 'no medical record') {
			toast.error(vaccineHistoryError?.message);
		}
	}, [vaccineHistoryError?.message]);

	if (vaccineHistoryLoading) return (
		<Spinner />
	);

	if (isEmpty(vaccineHistoryResponse?.data)) {
		return (<EmptyResultContainer>
			<icons.NoVaccineResult className='w-[120px] h-[120px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px]' />
			<Text text={ t('empty') }
				fontSize='20px'
				fontWeight='700'
				lineHeight='28px'
				textAlign='center'
				subClassName='max-sm:text-sm max-sm:leading-normal'
			/>
		</EmptyResultContainer>);
	}

	return (
		<>
			<CardPatientPortalStyle>
				<div className='min-h-[300px] lg:px-[15px] lg:py-[10px]'>
					<table>
						<tr className='border-b border-[#EAEAEA]'>
							<th>No</th>
							<th>{ t('tableMenuLable.vaccineType') }</th>
							<th>{ t('tableMenuLable.vaccineName') }</th>
							<th>{ t('tableMenuLable.vaccineDate') }</th>
						</tr>
						{
							vaccineHistoryResponse?.data.map((history, index) => (
								<tr key={ index }>
									<td>{ index + 1 }</td>
									<td>{ history.vaccination_disease }</td>
									<td>{ history.vaccine_name || '-' }</td>
									<td>{ history.administered_date ? dayjs(history.administered_date).format('D MMMM YYYY') : '-' }</td>
								</tr>
							))
						}
					</table>
				</div>

			</CardPatientPortalStyle>
			<div className='warning-text'>
				<Text
					text={ t('warning') }
					fontSize='16px'
					fontWeight='400'
					color={ colors.paradiso.default }
					subClassName='max-sm:text-xs max-sm:leading-[18px]'
				/>
			</div>
		</>
	);
};

export default RiwayatVaksin;