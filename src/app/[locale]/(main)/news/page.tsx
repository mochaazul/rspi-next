
import { getArticle } from '@/lib/api';
import { getScopedI18n } from '@/locales/server';

import NewsHealthArticlesPage from './NewsHealthArticlesPage';

const News = async () => {

	const articles = await getArticle();
	const t = await getScopedI18n('page.news');

	return (
		<NewsHealthArticlesPage
			articles={ articles.data }
			pagination={ articles.pagination }
			breadcrumbsPath={ [{ name: t('breadcrumbsLabel'), url: '/news' }] }
		/>
	);
};

export default News;
