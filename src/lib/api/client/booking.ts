import useSWRMutation from 'swr/mutation';
import fetcher, { ApiOptions } from '../utils/fetcher';
import { BookingPayload, I_AppointmentPayload } from '@/interface';

export const useBookAppointmentAPI = (options?: ApiOptions) => {
	return useSWRMutation('createBooking', (key, { arg }: {arg:BookingPayload}) =>
		fetcher('bookAppointment', { ...options, body: arg })
	);
};
