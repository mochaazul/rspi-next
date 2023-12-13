'use client';

import { useState, useEffect } from 'react';
import moment from 'moment';
import { usePathname, useRouter } from 'next/navigation';

import { ArticleState, Pagination } from '@/interface';
import { colors } from '@/constant';
import {
	Breadcrumbs,
	Button,
	PaginationNumber,
	Text,
	Share,
	EmptyData,
	Form
} from '@/components/ui';
import Card, { CardContentWithInner, CardsScrollHorizontal } from '@/components/ui/Card';

import CardNews from './CardNews';
import { NewsHealthArticlesStyle } from './styles';
import { BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import { fetchArticle } from './helpers';
import { useScopedI18n } from '@/locales/client';
import Link from 'next/link';

const NewsHealthArticlesPage = ({
	articles,
	pagination,
	breadcrumbsPath,
}: {
	breadcrumbsPath: BreadcrumbsType['datas'],
	articles: ArticleState,
	pagination: Pagination | null,
}) => {
	const [pageNumber, setPageNumber] = useState(pagination?.page || 1);
	const [activeTab, setActiveTab] = useState(0);
	const [loading, setLoading] = useState(false);
	const [keyArticle, setKeyArticle] = useState('');
	const [articlesData, setArticlesData] = useState(articles);

	const pathname = usePathname();
	const navigate = useRouter();
	const t = useScopedI18n('page.news');

	const tabData = [
		{ label: t('tabPillsLabel.all'), value: '' },
		{ label: t('tabPillsLabel.news'), value: 'news' },
		{ label: t('tabPillsLabel.healthArticles'), value: 'article' },
		{ label: t('tabPillsLabel.healthFirst'), value: 'healthfirst' }
	];

	useEffect(() => {
		setLoading(true);
		fetchArticle({
			query: {
				limit: '10',
				page: `${ pageNumber }`,
				is_publish: 'true',
				category: tabData[activeTab]?.value,
				keyword: keyArticle,
				with_healthfirst: tabData[activeTab]?.value === 'healthfirst'
			}
		}).then(function(response: any) {
			setArticlesData(response.data);
			setLoading(false);
		});

	}, [
		pageNumber,
		activeTab,
		keyArticle
	]);

	const clickTabs = (idx: any) => {
		setPageNumber(1);
		setKeyArticle('');
		setActiveTab(idx);
	};

	return (
		<NewsHealthArticlesStyle>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] md:pt-[60px] pb-[60px] animate-slideDownToUp '>
				<div>
					<div className='header'>
						<Breadcrumbs datas={ breadcrumbsPath } />
						<Text
							fontSize='44px'
							fontType='h1'
							fontWeight='900'
							lineHeight='57px'
							text={ t('heading') }
							className='sm:mt-[50px] mt-[25px]'
							subClassName='max-sm:text-[24px]'
						/>
						<div className='flex justify-between max-sm:flex-col'>
							<div className='flex flex-row mt-[31px] gap-4 items-center xs:grid-cols-1 max-sm:justify-between max-sm:grid-cols-2 max-sm:grid'>
								{ tabData.map((tab, idx) => (
									<div key={ idx }>
										<Button
											theme={ activeTab === idx ? 'primary' : 'secondary' }
											$hoverTheme={ activeTab === idx ? 'secondary' : 'primary' }
											label={ tab.label }
											onClick={ () => clickTabs(idx) }
										/>
									</div>
								)) }
							</div>
							<div className='mt-[31px] w-[349px]'>
								<Form.TextField
									placeholder='Cari Artikel'
									iconName='Search'
									iconPosition='left'
									$iconColor={ colors.grey.light }
									onChange={ e => setKeyArticle(e.target.value) } />
							</div>
						</div>
					</div>
					{ Object.values(articlesData || []).length !== 0 ?
						<div className='content mt-[60px] max-sm:hidden'>
							{ loading ? <div className='text-center mb-[30px] w-full'><Text textAlign='center' fontSize='20px' color={ colors.grey.dark } className='mt-[20px]'>loading ...</Text></div> :
								<div className='flex mb-[30px] justify-between'>
									<div
										key={ Object.values(articlesData || [])[0]?.slug }
										className='w-[540px] mr-[32px] cursor-pointer magazine relative'
									>
										<div className='relative'>
											<Share />
										</div>
										<Link href={ `${ pathname }/${ Object.values(articlesData || [])[0]?.slug }` } >
											<img
												className='rounded-[10px] img-thumbnail-magazine'
												src={ Object.values(articlesData || [])[0]?.img_url }
											/>
											<div className='mt-[30px] mb-[10px] flex items-center'>
												<div className='btn-category'>
													{ Object.values(articlesData || [])[0]?.category.charAt(0).toUpperCase() + Object.values(articlesData || [])[0].category.slice(1) }
												</div>
												<div className='ml-[10px]'>
													<Text
														fontSize='14px'
														fontWeight='400'
														lineHeight='17px'
														color={ colors.grey.dark }
														text={ moment(Object.values(articlesData || [])[0]?.posted_date).format('dddd, DD MMM YYYY') }
													/>
												</div>
											</div>
											<Text fontSize='20px' fontType='h3' fontWeight='900' color={ colors.grey.darker } text={ Object.values(articlesData || [])[0]?.title } lineHeight='28px' />
											<Text fontSize='14px' fontType='p' fontWeight='400' color={ colors.grey.dark } text={ Object.values(articlesData || [])[0]?.news_author?.doctor_name } className='mt-[5px] mb-[2px]' lineHeight='24px' />
											<div style={ { color: colors.grey.dark } } className='innerHTML mt-[10px]' dangerouslySetInnerHTML={ { __html: Object.values(articlesData || [])[0]?.short_description } } />
										</Link>
									</div>
									<div className='mb-3'>
										{
											Object.values(articlesData || [])?.slice(1, 4)
												?.map((data, index) => (
													<div
														className='relative'
														key={ index }
													>
														<div className='relative'>
															<Share id={ data.id } />
														</div>
														<Link href={ `${ pathname }/${ data?.slug }` } style={ { zIndex: '-999 !important' } }>
															<CardNews
																id={ data.id }
																title={ data.title }
																category={ data.category.charAt(0).toUpperCase() + data.category.slice(1) }
																imgThumb={ data.img_url }
																date={ moment(data?.posted_date).format('dddd, DD MMM YYYY') }
																author={ data?.news_author?.doctor_name }
															/>
														</Link>
													</div>
												))
										}
									</div>
								</div>
							}

							{ loading ? '' :
								<div className='mt-[60px] grid grid-cols-3 gap-3'>
									{
										Object.values(articlesData || []).map((data, index) => (
											<Card
												key={ index }
												id={ data?.id }
												image={ data?.img_url }
												imageHeight='200px'
												header={
													<div className='flex items-center'>
														<div className='btn-category'>
															{ data?.category.charAt(0).toUpperCase() + data.category.slice(1) }
														</div>
														<div className='ml-[10px]'>
															<Text
																fontSize='14px'
																fontWeight='400'
																lineHeight='17px'
																color={ colors.grey.dark }
																text={ moment(data?.posted_date).format('dddd, DD MMM YYYY') }
															/>
														</div>
													</div>
												}
												content={ <CardContentWithInner title={ data.title } description={ data.short_description } author={ data?.news_author?.doctor_name } /> }
												footer={ ({ isHover }) => <Button theme={ isHover ? 'primary' : 'secondary' } label={ t('viewDetails') } /> }
												className='mb-0'
												iconShare={ true }
												to={ `/news/${ data?.slug }` }
											/>
										))
									}
								</div>
							}
						</div>
						:
						<Text textAlign='center' fontSize='20px' color={ colors.grey.dark } className='mt-[20px]'>
							{ loading ? 'loading ...' : <EmptyData menu={ t('heading') } /> }
						</Text>
					}

					<div className='mobile-view w-full sm:hidden'>
						<CardsScrollHorizontal >
							{
								Object.values(articlesData || []).map((data, index) => {
									return (
										<Card
											key={ index }
											id={ data?.id }
											image={ data?.img_url }
											imageHeight='200px'
											header={
												<div className='flex items-center'>
													<div>
														<Button
															theme='primary'
															label={ data?.category?.charAt(0).toUpperCase() + data.category.slice(1) }
															className='btn-category'
														/>
													</div>
													<div className='ml-[10px]'>
														<Text
															fontSize='14px'
															fontWeight='400'
															lineHeight='17px'
															color={ colors.grey.dark }
															text={ moment(Object.values(articlesData || [])[0]?.posted_date).format('dddd, DD MMM YYYY') }
														/>
													</div>
												</div>
											}
											content={ <CardContentWithInner title={ data.title } description={ data.short_description } author={ data?.news_author?.doctor_name } /> }
											footer={ ({ isHover }) => <Button theme={ isHover ? 'primary' : 'secondary' } label={ t('viewDetails') } /> }
											className='mb-0'
											iconShare={ true }
											to={ `/news/${ data?.slug }` }
										/>
									);
								})
							}
						</CardsScrollHorizontal>
					</div>

					{ Object.values(articlesData || []).length !== 0 ?
						<div className='mt-[50px] flex flex-col items-center'>
							{ loading ? '' :
								<PaginationNumber totalPage={ pagination?.total_page || 1 } currentPage={ pageNumber } onItemClick={ page => setPageNumber(page) } />
							}
						</div>
						:
						''
					}
				</div>
			</div>
		</NewsHealthArticlesStyle>
	);
};

export default NewsHealthArticlesPage;