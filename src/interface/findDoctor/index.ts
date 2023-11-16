import { PickerItem } from '@/components/ui/DropdownSearch';
import { Pagination, ResponseStatus } from '@/interface';

export interface FindDoctorState {
	doctor: FindDoctorDetail[];
	masterDoctors: I_MasterDoctor[];
	loading: boolean;
	error: ResponseStatus;
	pagination: Pagination;
	detail?: FindDoctorDetail;
	doctorListDropdown: I_DoctorListDropdown[];
	selectedDoctorTimeSlot: TimeSlot[];
	timeSlotLoading: boolean,
	doctorCalendar: DoctorCalendar[];
	doctorCalendarLoading: boolean;
}

export interface DoctorCalendar {
	hospital_name: string;
	hospital_code: string;
	doctor_name: string;
	doctor_code: string;
	clinic: string;
	clinic_code: string;
	date_schedule: string;
	day: string;
	seasion: string;
	service: string;
	status: string;
}
export interface DoctorTimeSlotParam {
	doctor_code?: string;
	hospital_code?: string;
	clinic_code?: string;
	day?: string;
	service?: string;
}

export interface DoctorTimeSlot {
	day: string;
	sess_row_id: string;
	room_code: string;
	date: string;
	time_slot: TimeSlot[];
}

export interface TimeSlot {
	slot_id: string,
	available: true,
	doctor_code: string,
	hospital_code: string,
	clinic_code: string,
	date: string,
	session_app_start: string;
}
export interface FindDoctorDetail {
	id: number;
	name: string;
	speciality: string;
	schedule: number;
	img_url: string;
	specialty: string[];
	clinic: [{
		clinic_code: string;
		clinic_name: string;
	}];
	hospital: [{
		hospital_code: string;
		hospital_name: string;
	}];
}

export interface I_MasterDoctorParams {
	id?: number,
	hospital?: string,
	keyword?: string,
	specialty?: string,
	// KURANG PREFERED DAY
}
export interface I_MasterDoctor {
	full_name_doctor: string;
	doctor_name: string;
	doctor_code: string;
	img_url: string;
	specialty: string;
	sub_specialty: string;
	doctor_schedule: I_MasterDoctorSchedule[];
}

export interface I_DoctorListDropdown {
	id: number,
	doctor_full_name: string;
	doctor_code: string,
	speciality: string,
	sub_speciality: string;
}
export interface I_MasterDoctorSchedule {
	clinics: I_MasterDoctorClinic[];
	hospital: string;
	hospital_code: string;
}
export interface I_MasterDoctorClinic {
	clinic_name: string;
	schedules: I_MasterDoctorClinicSchedule[];

}
export interface I_MasterDoctorClinicSchedule {
	day: string;
	time_from: string;
	time_to: string;
}

export interface PayloadFindDoctor {
	id?: number;
	name?: string;
	speciality?: string;
	schedule?: string;
	hospital?: string;
	clinic?: string;
}

export type FindADoctorType = {
	doctorName: string;
	hospital: string;
	speciality: string[];
	preferredDay: string;
};

export type I_DoctorFilter = {
	preferedDay: string,
	hospital: I_HospitalFilterItem[];
	specialty: PickerItem[];
	telemedicine: boolean;
};

export type I_HospitalFilterItem = {
	id: number,
	hospital_code: string;
};
