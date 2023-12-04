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
