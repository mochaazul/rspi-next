import { ClinicResponse } from '@/interface/clinic';
import useSWR from 'swr';
import fetcher, { ApiOptions } from '../utils/fetcher';

export const useGetClinics = (option?: ApiOptions) => {
	return useSWR('get-clinics', () => fetcher<ClinicResponse[]>('clinics', option));
};