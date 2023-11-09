import { HospitalDetail } from '@/interface';
import fetcher from './utils/fetcher';

export const getHospital = () => {
	return fetcher<HospitalDetail[]>('hospital');
};