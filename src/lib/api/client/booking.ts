import useSWRMutation from 'swr/mutation';
import fetcher, { ApiOptions } from '../utils/fetcher';
import { BookingPayload } from '@/interface';
import { PayloadPushNotification } from '@/interface/Notification';

export const useBookAppointmentAPI = (options?: ApiOptions) => {
	return useSWRMutation('createBooking', (key, { arg }: {arg:BookingPayload}) =>
		fetcher('bookAppointment', { ...options, body: arg })
	);
};

export const usePushNotifAPI = (options?: ApiOptions) => {
	return useSWRMutation('createPushNotif', (key, { arg }: {arg:PayloadPushNotification}) =>
		fetcher('pushNotification', { ...options, body: arg })
	);
};