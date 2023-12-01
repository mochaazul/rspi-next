import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { ResponseStatus } from '@/interface';

import fetcher, { ApiOptions } from '../utils/fetcher';
import { BookCancelRequest } from '@/interface/Book';

export const useGetAppointmentList = (options?: ApiOptions) => {
	return useSWR(['appointmentList', options], ([key, apiOptions]) => fetcher<any[]>('appointmentList', apiOptions));
};

export const usePostCancelBookingMutation = (options?: ApiOptions) => {
	return useSWRMutation('cancelBooking', (key, { arg }: { arg: BookCancelRequest; }) => fetcher<ResponseStatus[]>('cancelBooking', { ...options, body: arg }));
};