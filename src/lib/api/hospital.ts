import { HospitalDetail, I_VisitHistory } from '@/interface';
import fetcher from './utils/fetcher';
import useSWR from 'swr';

export const getHospital = () => {
	return fetcher<HospitalDetail[]>('hospital');
};
export const useGetHospital = () => {
	return useSWR('hospital', () => fetcher<HospitalDetail[]>('hospital'));
};

export const getLastVisitHospital = () => {
	return fetcher<I_VisitHistory[]>('visitHistory');
};
export const useGetLastVisitHospital = () => {
	return useSWR('visitHistory', () => fetcher<I_VisitHistory[]>('visitHistory'));
};
