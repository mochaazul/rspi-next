import { HospitalDetail, I_VisitHistory } from '@/interface';
import fetcher from '../utils/fetcher';
import useSWR from 'swr';

export const useGetHospital = () => {
	return useSWR('hospital', () => fetcher<HospitalDetail[]>('hospital'));
};

export const useGetLastVisitHospital = () => {
	return useSWR('visitHistory', () => fetcher<I_VisitHistory[]>('visitHistory'));
};