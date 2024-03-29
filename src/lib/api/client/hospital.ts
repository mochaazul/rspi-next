import useSWR from 'swr';

import { HospitalDetail, I_VisitHistory, I_LabResults, I_VaccineHistory } from '@/interface';

import fetcher, { ApiOptions } from '../utils/fetcher';

export const useGetHospital = () => {
	return useSWR('hospital', () => fetcher<HospitalDetail[]>('hospital'));
};

export const useGetVisitHistory = (key?: string) => {
	return useSWR(`visitHistories/${key ?? 'patient'}`, () => fetcher<I_VisitHistory[]>('visitHistory'), { shouldRetryOnError: false, revalidateOnMount: true });
};

export const useGetLabHistory = () => {
	return useSWR('labHistory', () => fetcher<I_LabResults[]>('labHistory'), { shouldRetryOnError: false });
};

export const useGetVaccineHistory = () => {
	return useSWR('vaccineHistory', () => fetcher<I_VaccineHistory[]>('vaccineHistory'));
};

export const useGetHospitalDetail = (options?: ApiOptions) => {
	return useSWR('hospital', () => fetcher<HospitalDetail>('hospital', options));
};