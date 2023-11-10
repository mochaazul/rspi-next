import { FacilityServicesDetail, I_RelatedNews } from '@/interface';
import { MedicalSpecialities } from '@/interface/MedicalSpecialities';

import fetcher, { ApiOptions } from './utils/fetcher';

export const getFacilityServices = (options: ApiOptions) => {
	return fetcher<FacilityServicesDetail[]>('facilities', options);
};

export const getFacilityHospital = (options: ApiOptions) => {
	return fetcher<FacilityServicesDetail[]>('facilityHospital', options);
};

export const getFacilityRelatedNews = (options: ApiOptions) => {
	return fetcher<I_RelatedNews[]>('newsFacilities', options);
};

export const getMedicalSpecialities = (options: ApiOptions) => {
	return fetcher<MedicalSpecialities[]>('getFooter', options);
};