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
	location: string,
	adm_date: string,
	adm_time: string,
	visit_status: string,
	episode: string;
};

export interface PatientState {
	patientProfile: PatientProfile | Record<string, any>,
	lastVisitedHospital: LastVisitedHospital | Record<string, any>,
	loading: boolean;
	error: ResponseStatus;
	customMessage?: string;
	patientPhotoProfile: PatientUploadPhoto | Record<string, any>;
}

export type PatientUploadPhoto = {
	data: string,
	stat_msg: string,
};
