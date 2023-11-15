import { HospitalDetail } from '@/interface';
import fetcher from './utils/fetcher';
import useSWR from 'swr';

export const getHospital = () => {
	return fetcher<HospitalDetail[]>('hospital');
};

export const useGetHospital = () => {
	return useSWR('hospital', () => fetcher<HospitalDetail[]>('hospital'));
};