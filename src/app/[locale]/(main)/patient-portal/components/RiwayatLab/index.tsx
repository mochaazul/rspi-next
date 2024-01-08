'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import { Spinner, Text } from '@/components/ui';
import { baseUrl } from '@/config';
import { colors, fonts, icons } from '@/constant';
import { useGetLabHistory } from '@/lib/api/client/hospital';
import { useScopedI18n } from '@/locales/client';
import useSession from '@/session/client';

import { CardPatientPortalStyle, EmptyResultContainer } from '../../style';

const LaporanBtn = styled.a`
	background-color: ${ colors.green.brandAccent };
	padding: 6px;
	color: white;
	border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover{
		opacity: 0.9;
	}
	transition: all 150ms;
	font-family: ${ fonts.lato }, Arial, sans-serif;

	@media screen and (max-width: 640px) {
		border-radius: 100%;
	}
`;

const RiwayatLab = () => {
	const t = useScopedI18n('page.patientPortal.riwayatLab');

	const cookies = useSession();

	const { data: labHistoryResponse, error: labHistoryError, isLoading: labHistoryLoading } = useGetLabHistory();

	useEffect(() => {
		if (labHistoryError) {
			toast.error(labHistoryError?.message);
		}
	}, [labHistoryError]);

	if (labHistoryLoading) return (
		<Spinner />
	);
	if (isEmpty(labHistoryResponse?.data)) {
		return (<EmptyResultContainer>
			<icons.NoLabResult className='w-[120px] h-[120px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px]' />
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
				<div className='min-h-[300px] lg:px-[15px] lg:py-[10px]'>
					<table>
						<tr className='border-b border-[#EAEAEA]'>
							<th>No</th>
							<th>{ t('tableMenuLable.date') }</th>
							<th>{ t('tableMenuLable.hospital') }</th>
							<th>{ t('tableMenuLable.doctor') }</th>
							<th />
						</tr>
						{
							labHistoryResponse?.data.map((labResult, index) => (
								<tr key={ index }>
									<td>{ index + 1 }</td>
									<td>{ labResult.date ? dayjs(labResult.date).format('dddd D MMMM YYYY') : '-' }</td>
									<td>{ labResult.hospital || '-' }</td>
									<td>{ labResult.doctor || '-' }</td>
									<td>{ <LaporanBtn href={ `${ baseUrl }/patients/patient-portal/lab-histories/pdf?episode=${ labResult.episode }&lab_episode=${ labResult.lab_episode }&token=${ cookies.token }` } target='_blank' rel='noreferrer' >
										<span className='max-sm:hidden'>
											{ t('tableMenuLable.viewReport') }
										</span>
										<span className='sm:hidden'>
											<icons.Download />
										</span>
									</LaporanBtn> }</td>
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

export default RiwayatLab;