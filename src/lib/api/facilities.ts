import { FacilityServicesDetail, FacilityServicesHospital, I_RelatedNews } from '@/interface';
import { MedicalSpecialities } from '@/interface/MedicalSpecialities';

import fetcher, { ApiOptions } from './utils/fetcher';

export const getFacilityServices = (param?: ApiOptions) => {
	return fetcher<FacilityServicesDetail[]>('facilities', { ...param, query: { ...param?.query, is_publish: true } });
};

export const getFacilityHospital = (options: ApiOptions) => {
	return fetcher<FacilityServicesHospital[]>('facilityHospital', options);
};

export const getFacilityRelatedNews = (param?: ApiOptions) => {
	return fetcher<I_RelatedNews[]>('newsFacilities', { ...param, query: { ...param?.query, is_publish: true } });
};

export const getMedicalSpecialities = (options: ApiOptions) => {
	return fetcher<MedicalSpecialities[]>('getFooter', options);
};