import fetcher, { ApiOptions } from './utils/fetcher';

export const getAppointmentList = (options?: ApiOptions) => {
	return fetcher<any[]>('appointmentList', options);
};