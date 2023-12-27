
import { getArticle } from '@/lib/api';
import { getScopedI18n } from '@/locales/server';

import NewsHealthArticlesPage from './NewsHealthArticlesPage';

const News = async ({ searchParams }: any) => {
	const getArticles = await getArticle({
		query: {
			limit: '10',
			page: searchParams.page ?? '',
			is_publish: 'true',
			category: searchParams.category ?? '',
			keyword: searchParams.keyword ?? '',
			with_healthfirst: searchParams.category === 'healthfirst'
		}
	});

	const articles = getArticles?.data?.map(art => ({
		id: art?.id,
		slug: art?.slug,
		img_url: art?.img_url,
		category: art?.category,
		posted_date: art?.posted_date,
		title: art?.title,
		news_author: art?.news_author,
		short_description: art?.short_description,
	}));

	const t = await getScopedI18n('page.news');

	return (
		<NewsHealthArticlesPage
			articles={ articles }
			pagination={ getArticles.pagination }
			breadcrumbsPath={ [{ name: t('breadcrumbsLabel'), url: '/news' }] }
		/>
	);
};

export default News;
