import { redirect } from 'next/navigation';

import { getScopedI18n } from '@/locales/server';

import {
	getNewsSpecialtyByID,
	getRelatedNews,
	getArticleBySlug
} from '@/lib/api';

import NewsDetail from '@/components/ui/PageComponents/News/NewsDetail';

const DetailNewsHealthPage = async ({ params }: { params: { slug: string; }; }) => {
	const t = await getScopedI18n('page.newsDetail');

	const newParam = decodeURIComponent(params?.slug);

	const selectedArticle = await getArticleBySlug({
		param: params?.slug,
	});

	if (Object.values(selectedArticle?.data)?.filter(news => `${ news.slug }` === newParam).length <= 0) {
		redirect(`/news`);
	};

	const specialty = await getNewsSpecialtyByID({
		param: `${ selectedArticle?.data[0]?.id }`,
		query: {
			limit: '2'
		}
	});

	const relatedNews = await getRelatedNews({
		param: `${ selectedArticle?.data[0]?.id }`,
		query: {
			limit: '2'
		}
	});

	const breadcrumbsPath = [{ name: t('breadcrumbsLabel'), url: '/news' }, { url: '#', name: selectedArticle?.data[0]?.title || '' }];

	return (
		<NewsDetail
			filteredSelectedArticle={ selectedArticle?.data }
			specialty={ specialty?.data }
			relatedNews={ relatedNews?.data }
			breadcrumbsPath={ breadcrumbsPath }
		/>

	);
};

export default DetailNewsHealthPage;