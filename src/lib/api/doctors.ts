import { DoctorCalendar, FindDoctorDetail, I_MasterDoctor, TimeSlot } from '@/interface';
import fetcher, { ApiOptions } from './utils/fetcher';
import useSWRInfinite from 'swr/infinite';
import useSWR from 'swr';

export const getDoctors = (options?: ApiOptions) => {
	return fetcher<I_MasterDoctor[]>('masterDoctor', options);
};
