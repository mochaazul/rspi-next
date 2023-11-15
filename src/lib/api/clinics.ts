import { I_ClinicsResponse } from '@/interface/specialities';
import { FacilityServicesDetail,  Pagination, PayloadFacilityServices } from '@/interface';
import fetcher, { ApiOptions } from './utils/fetcher';
import { ClinicResponse } from '@/interface/clinic';
import useSWR from 'swr';

export const getClinics = (option?: ApiOptions) => {
	return fetcher<ClinicResponse[]>('clinics', option);
};

export const getFacilitiesAndServices = (query?: PayloadFacilityServices, pagination?: Pagination) => {
	return fetcher<FacilityServicesDetail[]>('facilities', { query, pagination });
};

export const useGetClinics = (option?: ApiOptions) => {
	return useSWR('get-clinics', () => fetcher<ClinicResponse[]>('clinics', option));
};