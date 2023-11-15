import { I_ClinicsResponse } from '@/interface/specialities';
import { FacilityServicesState } from '@/interface';
import fetcher from './utils/fetcher';

export const getClinics = () => {
	return fetcher<I_ClinicsResponse[]>('clinics');
};

export const getFacilitiesAndServices = () => {
	return fetcher<FacilityServicesState>('facilities');
};