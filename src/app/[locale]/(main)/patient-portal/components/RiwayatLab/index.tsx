'use client';

import dayjs from 'dayjs';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import { Spinner, Text } from '@/components/ui';
import { baseUrl } from '@/config';
import { Languages, colors, icons } from '@/constant';
import { useGetLabHistory } from '@/lib/api/client/hospital';

import { CardPatientPortalStyle, EmptyResultContainer } from '../../style';

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

	const { data: labHistoryResponse, error: labHistoryError, isLoading: labHistoryLoading } = useGetLabHistory();

	if (labHistoryLoading) return (
		<Spinner />
	);
	if (isEmpty(labHistoryResponse?.data)) {
		return (<EmptyResultContainer>
			<icons.NoLabResult />
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
							labHistoryResponse?.data.map((labResult, index) => (
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