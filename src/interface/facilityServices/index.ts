import { ResponseStatus } from '@/interface';

export interface FacilityServicesState {
	facilityServices: FacilityServicesDetail[];
	relatedNews: I_RelatedNews[];
	speciality?: FacilityServicesDetail;
	hospital: FacilityServicesDetail[];
	loading: boolean;
	error: ResponseStatus;
	available_at?: string[];
}

export interface I_RelatedNews {
	id: number,
	news_id: number;
	author: string;
	posted_date_news: string;
	short_description: string;
	title_news: string;
	image_url: string;
	slug: string;
}

export interface FacilityServicesHospital {
	id: number;
	facility_id?: number;
	hospital_code?: string;
	hospital_name?: string;
	hospital_phone?: string;
	hospital_email?: string;
	unit?: string;
	floor?: string;
	information?: string;
	operational_hour: string[];
}

export interface FacilityServicesDetail {
	id?: number;
	name?: string;
	short_description?: string;
	image_url?: string[];
	information?: string;
	is_publish?: boolean;
	is_home_page?: boolean;
	order_id?: number;
	unit?: string;
	floor?: string;
	hospital_phone?: string;
	hospital_name?: string;
	hospital_email?: string;
	hospital_code?: string;
	operational_hour?: string[];
	available_at?: string[];
	slug: string;
	facilities_hospitals?: FacilityServicesHospital[];
}

export interface PayloadFacilityServices {
	id?: number;
	name?: string;
	short_description?: string;
	image_url?: string[];
	information?: string;
	is_publish?: boolean;
	is_home_page?: boolean;
	order_id?: number;
}