import { getArticle } from '@/lib/api';

export const fetchArticle = (params: any) => {
	const paramFetch = {
		param: null,
		query: new URLSearchParams(params).toString(),
		body: null,
	};
	return getArticle(paramFetch);
};