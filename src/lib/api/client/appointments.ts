import fetcher, { ApiOptions } from '../utils/fetcher';
import useSWR from 'swr';

export const useGetAppointmentList = (options?: ApiOptions) => {
	return useSWR(['appointmentList', options], ([key, apiOptions]) => fetcher<any[]>('appointmentList', apiOptions));
};