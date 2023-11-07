import { Pagination, ResponseStatus } from 'interface/network';

export interface I_SpecialitiesResponse {
	id: number;
	specialty_code: string;
	speciality: string;
	created_date: string;
	updated_date: string;
}

export interface I_Specialities {
	id: number;
	specialty_code: string;
	speciality: string;
}

export interface I_SubSpecialities {
	id?: number;
	name?: string;
	sub_specialities?: string;
	description?: string;
	created_date?: string;
	updated_date?: string;
	speciality?: string;
	specialty_code?: string;
}

export interface I_SpecialitiesState {
	specialities: I_Specialities[];
	loading: boolean;
	error: ResponseStatus;
	pagination?: Pagination;
	clinics: I_Clinics[];
}

export interface I_Clinics {
	id: number;
	clinic_code: string;
	clinic_name: string;
}

export interface I_ClinicsResponse {
	id: number;
	clinic_code: string;
	clinic_name: string;
	created_date: string;
	updated_date: string;
}