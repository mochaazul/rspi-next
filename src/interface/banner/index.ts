import { ResponseStatus } from '@/interface';
import { Pagination } from '@/interface';

export interface BannerState {
	banner: BannerDetail[];
	loading: boolean;
	error: ResponseStatus;
	pagination?: Pagination;
}

export interface BannerDetail {
	id?: number;
	title?: string;
	description?: string;
	img_url_idn?: string;
	img_url_en?: string;
	img_url_mobile_en?: string;
	img_url_mobile_idn?: string;
	is_publish?: boolean;
	url_link_idn?: string;
	url_link_en?: string;
	created_date?: string;
	updated_date?: string;
	image_url?: string;
}

export interface PayloadBanner {
	id?: number;
	title?: string;
	description?: string;
	img_url?: string;
	is_publish?: boolean;
	url_link?: string;
	created_date?: string;
	updated_date?: string;
}