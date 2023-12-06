'use client';
import { usePathname } from 'next/navigation';
import {
	useEffect,
	useState
} from 'react';

import Link from 'next/link';
import Image from 'next/image';

import moment from 'moment';

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
import { ArticleState } from '@/interface';
import { useScopedI18n } from '@/locales/client';

import {
	fetchNewsSpecialtyByID,
	fetchDetail,
	fetchRelatedNews
} from './helpers';
import { baseUrl } from '@/config';

const DetailNewsHealthPage = (props: { params: { slug: any; }; }) => {
	const t = useScopedI18n('page.newsDetail');

	const pathname = usePathname();

	const [activeTabIdx, setActiveTabIdx] = useState(0);
	const [relatedNews, setRelatedNews] = useState<ArticleState['relatedNews']>([]);
	const [specialty, setSpecialty] = useState<ArticleState['specialty']>([]);
	const [selectedArticle, setSelectedArticle] = useState<ArticleState['selectedArticle']>({
		id: 0,
		title: '',
		content: '',
		created_by: '',
		created_at: '',
		is_publish: false,
		thubmnail: '',
		img_url: '',
		posted_date: '',
		category: '',
		author: '',
		slug: '',
		short_description: '',
		news_author: {
			doctor_name: '',
			img_url: '',
			speciality: '',
			sub_speciality: '',
		},
		hospitals: null,
		fullname_doctor: '',
		speciality: '',
	});

	useEffect(() => {
		fetchDetail(props.params.slug).then(function(response) {
			setSelectedArticle(response?.data);

			fetchNewsSpecialtyByID(response?.data?.id).then(function(response) {
				setSpecialty(response?.data);
			});
			fetchRelatedNews(response?.data?.id).then(function(response) {
				setRelatedNews(response?.data);
			});

		});
	}, []);

	const breadcrumbsPath = [{ name: t('breadcrumbsLabel'), url: '/news' }, { url: '#', name: selectedArticle?.title || '' }];

	return (
		<div>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] md:pt-[60px] pb-[60px]'>
				<div>
					<Breadcrumbs datas={ breadcrumbsPath } />
					<div className='mt-[70px]'>
						<div className='w-[81px]'>
							<Button label={ selectedArticle?.category } className='px-[8px] py-[6px]' />
						</div>
						<div className='sm:w-[729px]'>
							<Text fontWeight='900' fontSize='32px' lineHeight='48px' className='my-[20px]'>
								{ selectedArticle?.title }
							</Text>
							<Text
								text={ `${ t('oleh') } ${ selectedArticle?.news_author?.doctor_name }` }
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
									<Link href={ sosmedLink.facebook } target='_blank' className='cursor-pointer' >
										<Image src='/images/ic/facebook.svg' alt='RSPI Facebook link' width={ 16 } height={ 16 } />
									</Link>
									<Link href={ sosmedLink.twitter } target='_blank' className='cursor-pointer' >
										<Image src='/images/ic/twitter.svg' alt='RSPI twitter link' width={ 16 } height={ 16 } />
									</Link>
									<Link href={ sosmedLink.linkedin } target='_blank' className='cursor-pointer' >
										<Image src='/images/ic/LinkedIn/Negative.svg' alt='RSPI Linkedin link' width={ 16 } height={ 16 } />
									</Link>
									<div className='cursor-pointer' onClick={ () => { navigator.clipboard.writeText(typeof window !== 'undefined' ? window?.location?.href : '' ); } }>
										<Image src='/images/ic/Link.svg' alt='RSPI link' width={ 16 } height={ 16 } />
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

export default DetailNewsHealthPage;