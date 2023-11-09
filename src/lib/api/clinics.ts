import { I_ClinicsResponse } from '@/interface/specialities';
import fetcher from './utils/fetcher';

export const getClinics = () => {
	return fetcher<I_ClinicsResponse[]>('clinics');
};

export const getFacilitiesAndServices = () => {
	return fetcher('facilities');
};