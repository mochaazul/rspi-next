'use client';
import { useState } from 'react';

import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';

import { ArticleDetail, ArticleState } from '@/interface';
import { useScopedI18n } from '@/locales/client';

import {
	Breadcrumbs,
	Text,
	Tabs,
	Button
} from '@/components/ui';

import {
	colors,
	icons,
	sosmedLink
} from '@/constant';
import dayjs from 'dayjs';
import { useCurrentLocale } from '@/locales/client';

const NewsDetail = ({
	filteredSelectedArticle,
	specialty,
	relatedNews,
	breadcrumbsPath,
}: {
	filteredSelectedArticle: any,
	specialty: ArticleState['specialty'],
	relatedNews: ArticleState['relatedNews'],
	breadcrumbsPath: {
		name: string;
		url: string;
	}[],
}) => {

	const t = useScopedI18n('page.newsDetail');
	const [activeTabIdx, setActiveTabIdx] = useState(0);
	const currentLang = useCurrentLocale();

	const renderNews = () => {
		return (
			<div>
				<Text fontWeight='700' fontSize='20px' lineHeight='30px'>
					{ filteredSelectedArticle?.short_description }
				</Text>
				<img alt={ filteredSelectedArticle?.title } src={ filteredSelectedArticle?.img_url } className='mx-auto my-[50px] lg:w-[729px] lg:h-[502px] object-cover' />
				<div
					style={ { color: colors.grey.dark } }
					className='innerHTML mt-[10px]'
					dangerouslySetInnerHTML={ { __html: filteredSelectedArticle?.content || '' } }
				/>
				<div className={ filteredSelectedArticle?.category === 'healthfirst' ? 'hidden' : 'sm:hidden' }>
					<Tabs
						activeTabIndex={ activeTabIdx }
						setActiveTabIndex={ setActiveTabIdx }
						tabsData={ ['Related News'] }
					/>
					<div className='divide-y divide-solid pt-[10px]'>
						{ Object.values(relatedNews || []).map((a, index) => {
							return (
								<div key={ index }>
									<Link href={ `/news/${ a.slug }` }>
										<Text
											text={ a.posted_date }
											className='py-[10px]'
											fontSize='12px'
											fontWeight='400'
											lineHeight='14px'
											color={ colors.grey.dark }
										/>
										<Text
											text={ a.title }
											className='pb-[10px]'
											fontSize='14px'
											fontWeight='900'
											lineHeight='24px'
											color={ colors.grey.darker }
										/>
									</Link>
								</div>
							);
						}) }
					</div>
				</div>
			</div>
		);
	};

	const renderHealthFirst = () => {
		return (
			<div className='flex-col lg:flex-row xl:flex-row md:flex-row flex gap-10'>
				<div>
					<img
						alt={ filteredSelectedArticle?.title }
						src={ filteredSelectedArticle?.img_url }
						className='mx-auto lg:w-[729px] object-cover' />
				</div>
				<div className='lg:w-3/4 md:w-3/4 xl:w-3/4'>
					<div className='w-full'>
						<Text fontWeight='700' fontSize='20px' lineHeight='30px'>
							{ filteredSelectedArticle?.short_description }
						</Text>
						<div
							style={ { color: colors.grey.dark } }
							className='innerHTML mt-[10px]'
							dangerouslySetInnerHTML={ { __html: filteredSelectedArticle?.content || '' } }
						/>
						<Link href={ filteredSelectedArticle?.pdf_url } className='text-gray-500 font-bold cursor-pointer' >{ t('downloadFilePdf') } <span className='text-orange-700'>{ t('here') }</span> </Link>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] pb-[60px]'>
				<div>
					<Breadcrumbs datas={ breadcrumbsPath } />
					<div className={ ' mt-[70px]' }>
						<div className='w-fit'>
							<Button label={ filteredSelectedArticle?.category } className='px-[8px] py-[6px] capitalize' />
						</div>
						<div className={ `${ filteredSelectedArticle?.category === 'healthfirst' ? 'w-full' : 'sm:w-[729px] ' } ` }>
							<Text fontWeight='900' fontSize='32px' lineHeight='48px' className='my-[20px]'>
								{ filteredSelectedArticle?.title }
							</Text>
							{
								filteredSelectedArticle?.news_author?.doctor_name ?
									<Text
										fontWeight='400'
										fontSize='18px'
										lineHeight='22px'
										color={ colors.grey.dark }
									>
										<span>{ t('oleh') }{ ' ' }</span>
										<Link href={ `/doctor/${ filteredSelectedArticle?.author }` } className='hover:underline'>
											<span>{ filteredSelectedArticle?.news_author?.doctor_name }</span>
										</Link>
									</Text>
									: <></>
							}

							<div className='flex items-center gap-[30px] mt-[20px]'>
								<Text
									text={ dayjs(filteredSelectedArticle?.posted_date).locale(currentLang).format('dddd, DD MMMM YYYY') }
									fontWeight='400'
									fontSize='18px'
									lineHeight='22px'
									color={ colors.grey.dark }
								/>
								<div className='flex gap-[15px]'>
									<Link href={ sosmedLink.facebook + window?.location?.href } target='_blank' className='cursor-pointer' >
										<Image src='/images/ic/facebook.svg' alt='RSPI Facebook link' width={ 16 } height={ 16 } />
									</Link>
									<Link href={ sosmedLink.twitter + window?.location?.href } target='_blank' className='cursor-pointer' >
										<Image src='/images/ic/twitter.svg' alt='RSPI twitter link' width={ 16 } height={ 16 } />
									</Link>
									<Link href={ sosmedLink.linkedin + window?.location?.href } target='_blank' className='cursor-pointer' >
										<Image src='/images/ic/LinkedIn/Negative.svg' alt='RSPI Linkedin link' width={ 16 } height={ 16 } />
									</Link>
									<div className='cursor-pointer' onClick={ () => {
										navigator?.clipboard?.writeText(window?.location?.href).then(() => {
											alert('URL Link copied');
										});
									} }>
										<Image src='/images/ic/Link.svg' alt='RSPI link' width={ 16 } height={ 16 } />
									</div>
								</div>
							</div>
						</div>
						<div className='content-wrapper flex mt-[20px] mb-[100px]'>
							<div className={ ` ${ filteredSelectedArticle?.category === 'healthfirst' ? 'w-full' : 'w-[729px]' } leftSide mt-[30px] ` }>
								{ filteredSelectedArticle?.category === 'healthfirst' ? renderHealthFirst() : renderNews() }
								<div className={ filteredSelectedArticle?.category === 'healthfirst' ? 'hidden' : 'sm:hidden' } >
									<Tabs
										activeTabIndex={ activeTabIdx }
										setActiveTabIndex={ setActiveTabIdx }
										tabsData={ ['Specialty'] }
									/>
									<div className='divide-y divide-solid pt-[10px]'>
										{ Object.values(specialty || [])?.map((specialty, index) => {
											return (
												<div key={ index }>
													<Text
														text={ specialty.fullname_doctor }
														className='py-[10px]'
														fontSize='14px'
														fontWeight='900'
														lineHeight='24px'
														color={ colors.grey.darker }
													/>
													<Text
														text={ specialty.speciality }
														className='pb-[10px]'
														fontSize='12px'
														fontWeight='400'
														lineHeight='14px'
														color={ colors.grey.dark }
													/>
												</div>
											);
										}) }
									</div>
								</div>
							</div>
							<div className={ ` ${ filteredSelectedArticle?.category === 'healthfirst' ? 'hidden' : 'rightSide sm:ml-[32px] max-sm:hidden mr-auto w-[349px] ' } ` }>
								<div className={ filteredSelectedArticle?.category === 'healthfirst' ? 'hidden' : 'w-[349px]' }>
									<Tabs
										activeTabIndex={ activeTabIdx }
										setActiveTabIndex={ setActiveTabIdx }
										tabsData={ ['Related News'] }
									/>
									<div className='divide-y divide-solid pt-[10px]'>
										{ Object.values(relatedNews || [])?.map((a, index) => {
											return (
												<div key={ index }>
													<Link href={ `/news/${ a.slug }` }>
														<Text
															text={ dayjs(a.posted_date).locale(currentLang).format('dddd, DD MMMM YYYY') }
															className='py-[10px]'
															fontSize='12px'
															fontWeight='400'
															lineHeight='14px'
															color={ colors.grey.dark }
														/>
														<Text
															text={ a.title }
															className='pb-[10px]'
															fontSize='14px'
															fontWeight='900'
															lineHeight='24px'
															color={ colors.grey.darker }
														/>
													</Link>
												</div>
											);
										}) }
									</div>
								</div>
								<div className={ filteredSelectedArticle?.category === 'healthfirst' ? 'hidden' : 'mt-[40px]' }>
									<Tabs
										activeTabIndex={ activeTabIdx }
										setActiveTabIndex={ setActiveTabIdx }
										tabsData={ ['Specialty'] }
									/>
									<div className='divide-y divide-solid pt-[10px]'>
										{ Object.values(specialty || [])?.map((specialty, index) => {
											return (
												<div key={ index }>
													<Link href={ `/doctor/${ specialty.doctor_code }` } className='hover:underline'>
														<Text
															text={ specialty.fullname_doctor }
															className='py-[10px]'
															fontSize='14px'
															fontWeight='900'
															lineHeight='24px'
															color={ colors.grey.darker }
														/>
													</Link>
													<Text
														text={ specialty.speciality }
														className='pb-[10px]'
														fontSize='12px'
														fontWeight='400'
														lineHeight='14px'
														color={ colors.grey.dark }
													/>
												</div>
											);
										}) }
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

};

export default NewsDetail;