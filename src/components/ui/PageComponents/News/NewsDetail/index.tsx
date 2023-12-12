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

	return (
		<div>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] pb-[60px]'>
				<div>
					<Breadcrumbs datas={ breadcrumbsPath } />
					<div className='mt-[70px]'>
						<div className='w-[81px]'>
							<Button label={ filteredSelectedArticle?.category } className='px-[8px] py-[6px]' />
						</div>
						<div className='sm:w-[729px]'>
							<Text fontWeight='900' fontSize='32px' lineHeight='48px' className='my-[20px]'>
								{ filteredSelectedArticle?.title }
							</Text>
							<Text
								text={ `${ t('oleh') } ${ filteredSelectedArticle?.news_author?.doctor_name }` }
								fontWeight='400'
								fontSize='18px'
								lineHeight='22px'
								color={ colors.grey.dark }
							/>
							<div className='flex items-center gap-[30px] mt-[20px]'>
								<Text
									text={ moment(filteredSelectedArticle?.posted_date).format('dddd, DD MMM YYYY') }
									fontWeight='400'
									fontSize='18px'
									lineHeight='22px'
									color={ colors.grey.dark }
								/>
								<div className='flex gap-[15px]'>
									<Link href={ sosmedLink.facebook } target='_blank' className='cursor-pointer' >
										<Image src='/images/ic/facebook.svg' alt='RSPI Facebook link' width={ 16 } height={ 16 } />
									</Link>
									<Link href={ sosmedLink.twitter } target='_blank' className='cursor-pointer' >
										<Image src='/images/ic/twitter.svg' alt='RSPI twitter link' width={ 16 } height={ 16 } />
									</Link>
									<Link href={ sosmedLink.linkedin } target='_blank' className='cursor-pointer' >
										<Image src='/images/ic/LinkedIn/Negative.svg' alt='RSPI Linkedin link' width={ 16 } height={ 16 } />
									</Link>
									<div className='cursor-pointer' onClick={ () => {
										navigator.clipboard.writeText(window?.location?.href).then(() => {
											alert('URL Link copied');
										});
									} }>
										<Image src='/images/ic/Link.svg' alt='RSPI link' width={ 16 } height={ 16 } />
									</div>
								</div>
							</div>
						</div>
						<div className='content-wrapper flex mt-[20px] mb-[100px]'>
							<div className='leftSide mt-[30px] w-[729px]'>
								<Text fontWeight='700' fontSize='20px' lineHeight='30px'>
									{ filteredSelectedArticle?.short_description }
								</Text>
								<img alt={ filteredSelectedArticle?.title } src={ filteredSelectedArticle?.img_url } className='mx-auto my-[50px] lg:w-[729px] lg:h-[502px] object-cover' />
								<div
									style={ { color: colors.grey.dark } }
									className='innerHTML mt-[10px]'
									dangerouslySetInnerHTML={ { __html: filteredSelectedArticle?.content || '' } }
								/>
								<div className='sm:hidden'>
									<Tabs
										activeTabIndex={ activeTabIdx }
										setActiveTabIndex={ setActiveTabIdx }
										tabsData={ ['Related News'] }
									/>
									<div className='divide-y divide-solid pt-[10px]'>
										{ Object.values(relatedNews || []).map((a, index) => {
											return (
												<div key={ index }>
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
												</div>
											);
										}) }
									</div>
								</div>
								<div className='sm:hidden'>
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
							<div className='rightSide sm:ml-[32px] max-sm:hidden mr-auto w-[349px]'>
								<div className='w-[349px]'>
									<Tabs
										activeTabIndex={ activeTabIdx }
										setActiveTabIndex={ setActiveTabIdx }
										tabsData={ ['Related News'] }
									/>
									<div className='divide-y divide-solid pt-[10px]'>
										{ Object.values(relatedNews || [])?.map((a, index) => {
											return (
												<div key={ index }>
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
												</div>
											);
										}) }
									</div>
								</div>
								<div className='mt-[40px]'>
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);

};

export default NewsDetail;