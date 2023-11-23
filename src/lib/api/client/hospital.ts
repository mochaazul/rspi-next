import useSWR from 'swr';

import { HospitalDetail, I_VisitHistory, I_LabResults, I_VaccineHistory } from '@/interface';

import fetcher from '../utils/fetcher';

export const useGetHospital = () => {
	return useSWR('hospital', () => fetcher<HospitalDetail[]>('hospital'));
};

export const useGetVisitHistory = () => {
	return useSWR('visitHistory', () => fetcher<I_VisitHistory[]>('visitHistory'), { shouldRetryOnError: false });
};

export const useGetLabHistory = () => {
	return useSWR('labHistory', () => fetcher<I_LabResults[]>('labHistory'), { shouldRetryOnError: false });
};

export const useGetVaccineHistory = () => {
	return useSWR('vaccineHistory', () => fetcher<I_VaccineHistory[]>('vaccineHistory'), { shouldRetryOnError: false });
};