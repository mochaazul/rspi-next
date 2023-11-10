import { I_ClinicsResponse } from '@/interface/specialities';
import { FacilityServicesDetail, FacilityServicesState, Pagination, PayloadFacilityServices } from '@/interface';
import fetcher from './utils/fetcher';
import { ClinicResponse } from '@/interface/clinic';

export const getClinics = () => {
	return fetcher<ClinicResponse[]>('clinics');
};

export const getFacilitiesAndServices = (query?: PayloadFacilityServices, pagination?: Pagination) => {
	return fetcher<FacilityServicesDetail[]>('facilities', { query, pagination });
};