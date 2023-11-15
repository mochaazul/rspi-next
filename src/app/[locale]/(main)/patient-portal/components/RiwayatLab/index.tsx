import { Button, Spinner, Text } from '@/components';
import { baseUrl } from '@/config';
import { Languages, colors, icons } from '@/constant';
import dayjs from 'dayjs';
import { useTypedSelector } from '@/hooks';
import { useAppAsyncDispatch } from '@/hooks/useAppDispatch';
import { PatientState } from '@/interface/PatientProfile';
import { isEmpty } from 'lodash';
import { CardPatientPortalStyle, EmptyResultContainer } from 'pages/PatientPortal/style';
import { useEffect } from 'react';
import { getLabResults } from '@/stores/PatientProfile';
import styled from 'styled-components';
import Image from 'next/image';

const LaporanBtn = styled.a`
	background-color: ${ colors.green.brandAccent };
	padding: 6px;
	color: white;
	border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: center;

	:hover{
		background-color: ${ colors.green.accent };
		color: ${ colors.green.brandAccent };
	}
	transition: all 150ms;
`;

const RiwayatLab = () => {
	const { tableMenuLable, warning, empty } = Languages.page.patientPortal.riwayatLab;
	const { labResults, loading } = useTypedSelector<PatientState>('patient');
	const getLabResultDispatch = useAppAsyncDispatch(getLabResults);

	useEffect(() => {
		getLabResultDispatch();
	}, []);

	if (loading) return (
		<Spinner />
	);
	if (isEmpty(labResults)) {
		return (<EmptyResultContainer>
			<Image src={icons.NoLabResult} alt="" />
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
							<th>{ tableMenuLable.date }</th>
							<th>{ tableMenuLable.hospital }</th>
							<th>{ tableMenuLable.doctor }</th>
							<th />
						</tr>
						{
							labResults.map((labResult, index) => (
								<tr key={ index }>
									<td>{ index + 1 }</td>
									<td>{ labResult.date ? dayjs(labResult.date).format('dddd D MMMM YYYY') : '-' }</td>
									<td>{ labResult.hospital || '-' }</td>
									<td>{ labResult.doctor || '-' }</td>
									<td>{
										<LaporanBtn href={ `${ baseUrl }/patients/patient-portal/lab-histories/pdf?$episode=${ labResult.episode }&lab_episode=${ labResult.lab_episode }` } target='_blank' rel='noreferrer' >{ tableMenuLable.viewReport }</LaporanBtn>
									}</td>
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

export default RiwayatLab;