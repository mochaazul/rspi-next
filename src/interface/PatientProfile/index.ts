import { ResponseStatus } from 'interface/network';

export type PatientProfile = {
	id: number,
	patient_code: string,
	name: string,
	email: string,
	phone: string,
	birthdate: string,
	gender: string,
	no_mr: string,
	img_url: string,
	is_verified: string,
	created_date: string,
	updated_date: string,
	deleted_date: string;
};

export type LastVisitedHospital = {
	rowid: number,
	docttor_name: string,
	doctor_speciality: string,
	ku_dewasa: string,
	hospital_desc: string,
	hospital_name?: string;
	visit_date?: string;
	location: string,
	adm_date: string,
	adm_time: string,
	visit_status: string,
	episode: string;
};

export type I_VaccineHistory = {
	vaccination_disease: string,
	administered_date: string,
	notes: string,
	vaccine_name: string;
};

export type I_LabResults = {
	hospital: string;
	doctor: string;
	date: string;
	lab_episode: string;
	episode: string;
	url: string;
};

export type I_VisitHistory = {
	appointment_id: string;
	doctor_name: string;
	doctor_specialty: string;
	visit_type: string;
	hospital_name: string;
	clinic_name: string;
	visit_date: string;
	visit_time: string;
	visit_status: string;
	episode: string;
	doctor_photo: string;
	doctor_code: string;
	q_number: string;
	service: string;
};

export interface PatientState {
	patientProfile: PatientProfile | Record<string, any>,
	lastVisitedHospital: LastVisitedHospital | Record<string, any>,
	loading: boolean;
	error: ResponseStatus;
	customMessage?: string;
	patientPhotoProfile: PatientUploadPhoto | Record<string, any>;
	vacineHistory: I_VaccineHistory[];
	labResults: I_LabResults[],
	appointments: any[];
	visitHistories: I_VisitHistory[];
}

export type PatientUploadPhoto = {
	data: string,
	stat_msg: string,
};

export type GiveRatingDoctorPayload = {
	doctor_code: string,
	question_1: string;
	question_2: string[];
	question_3: string;
	username: string;
};