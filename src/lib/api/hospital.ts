import { HospitalDetail, I_VisitHistory } from '@/interface';
import fetcher, { ApiOptions } from './utils/fetcher';

export const getHospital = (param?: ApiOptions) => {
	return fetcher<HospitalDetail[]>('hospital', { ...param, query: { ...param?.query, is_active: true } });
};
export const getLastVisitHospital = () => {
	return fetcher<I_VisitHistory[]>('visitHistory');
};

export const getVisitHistory = () => {
	return fetcher<I_VisitHistory[]>('visitHistory');
};

export const getHospitalDetail = (options?: ApiOptions) => {
	return fetcher<HospitalDetail>('hospital', options);
};