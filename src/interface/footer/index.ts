export interface FooterState {
	footerCategories: FooterCategories[];
	footerList: FooterDetail[];
	detail: FooterDetail[];
	loading: boolean;
}

export interface FooterCategories {
	id?: number;
	name?: string;
	slug?: string;
	created_date?: string;
	updated_date?: string;
}

export interface FooterDetail {
	id?: number;
	title?: string;
	slug?: string;
	sub_title?: string;
	content?: string;
	author?: string;
	img_url?: string[];
	footer_category?: string;
	is_publish?: boolean;
	posted_date?: string;
	created_date?: string;
	updated_date?: string;
}

export interface GetFooterParams {
	slug?: string;
	footer_category?: string;
	limit?: number;
}