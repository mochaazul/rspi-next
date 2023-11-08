import { Pagination, ResponseStatus } from '@/interface';

export interface EventClassesState {
	events: EventClassesDetail[];
	selectedEvent?: EventClassesDetail;
	loading: boolean;
	error: ResponseStatus;
	pagination?: Pagination;
}

export interface EventClassesDetail {
	category: string;
	content: string;
	created_date: string;
	hospitals?: {
		id?: number;
		address?: string;
		hospital_code?: string;
		hospital_name: string;
		phone?: string;
	}[];
	id: number;
	img_url_card: string;
	img_url_detail: string;
	information: string;
	is_publish: boolean;
	operational_hour: string;
	phone: string;
	short_description: string;
	title: string;
	updated_date: string;
}

export interface PayloadEventClasses {
	category: string;
	content: string;
	created_date: string;
	hospitals?: {
		id?: number;
		address?: string;
		hospital_code?: string;
		hospital_name: string;
		phone?: string;
	}[];
	id: number;
	img_url_card: string;
	img_url_detail: string;
	information: string;
	is_publish: boolean;
	operational_hour: string;
	phone: string;
	short_description: string;
	title: string;
	updated_date: string;
}