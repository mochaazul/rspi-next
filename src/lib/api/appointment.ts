import { PatientState } from '@/interface';
import fetcher, { ApiOptions } from './utils/fetcher';
import useSWR from 'swr';

export const getAppointmentList = (options?: ApiOptions) => {
	return fetcher<any[]>('appointmentList', options);
};
export const useGetAppointmentList = (options?: ApiOptions) => {
	return useSWR(['appointmentList', options], ([key, apiOptions]) => fetcher<any[]>('appointmentList', apiOptions));
};