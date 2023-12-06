import { Pagination, ResponseStatus } from '@/interface';

export interface HospitalState {
	hospitals: HospitalDetail[];
	detailHospital?: HospitalDetail;
	loading: boolean;
	error: ResponseStatus;
	pagination?: Pagination;
}

export interface HospitalDetail {
	id: number;
	hospital_code: string;
	name?: string;
	address?: string;
	phone?: string;
	email?: string;
	description?: string;
	embed_link?: string;
	share_link?: string;
	img_url?: string[];
	is_active?: boolean;
	created_date?: string;
	updated_date?: string;
	slug:	string
}

export interface PayloadHospital {
	id?: number;
	hospital_code?: string;
	name?: string;
	address?: string;
	phone?: string;
	email?: string;
	description?: string;
	embed_link?: string;
	share_link?: string;
	img_url?: string[];
	is_active?: boolean;
	created_date?: string;
	updated_date?: string;
}