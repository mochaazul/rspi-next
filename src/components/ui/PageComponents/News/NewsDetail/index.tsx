'use client';
import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import TextHtml from '@/components/ui/TextHtml';
import { ArticleState } from '@/interface';
import { useScopedI18n } from '@/locales/client';

import {
	Breadcrumbs,
	Text,
	Tabs,
	Button
} from '@/components/ui';

import {
	colors,
	sosmedLink
} from '@/constant';
import dayjs from 'dayjs';
import { useCurrentLocale } from '@/locales/client';
import { useHostname } from '@/utils/useHostname';

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

	const hostname = useHostname({ fullUrl: true });

	const getLinkShareSocmed = (link: any) => {
		return link + hostname;
	};

	const renderNews = () => {
		return (
			<div>
				<div className='max-sm:mx-[15px] '>
					<Text fontType='p' fontWeight='700' fontSize='20px' lineHeight='30px'>
						{ filteredSelectedArticle?.short_description }
					</Text>
					<img alt={ filteredSelectedArticle?.title } src={ filteredSelectedArticle?.img_url } className='mx-auto my-[50px] lg:w-[729px] lg:h-[502px] object-cover' />
				
					<TextHtml
						className='innerHTML mt-[10px] '
						htmlStr={ filteredSelectedArticle?.content ?? '' }
					/>
				</div>
				{
					relatedNews.length > 0 || specialty.length > 0 ?
						<div className='bg-[#FAFAFA] max-sm:px-[15px] max-sm:py-[24px] max-sm:mt-[12px]'>
							<div className={ filteredSelectedArticle?.category === 'healthfirst' || relatedNews.length === 0 ? 'hidden' : 'sm:hidden' }>
								<span className='text-gray-1 font-black w-auto text-[16px] py-[5px] sm:border-b-[4px] border-b-[3px] border-green-secondary'>
									{ t('relatedNews') }
								</span>
								<div className='divide-y divide-solid pt-[10px] '>
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
														fontType='p'
														subClassName='text-[12px]'
													/>
													<Text
														fontType='h3'
														text={ a.title }
														className='pb-[10px]'
														fontSize='14px'
														fontWeight='900'
														lineHeight='24px'
														color={ colors.grey.darker }
														subClassName='text-[14px]'
													/>
												</Link>
											</div>
										);
									}) }
								</div>
							</div>

							<div className={ filteredSelectedArticle?.category === 'healthfirst' || specialty.length === 0 ? 'hidden' : 'sm:hidden' } >
								<span className='text-gray-1 font-black w-auto text-[16px] py-[5px] sm:border-b-[4px] border-b-[3px] border-green-secondary'>
									{ t('specialty') }
								</span>
								<div className='divide-y divide-solid pt-[10px]'>
									{ Object.values(specialty || [])?.map((specialty, index) => {
										return (
											<div key={ index }>
												<Text
													fontType='p'
													text={ specialty.fullname_doctor }
													className='py-[10px]'
													fontSize='14px'
													fontWeight='900'
													lineHeight='24px'
													color={ colors.grey.darker }
												/>
												<Text
													fontType='p'
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
						: <></>
				}
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
						<Text
							fontType='p'
							fontWeight='700'
							fontSize='20px'
							lineHeight='30px'>
							{ filteredSelectedArticle?.short_description }
						</Text>
						<TextHtml
							className='innerHTML mt-[10px]'
							htmlStr={ filteredSelectedArticle?.content ?? '' }
						/>
						<Link href={ filteredSelectedArticle?.pdf_url } className='text-gray-500 font-bold cursor-pointer' >{ t('downloadFilePdf') } <span className='text-orange-700'>{ t('here') }</span> </Link>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div>
			<div className='lg:w-[1110px] mx-auto pb-[60px]'>
				<div>
					<div className='max-sm:px-[15px]'>

						<Breadcrumbs datas={ breadcrumbsPath } />
					</div>
					<div className={ ' mt-[50px] max-sm:mt-[25px]' }>
						<div className='w-fit max-sm:px-[15px]'>
							<Button label={ filteredSelectedArticle?.category } className='px-[20px] py-[10px] max-sm:px-[18px] max-sm:py-[4px] capitalize max-sm:text-[14px] max-sm:font-normal' />
						</div>
						<div className={ `${ filteredSelectedArticle?.category === 'healthfirst' ? 'w-full' : 'sm:w-[729px] ' } max-sm:px-[15px]` }>
							<Text
								fontType='h1'
								fontWeight='900'
								fontSize='32px'
								lineHeight='48px'
								className='my-[20px]'
								subClassName='max-sm:text-[24px] max-sm:leading-[32px]'
							>
								{ filteredSelectedArticle?.title }
							</Text>
							{
								filteredSelectedArticle?.news_author?.doctor_name ?
									<Text
										fontType='p'
										fontWeight='400'
										fontSize='18px'
										lineHeight='22px'
										color={ colors.grey.dark }
										className='max-sm:mt-[12px]'
									>
										<span>{ t('oleh') }{ ' ' }</span>
										<Link href={ `/doctor/${ filteredSelectedArticle?.author }` } className='hover:underline'>
											<span>{ filteredSelectedArticle?.news_author?.doctor_name }</span>
										</Link>
									</Text>
									: <></>
							}

							<div className='flex items-center gap-[30px] mt-[20px] max-sm:mt-[4px]'>
								<Text
									text={ dayjs(filteredSelectedArticle?.posted_date).locale(currentLang)
										.format('dddd, DD MMMM YYYY') }
									fontWeight='400'
									fontSize='18px'
									lineHeight='22px'
									fontType='p'
									color={ colors.grey.dark }
								/>
								<span className='font-[18px] text-gray-2'>&#x2022;</span>
								<div className='flex gap-[15px]'>
									<Link href={ getLinkShareSocmed(sosmedLink.facebook) ?? ''  } target='_blank' className='cursor-pointer' >
										<Image src='/images/ic/facebook.svg' alt='RSPI Facebook link' width={ 16 } height={ 16 } />
									</Link>
									<Link href={ getLinkShareSocmed(sosmedLink.twitter) ?? ''  } target='_blank' className='cursor-pointer' >
										<Image src='/images/ic/twitter_x.svg' alt='RSPI twitter link' width={ 16 } height={ 16 } />
									</Link>
									<Link href={ getLinkShareSocmed(sosmedLink.linkedin) ?? ''  } target='_blank' className='cursor-pointer' >
										<Image src='/images/ic/LinkedIn/Negative.svg' alt='RSPI Linkedin link' width={ 16 } height={ 16 } />
									</Link>
									<div className='cursor-pointer' onClick={ () => {
										navigator?.clipboard?.writeText(hostname).then(() => {
											alert('URL Link copied');
										});
									} }>
										<Image src='/images/ic/Link.svg' alt='RSPI link' width={ 16 } height={ 16 } />
									</div>
								</div>
							</div>
						</div>
						<div className='content-wrapper flex mt-[50px] mb-[100px] max-sm:mt-[25px]'>
							<div className={ ` ${ filteredSelectedArticle?.category === 'healthfirst' ? 'w-full' : 'w-[729px]' } leftSide mt-0 ` }>
								{ filteredSelectedArticle?.category === 'healthfirst' ? renderHealthFirst() : renderNews() }
							</div>
							{ /* Dekstop View */ }
							<div className={ ` ${ filteredSelectedArticle?.category === 'healthfirst' ? 'hidden' : 'rightSide sm:ml-[32px] max-sm:hidden mr-auto w-[349px] ' } ` }>
								<div className={ filteredSelectedArticle?.category === 'healthfirst' ? 'hidden' : 'w-[349px]' }>
									<span className={ ` ${relatedNews.length === 0 ? 'hidden' : ''} text-gray-1 font-black w-auto text-[16px] py-[5px] sm:border-b-[4px] border-b-[3px] border-green-secondary` }>
										{ t('relatedNews') }
									</span>
									<div className='divide-y divide-solid pt-[10px]'>
										{ Object.values(relatedNews || [])?.map((a, index) => {
											return (
												<div key={ index }>
													<Link href={ `/news/${ a.slug }` }>
														<Text
															text={ dayjs(a.posted_date).locale(currentLang)
																.format('dddd, DD MMMM YYYY') }
															className='py-[10px]'
															fontSize='12px'
															fontType='p'
															fontWeight='400'
															lineHeight='14px'
															color={ colors.grey.dark }
														/>
														<Text
															fontType='h3'
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
									<span className={ `${specialty.length === 0 ? 'hidden' : ''} text-gray-1 font-black w-auto text-[16px] py-[5px] sm:border-b-[4px] border-b-[3px] border-green-secondary` }>
										{ t('specialty') }
									</span>
									<div className='divide-y divide-solid pt-[10px]'>
										{ Object.values(specialty || [])?.map((specialty, index) => {
											return (
												<div key={ index }>
													<Link href={ `/doctor/${ specialty.doctor_code }` } className='hover:underline'>
														<Text
															fontType='p'
															text={ specialty.fullname_doctor }
															className='py-[10px]'
															fontSize='14px'
															fontWeight='900'
															lineHeight='24px'
															color={ colors.grey.darker }
														/>
													</Link>
													<Text
														fontType='p'
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