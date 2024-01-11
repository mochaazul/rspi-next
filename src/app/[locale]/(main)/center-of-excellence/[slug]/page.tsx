import { Key } from 'react';
import moment from 'moment';
import 'moment/locale/id';
import _ from 'lodash';
import { redirect } from 'next/navigation';

import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Text from '@/components/ui/Text';
import Card, { CardFooter } from '@/components/ui/Card';
import { colors } from '@/constant';
import { getCoe, getCenterOfExcellenceNewsByID } from '@/lib/api';
import CardMenu from '@/components/ui/PageComponents/CenterOfExcellenceSections/CardMenu';
import ServiceLocation from '@/components/ui/PageComponents/CenterOfExcellenceSections/ServiceLocation';
import TextHtml from '@/components/ui/TextHtml';
import { getCurrentLocale, getScopedI18n } from '@/locales/server';

import LangWrapper from '@/components/ui/LangWrapper';

const CentreOfExcellencePage = async({ params }: { params: { slug: string; }; }) => {
	const t = await getScopedI18n('page.centerOfExcellence');
	const currentLang = getCurrentLocale();

	const responseCenterOfExcellence = await getCoe({ limit: 1000 });

	const newParam = decodeURIComponent(params?.slug);

	if (responseCenterOfExcellence?.data?.filter(coe => `${ coe.slug }` === newParam).length <= 0) {
		redirect(`/center-of-excellence/${ responseCenterOfExcellence?.data[0]?.slug }`);
	};

	const filteredResponseCenterOfExcellence = responseCenterOfExcellence?.data?.find(coe => {
		return coe?.slug === newParam;
	});

	const responseCenterOfExcellenceNewsByID = await getCenterOfExcellenceNewsByID({
		param: `${ filteredResponseCenterOfExcellence?.id }`,
		query: {
			limit: 9,
		}
	});

	const breadcrumbsPath = [
		{ name: t('heading'), url: '#' },
		{ url: '#', name: responseCenterOfExcellence?.data?.find(coe => `${ coe.slug }` === newParam)?.title ?? '' }
	];

	const renderRelatedNews = () => {
		return (
			<div className='flex max-md:flex-nowrap max-md:overflow-x-auto scrolling-touch scroll-smooth md:grid md:grid-cols-3 gap-4 xl2:gap-[30px] mt-4 md:mt-[30px]'>
				{
					responseCenterOfExcellenceNewsByID?.data?.slice(0, 3)?.map((article: any, index: Key) => {
						return (
							<Card
								key={ index }
								id={ article?.news?.news_id }
								slug={ article?.news?.slug }
								language={ article?.news?.language }
								image={ article?.news?.img_url }
								imageHeight='200px'
								header={
									<div className='flex items-center gap-2 sm:gap-2.5'>
										<div>
											<span className='rounded-[5px] px-2 sm:px-2.5 py-1 sm:py-[5px] cursor-default font-normal text-xs sm:text-sm bg-[#358888] text-white flex items-center justify-center capitalize'>
												{ article?.news?.category }
											</span>
										</div>
										<Text
											fontSize='14px'
											fontWeight='400'
											lineHeight='17px'
											color={ colors.grey.dark }
											subClassName='max-sm:text-xs'
											text={ moment(article?.news?.posted_date).locale(currentLang)
												.format('dddd, DD MMM YYYY') }
										/>
									</div>
								}
								content={
									<div className='mt-1 sm:mt-[5px]'>
										<Text
											fontSize='20px'
											fontType='h3'
											fontWeight='900'
											color={ colors.grey.darker }
											text={ article?.news?.title || '' }
											lineHeight='28px'
											subClassName='max-sm:text-base' />

										<Text
											fontSize='14px'
											fontWeight='400'
											color={ colors.grey.dark }
											text={ article?.news?.news_author?.doctor_name }
											className='mt-1 sm:mt-[5px]'
											subClassName='max-sm:!text-xs max-sm:leading-[18px]'
											lineHeight='24px'
										/>

										<TextHtml
											className='text-xs max-sm:leading-[18px] sm:text-sm md:text-base md:leading-[23px] mt-2 sm:mt-3 line-clamp-3'
											style={ { color: colors.grey.dark } }
											htmlStr={ article?.news?.short_description || '' } />
									</div>
								}
								footer={ <CardFooter content={ t('serviceLocation.readMore') } textClassName='max-sm:text-xs' /> }
								className='!m-0 w-[92%] md:w-full'
								iconShare={ true }
								to={ `/news/${ article?.news?.slug }` }
							/>
						);
					})
				}
			</div>
		);
	};

	return (
		<div className='w-full lg:max-w-[1110px] mx-auto max-xl:px-4 pb-8 sm:pb-[60px]'>
			<div>
				<LangWrapper>
					<Breadcrumbs datas={ breadcrumbsPath } />
				</LangWrapper>
				<div className='flex md:gap-5 lg:gap-8 md:mt-[64px] mt-[25px]'>
					<div className='hidden md:block'>
						<CardMenu data={ responseCenterOfExcellence?.data } activeMenuIndex={ newParam } />
					</div>
					<div className='w-full'>
						{
							responseCenterOfExcellence?.data?.filter(coe => `${ coe.slug }` === newParam).length > 0
								?
								<ServiceLocation
									content={ responseCenterOfExcellence?.data?.find(coe => `${ coe.slug }` === newParam) }
									activeMenuIndex={ newParam }
									centerOfExcellence={ responseCenterOfExcellence?.data }
								/>
								:
								null
						}
					</div>
				</div>
				{
					!_.isEmpty(responseCenterOfExcellenceNewsByID?.data) &&
					<div className='mt-8 md:mt-[82px]'>
						<Text
							text={ t('serviceLocation.relatedArticle') }
							className='border-b-2 md:border-b-4 border-green-secondary w-fit pb-1'
							fontWeight='700'
							fontSize='24px'
							lineHeight='29px'
							subClassName='max-sm:!text-base'
						/>
						{ renderRelatedNews() }
					</div>
				}
			</div>
		</div>
	);
};

export default CentreOfExcellencePage;