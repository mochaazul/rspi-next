import { getArticle } from '@/lib/api';
import { ApiOptions } from '@/lib/api/utils/fetcher';

export const fetchArticle = (params: ApiOptions) => {
	
	return getArticle(params);
};