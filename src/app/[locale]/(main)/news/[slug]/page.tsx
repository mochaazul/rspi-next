import { redirect } from 'next/navigation';

import { getScopedI18n } from '@/locales/server';

import {
	getNewsSpecialtyByID,
	getRelatedNews,
	getArticleById
} from '@/lib/api';

import NewsDetail from '@/components/ui/PageComponents/News/NewsDetail';

const DetailNewsHealthPage = async ({ params }: { params: { slug: string; }; }) => {
	const t = await getScopedI18n('page.newsDetail');

	const selectedArticle = await getArticleById();

	const newParam = decodeURIComponent(params?.slug);

	if (selectedArticle?.data?.filter(coe => `${ coe.slug }` === newParam).length <= 0) {
		redirect(`/news/${ selectedArticle?.data[0]?.slug }`);
	};

	const filteredSelectedArticle = selectedArticle?.data?.find(coe => {
		return coe?.slug === newParam;
	});

	const specialty = await getNewsSpecialtyByID({
		param: `${ filteredSelectedArticle?.id }`,
		query: {
			limit: '2'
		}
	});

	const relatedNews = await getRelatedNews({
		param: `${ filteredSelectedArticle?.id }`,
		query: {
			limit: '2'
		}
	});

	const breadcrumbsPath = [{ name: t('breadcrumbsLabel'), url: '/news' }, { url: '#', name: filteredSelectedArticle?.title || '' }];

	return (
		<NewsDetail
			filteredSelectedArticle = { filteredSelectedArticle }
			specialty = { specialty?.data }
			relatedNews = { relatedNews?.data }
			breadcrumbsPath = { breadcrumbsPath }
		/>

	);
};

export default DetailNewsHealthPage;