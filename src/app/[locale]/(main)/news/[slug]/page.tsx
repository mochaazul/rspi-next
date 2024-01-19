import { Metadata } from 'next';

import { redirect } from 'next/navigation';

import { getScopedI18n } from '@/locales/server';

import {
	getNewsSpecialtyByID,
	getRelatedNews,
	getArticleBySlug
} from '@/lib/api';

import NewsDetail from '@/components/ui/PageComponents/News/NewsDetail';

export async function generateMetadata({ params }: { params: { slug: string; }; }): Promise<Metadata> {
	const getArticle = await getArticleBySlug({
		param: params?.slug,
	});
   
	const selectedArticle = Object.values(getArticle)[0];
   
	return {
	  title: selectedArticle?.title,
	  description: selectedArticle?.short_description,
	  openGraph: {
			images: [selectedArticle?.img_url],
		},
	};
}

const DetailNewsHealthPage = async({ params }: { params: { slug: string; }; }) => {
	const t = await getScopedI18n('page.newsDetail');

	const getArticle = await getArticleBySlug({
		param: params?.slug,
	});

	const selectedArticle = Object.values(getArticle)[0];
	
	if (selectedArticle?.slug !== params?.slug) {
		redirect('/news');
	};

	const specialty = await getNewsSpecialtyByID({
		param: `${ selectedArticle?.id }`,
		query: {
			limit: '3'
		}
	});

	const relatedNews = await getRelatedNews({
		param: `${ selectedArticle?.id }`,
		query: {
			limit: '3'
		}
	});

	const breadcrumbsPath = [{ name: t('breadcrumbsLabel'), url: '/news' }, { url: '#', name: selectedArticle?.title || '' }];

	return (
		<NewsDetail
			filteredSelectedArticle={ selectedArticle }
			specialty={ specialty?.data }
			relatedNews={ relatedNews?.data }
			breadcrumbsPath={ breadcrumbsPath }
		/>

	);
};

export default DetailNewsHealthPage;