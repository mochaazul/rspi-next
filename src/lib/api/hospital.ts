import { HospitalDetail } from '@/interface';
import fetcher from './utils/fetcher';
import useSWR from 'swr';

export const getHospital = () => {
	return fetcher<HospitalDetail[]>('hospital');
};
