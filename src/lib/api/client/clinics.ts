import useSWR from 'swr';

import { ClinicResponse } from '@/interface/clinic';

import fetcher, { ApiOptions } from '../utils/fetcher';
import { HospitalDetail } from '@/interface';

// We need to add dependency of hospital detail since clinics dependant on it
export const useGetClinics = (dependency?: HospitalDetail[] | undefined, option?: ApiOptions) => {
	return useSWR(['get-clinics', dependency], () => fetcher<ClinicResponse[]>('clinics', option));
};