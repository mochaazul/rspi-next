import { useEffect, useState } from 'react';
import * as Icons from 'react-feather';
import moment from 'moment';

import {
	Breadcrumbs,
	Text,
	Tabs,
	Button
} from '@/components';
import { colors, icons, Languages as lang, sosmedLink } from '@/constant';
import { navigation } from '@/helpers';
import { getArticleByID, getRelatedNewsByID, getNewsSpecialtyByID } from '@/stores/Articles';
import { useAppDispatch, useTypedSelector } from '@/hooks';
import { ArticleState } from '@/interface';

const language = lang.page.newsDetail;

const relatedNews = [
	{
		date: 'Rabu, 20 Apr 2022',
		title: 'RS Pondok Indah Group Raih Validasi HIMSS EMRAM Tingkat 6, Pertama di Indonesia'
	},
	{
		date: 'Rabu, 20 Apr 2022',
		title: 'RS Pondok Indah Group Raih Validasi HIMSS EMRAM Tingkat 6, Pertama di Indonesia'
	}
];

const DetailNewsHealthPage = () => {
	const [activeTabIdx, setActiveTabIdx] = useState(0);
	const { params, pathname } = navigation();
	const { selectedArticle, specialty } = useTypedSelector<ArticleState>('articles');

	const detailArticleDispatch = useAppDispatch(getArticleByID);
	const relatedNewsArticleDispatch = useAppDispatch(getRelatedNewsByID);
	const specialityNewsArticleDispatch = useAppDispatch(getNewsSpecialtyByID);

	const breadcrumbsPath = [{ name: 'News & Health Articles', url: '/news' }, { url: '#', name: selectedArticle?.title || '' }];

	useEffect(() => {
		detailArticleDispatch({ id: params?.id });
		relatedNewsArticleDispatch({ id: params?.id, queryParam: { limit: 2 } });
		specialityNewsArticleDispatch({ id: params?.id, queryParam: { limit: 2 } });
	}, []);

	const handleOpenSocmed = (link: string) => () => {
		window.open(link, '_blank');
	};

	return (
		<div>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] md:pt-[60px] pb-[60px]'>
				<div>
					<Breadcrumbs datas={ breadcrumbsPath } />
					<div className='mt-[50px]'>
						<div className='w-[81px]'>
							<Button label={ selectedArticle?.category } className='px-[8px] py-[6px]' />
						</div>
						<div className='sm:w-[729px]'>
							<Text fontWeight='900' fontSize='32px' lineHeight='48px' className='my-[20px]'>
								{ selectedArticle?.title }
							</Text>
							<Text
								text={ `${ language.oleh } ${ selectedArticle?.news_author?.doctor_name }` }
								fontWeight='400'
								fontSize='18px'
								lineHeight='22px'
								color={ colors.grey.dark }
							/>
							<div className='flex items-center gap-[30px] mt-[20px]'>
								<Text
									text={ moment(selectedArticle?.posted_date).format('dddd, DD MMM YYYY') }
									fontWeight='400'
									fontSize='18px'
									lineHeight='22px'
									color={ colors.grey.dark }
								/>
								<div className='flex gap-[15px]'>
									<div className='cursor-pointer' onClick={ handleOpenSocmed(sosmedLink.facebook + window.location.href) }>
										<icons.FacebookIcon width='16px' height='16px' />
									</div>
									<div className='cursor-pointer' onClick={ handleOpenSocmed(sosmedLink.twitter + window.location.href) }>
										<icons.TwitterIcon width='16px' height='16px' />
									</div>
									<div className='cursor-pointer' onClick={ handleOpenSocmed(sosmedLink.linkedin + window.location.href) }>
										<icons.LinkedIn width='16px' height='16px' />
									</div>
									<div className='cursor-pointer' onClick={ () => { navigator.clipboard.writeText(pathname); } }>
										<Icons.Link width='16px' height='16px' />
									</div>
								</div>
							</div>
						</div>
						<div className='content-wrapper flex mt-[20px] mb-[100px]'>
							<div className='leftSide mt-[30px] w-[729px]'>
								<Text fontWeight='700' fontSize='20px' lineHeight='30px'>
									{ selectedArticle?.short_description }
								</Text>
								<img src={ selectedArticle?.img_url } className='mx-auto my-[50px] lg:w-[729px] lg:h-[502px] object-cover' />
								<div
									style={ { color: colors.grey.dark } }
									className='innerHTML mt-[10px]'
									dangerouslySetInnerHTML={ { __html: selectedArticle?.content || '' } }
								/>
								<div className='sm:hidden'>
									<Tabs
										activeTabIndex={ activeTabIdx }
										setActiveTabIndex={ setActiveTabIdx }
										tabsData={ ['Related News'] }
									/>
									<div className='divide-y divide-solid pt-[10px]'>
										{ relatedNews.map((a, index) => {
											return (
												<div key={ index }>
													<Text
														text={ a.date }
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
										{ specialty?.map((specialty, index) => {
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
										{ relatedNews?.map((a, index) => {
											return (
												<div key={ index }>
													<Text
														text={ a.date }
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
										{ specialty?.map((specialty, index) => {
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

export default DetailNewsHealthPage;