import { FacilityServicesDetail, Pagination, PayloadFacilityServices } from '@/interface';
import fetcher, { ApiOptions } from './utils/fetcher';
import { ClinicResponse } from '@/interface/clinic';

export const getClinics = (option?: ApiOptions) => {
	return fetcher<ClinicResponse[]>('clinics', option);
};

export const getFacilitiesAndServices = (query?: PayloadFacilityServices, pagination?: Pagination) => {
	return fetcher<FacilityServicesDetail[]>('facilities', { query, pagination });
};