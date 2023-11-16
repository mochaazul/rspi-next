import { DoctorCalendar, FindDoctorDetail, I_MasterDoctor, TimeSlot } from '@/interface';
import fetcher, { ApiOptions } from './utils/fetcher';
import useSWRInfinite from 'swr/infinite';
import useSWR from 'swr';

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

export const useGetDoctorDetail = (options?: ApiOptions) => {
	return useSWR('masterDoctor', () => fetcher<FindDoctorDetail>('doctorSchedule', options));
};

export const useGetDoctorCalendar = (startDate:string, hospital?:string, options?: ApiOptions) => {
	// validation to prevent prefetching without proper params
	// if the swr key is null it wont send a request
	return useSWR(hospital ? `doctorCalendar/${startDate}` : null, () => fetcher<DoctorCalendar[]>('doctorCalendar', options));
};

export const useGetDoctorSlot = (options?: ApiOptions) => {
	return useSWR('doctorTimeSlot', () => fetcher<TimeSlot[]>('doctorTimeSlot', options));
};