import { Key } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { isMobile } from 'react-device-detect';
import { redirect } from 'next/navigation';

import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import Card, { CardContentWithInner, CardFooter } from '@/components/ui/Card';
import { colors } from '@/constant';
import { getCoe, getCenterOfExcellenceNewsByID } from '@/lib/api';
import CardMenu from '@/components/ui/PageComponents/CenterOfExcellenceSections/CardMenu';
import ServiceLocation from '@/components/ui/PageComponents/CenterOfExcellenceSections/ServiceLocation';
import RelatedNewsMobile from '@/components/ui/PageComponents/CenterOfExcellenceSections/RelatedNewsMobile';
import { getScopedI18n } from '@/locales/server';

import { CentreOfExcellenceStyle } from './style';

const CentreOfExcellencePage = async ({ params }: { params: { slug: string; }; }) => {
	const t = await getScopedI18n('page.centerOfExcellence');

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

	const renderRelatedNewsDesktop = () => {
		return (
			<div className='flex flex-row gap-3'>
				{
					responseCenterOfExcellenceNewsByID?.data?.map((article: any, index: Key) => {
						return (
							<Card
								key={ index }
								id={ article?.news?.news_id }
								slug={ article?.news?.slug }
								image={ article?.news?.img_url }
								imageHeight='200px'
								header={
									<div className='flex items-center'>
										<div>
											<Button theme='primary' label={ article?.news?.category } className='btn-category' />
										</div>
										<div className='ml-[10px]'>
											<Text
												fontSize='14px'
												fontWeight='400'
												lineHeight='17px'
												color={ colors.grey.dark }
												text={ moment(article?.news?.posted_date).format('dddd, DD MMM YYYY') }
											/>
										</div>
									</div>
								}
								content={ <CardContentWithInner title={ article?.news?.title || '' } description={ article?.news?.short_description || '' } author={ article?.news?.news_author?.doctor_name } /> }
								footer={ <CardFooter content={ t('serviceLocation.readMore') } /> }
								className='mb-0'
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
		<CentreOfExcellenceStyle>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] pb-[60px]'>
				<div>
					<Breadcrumbs datas={ breadcrumbsPath } />
					<div className='content-wrapper mt-[64px] max-sm:mt-[24px]'>
						<div className='leftSide hidden sm:block w-[349px]'>
							<CardMenu data={ responseCenterOfExcellence?.data } activeMenuIndex={ newParam } />
						</div>
						<div className='rightSide sm:ml-[32px]'>
							<div>
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
					</div>
					{
						!_.isEmpty(responseCenterOfExcellenceNewsByID?.data) &&
						<div className='mt-[120px]'>
							<Text
								text={ t('serviceLocation.relatedArticle') }
								className='related'
								fontWeight='700'
								fontSize='24px'
								lineHeight='29px'
							/>
							<div className='overflow-auto'>
								{ isMobile ? <RelatedNewsMobile centerOfExcellenceNewsByID={ responseCenterOfExcellenceNewsByID?.data } /> : renderRelatedNewsDesktop() }
							</div>
						</div>
					}
				</div>
			</div>
		</CentreOfExcellenceStyle>
	);
};

export default CentreOfExcellencePage;