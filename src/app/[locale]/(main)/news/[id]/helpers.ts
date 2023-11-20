import {
	getNewsSpecialtyByID,
	getRelatedNews,
	getArticleById
} from '@/lib/api';

export const fetchNewsSpecialtyByID = (id: any) => {
	
	return getNewsSpecialtyByID({
		param: id,
		query: {
			limit: '2'
		}
	});
};

export const fetchRelatedNews = (id: any) => {

	return getRelatedNews({
		param: id,
		query: {
			limit: '2'
		}
	});
};

export const fetchDetail = (articleId: string | null) => {

	return getArticleById({
		param: articleId ?? ''
	});
};
