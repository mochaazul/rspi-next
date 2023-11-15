import { I_MasterDoctor } from '@/interface';
import fetcher, { ApiOptions } from './utils/fetcher';
import useSWR from 'swr';

export const getDoctors = (options?: ApiOptions) => {
	return fetcher<I_MasterDoctor[]>('masterDoctor', options);
};

export const useGetDoctors = (options?: ApiOptions) => {
	return useSWR(['masterDoctor', options], ([key, apiOptions]) => fetcher<I_MasterDoctor[]>('masterDoctor', apiOptions));
};