import useSWRMutation from 'swr/mutation';
import fetcher, { ApiOptions } from '../utils/fetcher';
import { BookingPayload } from '@/interface';

export const useBookAppointmentAPI = (options?: ApiOptions) => {
	return useSWRMutation('createBooking', (key, { arg }: {arg:BookingPayload}) =>
		fetcher('bookAppointment', { ...options, body: arg })
	);
};

// export const usePushNotifAPI = (options?: ApiOptions) => {
// 	return useSWRMutation('createPushNotif', (key, { arg }: {arg:}) =>
// 		fetcher('pushNotification', { ...options, body: arg })
// 	);
// };