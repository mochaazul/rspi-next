import { TimeSlot } from '@/interface/findDoctor';
import { Pagination, ResponseStatus } from '@/interface/network';

export interface AppointmentState {
	timeSlot: TimeSlot[],
	loading: boolean;
	error: ResponseStatus;
	pagination?: Pagination;
}

export interface BookCancelRequest {
	appointment_id: string;
}

export interface BlacklistPayload {
	mr_number: string;
	hospital_code: string;
	doctor_code: string;
}

export interface BlacklistResponse {
	is_blacklist: boolean,
	description_id: string;
	description_en: string;
}