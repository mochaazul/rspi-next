import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { ResponseStatus } from '@/interface';

import fetcher, { ApiOptions } from '../utils/fetcher';
import { BookCancelRequest } from '@/interface/Book';

export const useGetAppointmentList = (options?: ApiOptions) => {
	return useSWR(['appointmentList', options], ([key, apiOptions]) => {
		return fetcher<any[]>('appointmentList', apiOptions);
	}, { revalidateOnMount: true });
};

export const usePostCancelBookingMutation = (options?: ApiOptions) => {
	return useSWRMutation('cancelBooking', (key, { arg }: { arg: BookCancelRequest; }) => {
		return fetcher<ResponseStatus[]>('cancelBooking', { ...options, body: arg });
	});
};