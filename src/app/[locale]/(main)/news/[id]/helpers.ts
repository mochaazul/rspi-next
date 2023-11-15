

import { getNewsSpecialtyByID, getArticleById } from '@/lib/api';

export const fetchNewsSpecialtyByID = (id: any) => {
	
	const paramFetch = {
		param: id,
		query: 'limit=2',
		body: null,
	};

	return getNewsSpecialtyByID(paramFetch);
};

export const fetchDetail = (articleId: string | null) => {

	const paramFetch = {
		param: articleId,
		query: null,
		body: null,
	};

	return getArticleById(paramFetch);
}
