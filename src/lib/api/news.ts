import { ArticleDetail, Pagination, PayloadArticle } from '@/interface';
import fetcher from './utils/fetcher';

export const getNews = (query?: PayloadArticle, pagination?: Pagination) => {
	return fetcher<ArticleDetail[]>('article', { query: { ...query, is_publish: true }, pagination });
};