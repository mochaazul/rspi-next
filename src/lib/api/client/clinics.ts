import useSWR from 'swr';

import { ClinicResponse } from '@/interface/clinic';

import fetcher, { ApiOptions } from '../utils/fetcher';

export const useGetClinics = (option?: ApiOptions) => {
	return useSWR('get-clinics', () => fetcher<ClinicResponse[]>('clinics', option));
};