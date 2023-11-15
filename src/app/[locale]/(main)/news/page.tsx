
import { getArticle } from '@/lib/api';
import NewsHealthArticlesPage from './NewsHealthArticlesPage';

const News = async() => {
	const paramFetch = {
		param: null,
		query: null,
		body: null,
	};
	const articles = await getArticle(paramFetch);

	return (
		<NewsHealthArticlesPage
			articles = { articles.data }
			pagination = { articles.pagination }
			breadcrumbsPath={ [{ name: 'News & Health Articles', url: '/news' }] }
		/>
	);
};

export default News;