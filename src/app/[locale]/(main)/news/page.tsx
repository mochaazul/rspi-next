
import { getArticle } from '@/lib/api';
import { getScopedI18n } from '@/locales/server';

import NewsHealthArticlesPage from './NewsHealthArticlesPage';

const News = async ({ searchParams }: any) => {
	const articles = await getArticle({
		query: {
			limit: '10',
			page: searchParams.page ?? '',
			is_publish: 'true',
			category: searchParams.category ?? '',
			keyword: searchParams.keyword ?? '',
			with_healthfirst: searchParams.category === 'healthfirst'
		}
	});
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
