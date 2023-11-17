import { getArticle } from '@/lib/api';

export const fetchArticle = (params: any) => {
	const paramFetch = {
		param: null,
		query: params,
		body: null,
	};
	return getArticle(paramFetch);
};