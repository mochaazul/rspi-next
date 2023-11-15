import { I_MasterDoctor } from '@/interface';
import fetcher, { ApiOptions } from './utils/fetcher';
import useSWRInfinite from 'swr/infinite';

export const getDoctors = (options?: ApiOptions) => {
	return fetcher<I_MasterDoctor[]>('masterDoctor', options);
};

export const useGetDoctors = (options?: ApiOptions) => {
	return useSWRInfinite(index => ['masterDoctor', options, index], ([key, apiOptions, index]) => fetcher<I_MasterDoctor[]>('masterDoctor', {
		...apiOptions,
		pagination: {
			...apiOptions?.pagination,
			page: index + 1
		}
	}));
};