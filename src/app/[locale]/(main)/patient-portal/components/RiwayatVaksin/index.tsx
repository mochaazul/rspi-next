'use client';

import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

import { Spinner, Text } from '@/components/ui';
import { colors, icons } from '@/constant';
import { useGetVaccineHistory } from '@/lib/api/client/hospital';
import { useScopedI18n } from '@/locales/client';

import { CardPatientPortalStyle, EmptyResultContainer } from '../../style';

const RiwayatVaksin = () => {
	const t = useScopedI18n('page.patientPortal.riwayatVaksin');

	const { data: vaccineHistoryResponse, error: vaccineHistoryError, isLoading: vaccineHistoryLoading } = useGetVaccineHistory();

	if (vaccineHistoryLoading) return (
		<Spinner />
	);

	if (isEmpty(vaccineHistoryResponse?.data)) {
		return (<EmptyResultContainer>
			<icons.NoVaccineResult />
			<Text text={ t('empty') }
				fontSize='20px'
				fontWeight='700'
				lineHeight='28px'
			/>
		</EmptyResultContainer>);
	}

	return (
		<>
			<CardPatientPortalStyle>
				<div className='table-wrapper' style={ { minHeight: '300px' } }>
					<table>
						<tr>
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
			<div className='warning-text mt-[20px]'>
				<Text
					text={ t('warning') }
					fontSize='16px'
					fontWeight='400'
					color={ colors.paradiso.default }
				/>
			</div>
		</>
	);
};

export default RiwayatVaksin;