import { HospitalDetail, I_VisitHistory } from '@/interface';
import fetcher from './utils/fetcher';

export const getHospital = () => {
	return fetcher<HospitalDetail[]>('hospital');
};
export const getLastVisitHospital = () => {
	return fetcher<I_VisitHistory[]>('visitHistory');
};

