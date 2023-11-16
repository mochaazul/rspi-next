import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
import Image from 'next/image';

import { Spinner, Text } from '@/components/ui';
import { Languages, colors, icons } from '@/constant';
import { useTypedSelector } from '@/hooks';
import { PatientState } from '@/interface/PatientProfile';
import { getVaccineHistory } from '@/stores/PatientProfile';
import { useAppAsyncDispatch } from '@/hooks/useAppDispatch';

import { CardPatientPortalStyle, EmptyResultContainer } from '../../style';

const RiwayatVaksin = () => {
	const { tableMenuLable, warning, empty } = Languages.page.patientPortal.riwayatVaksin;
	const { vacineHistory, loading } = useTypedSelector<PatientState>('patient');
	const getVaccineDispatch = useAppAsyncDispatch(getVaccineHistory);

	useEffect(() => {
		getVaccineDispatch();
	}, []);

	if (loading) return (
		<Spinner />
	);

	if (isEmpty(vacineHistory)) {
		return (<EmptyResultContainer>
			<icons.NoVaccineResult />
			<Text text={ empty }
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
							<th>{ tableMenuLable.vaccineType }</th>
							<th>{ tableMenuLable.vaccineName }</th>
							<th>{ tableMenuLable.vaccineDate }</th>
						</tr>
						{
							vacineHistory.map((history, index) => (
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
					text={ warning }
					fontSize='16px'
					fontWeight='400'
					color={ colors.paradiso.default }
				/>
			</div>
		</>
	);
};

export default RiwayatVaksin;