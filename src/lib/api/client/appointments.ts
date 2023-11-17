import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import {
	ResponseStatus
} from '@/interface';

import fetcher, { ApiOptions } from '../utils/fetcher';

export const useGetAppointmentList = (options?: ApiOptions) => {
	return useSWR(['appointmentList', options], ([key, apiOptions]) => fetcher<any[]>('appointmentList', apiOptions));
};

export const usePostCancelBookingMutation = (options?: ApiOptions) => {
	return useSWRMutation('cancelBooking', (key, { arg }: { arg: { id: string; }; }) => fetcher<ResponseStatus[]>('cancelBooking', { ...options, param: `${ arg.id }` }));
};