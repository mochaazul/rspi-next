import { ResponseStatus } from '@/interface';

export interface CenterOfExcellenceState {
	centerOfExcellence: CenterOfExcellenceDetail[];
	loading: boolean;
	error: ResponseStatus;
	relatedNews?: {
		id?: number;
		news?: CenterOfExcellenceNewsDetail;
	}[];
}

export interface CenterOfExcellenceDetail {
	id?: number;
	title?: string;
	content?: string;
	short_description?: string;
	conditions?: string;
	treatments?: string;
	technology?: string;
	doctors?: string;
	img_url?: string[];
	is_publish?: boolean;
	created_date?: string;
	updated_date?: string;
	news_author?: {
		doctor_name?: string;
		img_url?: string;
		speciality?: string;
		sub_speciality?: string;
	};
	category?: string;
	posted_date?: string;
	author?: string;
}

export interface PayloadCenterCenterOfExcellence {
	id?: number;
	title?: string;
	content?: string;
	short_description?: string;
	conditions?: string;
	treatments?: string;
	technology?: string;
	doctors?: string;
	img_url?: string[];
	is_publish?: boolean;
	created_date?: string;
	updated_date?: string;
}

export interface CenterOfExcellenceNewsDetail {
	id?: number;
	title?: string;
	content?: string;
	short_description?: string;
	img_url?: string;
	news_author?: {
		doctor_name?: string;
		img_url?: string;
		speciality?: string;
		sub_speciality?: string;
	};
	category?: string;
	posted_date?: string;
	author?: string;
	news_id?: number;
}