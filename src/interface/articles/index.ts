import { ResponseStatus, Pagination } from 'interface';

export interface ArticleState {
	articles: ArticleDetail[];
	selectedArticle?: ArticleDetail;
	relatedNews: ArticleDetail[];
	specialty: ArticleDetail[];
	loading: boolean;
	error: ResponseStatus;
	pagination: Pagination | null;
}

export interface ArticleDetail {
	id: number;
	title: string;
	content: string;
	created_by: string;
	created_at: string;
	is_publish: boolean;
	thubmnail: string;
	img_url: string;
	posted_date: string;
	category: string;
	author: string;
	short_description: string;
	news_author: NewsAuthorDetail;
	hospitals?: (string | number)[] | null;
	fullname_doctor: string;
	speciality: string;
}
export interface PayloadArticle {
	id?: number;
	title?: string;
	meta_description?: string;
	thumbnail_img?: string;
	content?: string;
	created_by?: string;
	tags?: (string | number)[] | null;
	new_tags?: (string | number)[] | null;
	is_publish?: boolean;
}

export interface NewsAuthorDetail {
	doctor_name?: string;
	img_url?: string;
	speciality?: string;
	sub_speciality?: string;
}
