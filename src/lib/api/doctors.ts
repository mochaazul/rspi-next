import { FindDoctorDetail, I_MasterDoctor } from '@/interface';
import fetcher, { ApiOptions } from './utils/fetcher';

export const getDoctors = (options?: ApiOptions) => {
	return fetcher<I_MasterDoctor[]>('masterDoctor', options);
};

export const getDoctorDetail = (options?: ApiOptions) => {
	return fetcher<FindDoctorDetail>('doctorSchedule', options);
};