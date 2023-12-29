'use client';

import { useState, useEffect } from 'react';
import moment from 'moment';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { ArticleState, NewsAuthorDetail, Pagination } from '@/interface';
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
import { useScopedI18n } from '@/locales/client';

type ArticleProps = {
	id: number;
	slug: string;
	img_url: string;
	category: string;
	posted_date: string;
	title: string;
	news_author: NewsAuthorDetail;
	short_description: string;
};

const NewsHealthArticlesPage = ({
	articles,
	pagination,
	breadcrumbsPath,
}: {
	breadcrumbsPath: BreadcrumbsType['datas'],
	articles: ArticleProps[],
	pagination: Pagination | null,
}) => {
	const [pageNumber, setPageNumber] = useState(pagination?.page || 1);
	const [keywordSearch, setKeywordSearch] = useState<string>('');
	
	const totalPages = pagination?.total_page || 1;

	const pathname = usePathname();
	const navigate = useRouter();
	const searchParam = useSearchParams()!;
	const t = useScopedI18n('page.news');
	const params = new URLSearchParams(searchParam);
	const categoryParams = params.get('category') ?? '';

	const tabData = [
		{ label: t('tabPillsLabel.all'), value: '' },
		{ label: t('tabPillsLabel.news'), value: 'news' },
		{ label: t('tabPillsLabel.healthArticles'), value: 'article' },
		{ label: t('tabPillsLabel.healthFirst'), value: 'healthfirst' }
	];

	const clickTabs = () => {
		setPageNumber(1);
		params.delete('keyword');
		setKeywordSearch('');
	};

	const clickPagination = (page: number) => {
		setPageNumber(page);
		params.set('page', page.toString());
		navigate.push(`${ pathname }?${ params.toString() }`);
	};

	return (
		<NewsHealthArticlesStyle>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] pb-[60px] animate-slideDownToUp '>
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
								{ tabData.map((tab, idx) => {
									return (
										<Link href={ idx > 0 ? `/news?category=${ tab.value }` : '/news' } key={ idx }>
											<Button
												theme={ tab?.value === categoryParams ? 'primary' : 'secondary' }
												$hoverTheme={ tab?.value === categoryParams ? 'secondary' : 'primary' }
												label={ tab.label }
												onClick={ () => clickTabs() }
												className='rounded-[10px] py-[10px] px-[20px]'
											/>
										</Link>
									);
								}) }
							</div>
							<div className='mt-[31px] w-[349px]'>
								<Form.TextField
									placeholder='Cari Artikel'
									featherIcon='Search'
									iconPosition='left'
									$iconColor={ colors.grey.light }
									value={ keywordSearch }
									className='placeholder-gray-3'
									onChange={ e => {
										setKeywordSearch(e.target.value);
										params.set('keyword', e.target.value);
										navigate.push(`${ pathname }?${ params.toString() }`);
									} } />
							</div>
						</div>
					</div>
					{ articles.length !== 0
						?
						<div className='content mt-[60px] max-sm:hidden'>
							<div className='flex mb-[30px] justify-between'>
								<div
									key={ articles[0]?.slug }
									className='w-[540px] mr-[32px] cursor-pointer magazine relative'
								>
									<div className='relative'>
										<Share slug={ articles[0]?.slug } />
									</div>
									<Link href={ `${ pathname }/${ articles[0]?.slug }` } >
										<img
											className='rounded-[10px] img-thumbnail-magazine'
											src={ articles[0]?.img_url }
										/>
										<div className='mt-[30px] mb-[10px] flex items-center'>
											<Button
												theme='primary'
												label={ articles[0]?.category.charAt(0).toUpperCase() + articles[0].category.slice(1) }
												className='btn-category w-auto px-[8px] py-[6px] rounded-[5px] text-[14px]'
											/>
											<div className='ml-[10px]'>
												<Text
													fontSize='14px'
													fontWeight='400'
													lineHeight='17px'
													color={ colors.grey.dark }
													text={ moment(Object.values(articles || [])[0]?.posted_date).format('dddd, DD MMM YYYY') }
												/>
											</div>
										</div>
										<Text fontSize='20px' fontType='h3' fontWeight='900' color={ colors.grey.darker } text={ articles[0]?.title } lineHeight='28px' />
										<Text fontSize='14px' fontType='p' fontWeight='400' color={ colors.grey.dark } text={ articles[0]?.news_author?.doctor_name } className='mt-[5px] mb-[2px]' lineHeight='24px' />
										<div style={ { color: colors.grey.dark } } className='innerHTML mt-[10px] line-clamp-3' > { articles[0]?.short_description } </div>
									</Link>
								</div>
								<div className='mb-3'>
									{
										articles?.slice(1, 4)
											?.map((data, index) => (
												<div
													className='relative'
													key={ index }
												>
													<div className='relative z-1'>
														<Share slug={ data.slug } />
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

							<div className='mt-[60px] grid grid-cols-3 gap-3'>
								{
									articles.map((data, index) => (
										<Card
											key={ index }
											id={ data?.id }
											slug={ data?.slug }
											image={ data?.img_url }
											imageHeight='200px'
											header={
												<div className='flex items-center'>
													<Button
														theme='primary'
														label={ data?.category?.charAt(0).toUpperCase() + data?.category?.slice(1) }
														className=' btn-category px-[8px] py-[6px] rounded-[5px] text-[14px] w-auto'
													/>
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
						</div>
						:
						<Text textAlign='center' fontSize='20px' color={ colors.grey.dark } className='mt-[20px]'>
							<EmptyData menu={ t('heading') } />
						</Text>
					}

					<div className='mobile-view w-full sm:hidden'>
						<CardsScrollHorizontal >
							{
								Object.values(articles || []).map((data, index) => {
									return (
										<Card
											key={ index }
											id={ data?.id }
											slug={ data?.slug }
											image={ data?.img_url }
											imageHeight='200px'
											header={
												<div className='flex items-center'>
													<div>
														<Button
															theme='primary'
															label={ data?.category?.charAt(0).toUpperCase() + data.category.slice(1) }
															className='btn-category px-[8px] py-[6px] rounded-[5px] text-[14px]'
														/>
													</div>
													<div className='ml-[10px]'>
														<Text
															fontSize='14px'
															fontWeight='400'
															lineHeight='17px'
															color={ colors.grey.dark }
															text={ moment(Object.values(articles || [])[0]?.posted_date).format('dddd, DD MMM YYYY') }
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

					<div className='mt-[50px] flex flex-col items-center'>
						{ totalPages > 1 ? <PaginationNumber totalPage={ totalPages } currentPage={ pageNumber } onItemClick={ page => clickPagination(page) } /> : <></> }
					</div>
				</div>
			</div>
		</NewsHealthArticlesStyle>
	);
};

export default NewsHealthArticlesPage;