
import { getArticle } from '@/lib/api';
import NewsHealthArticlesPage from './NewsHealthArticlesPage';

const News = async() => {
	
	const articles = await getArticle();

	return (
		<NewsHealthArticlesPage
			articles = { articles.data }
			pagination = { articles.pagination }
			breadcrumbsPath={ [{ name: 'News & Health Articles', url: '/news' }] }
		/>
	);
};

export default News;
