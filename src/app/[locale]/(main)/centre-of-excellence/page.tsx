'use client';

import { useState, useEffect } from 'react';
import moment from 'moment';
import { useRouter } from 'next/navigation';

import { Breadcrumbs, Text, Button } from '@/components';
import Card, { CardContentWithInner, CardFooter } from '@/components/Card';
import { colors, Languages as lang } from '@/constant';
import { CenterOfExcellenceState } from '@/interface';
import { getCenterOfExcellence, getCenterOfExcellenceNewsByID } from '@/stores/CenterOfExcellence';
import { useAppDispatch, useTypedSelector } from '@/hooks';
import { navigation } from '@/helpers';

import Servicelocation from './ServiceLocation';
import { CentreOfExcellenceStyle } from './style';
import { clinicPageEvent } from '@/utils/metaPixelTrack';
import CardMenu from './CardMenu';
import _ from 'lodash';

const language = lang.page.centerOfExcellence.serviceLocation;

const CentreOfExcellencePage = () => {
	const [activeMenuIndex, setActiveMenuIndex] = useState(0);

	const navigate = useRouter();
	const { params } = navigation();
	const { centerOfExcellence, relatedNews } = useTypedSelector<CenterOfExcellenceState>('centerOfExcellence');
	const centerOfExcellenceDispatch = useAppDispatch(getCenterOfExcellence);
	const centerOfExcellenceNewsDispatch = useAppDispatch(getCenterOfExcellenceNewsByID);

	const breadcrumbsPath = [
		{ name: 'Centre Of Excellence', url: '/center-of-excellence' },
		{ url: '#', name: centerOfExcellence?.find(coe => coe.id === activeMenuIndex)?.title ?? '' }
	];

	useEffect(() => {
		clinicPageEvent();
	}, []);

	useEffect(() => {
		centerOfExcellenceDispatch({
			queryParam: {
				is_publish: true,
			}
		});
		centerOfExcellenceNewsDispatch({
			id: activeMenuIndex,
			queryParam: {
				limit: 9,
			}
		});
	}, [activeMenuIndex]);

	useEffect(() => {
		if (activeMenuIndex === 0) {
			setActiveMenuIndex(centerOfExcellence[0].id ?? 0);
		}
	}, [centerOfExcellence]);

	useEffect(() => {
		if (+ (params?.id ?? 0) !== activeMenuIndex) {
			setActiveMenuIndex(+ (params?.id ?? 0));
		}
	}, [params]);

	return (
		<CentreOfExcellenceStyle>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] md:pt-[60px] pb-[60px]'>
				<div>
					<Breadcrumbs datas={ breadcrumbsPath } />
					<div className='content-wrapper mt-[64px]'>
						<div className='leftSide hidden sm:block w-[349px]'>
							<CardMenu data={ centerOfExcellence } activeMenuIndex={ activeMenuIndex } />
						</div>
						<div className='rightSide sm:ml-[32px]'>
							<div>
								{
									centerOfExcellence?.filter(coe => coe.id === activeMenuIndex).length > 0 ?
										<Servicelocation
											content={ centerOfExcellence?.find(coe => coe.id === activeMenuIndex) }
											activeMenuIndex={ activeMenuIndex }
										/> :
										null
								}
							</div>
						</div>
					</div>
					{
						!_.isEmpty(relatedNews) &&
						<div className='mt-[120px]'>
							<Text
								text={ language.relatedArticle }
								className='related'
								fontWeight='700'
								fontSize='24px'
								lineHeight='29px'
							/>
							<div className='grid grid-cols-3 gap-3'>
								{
									relatedNews?.map((article, index) => (
										<Card
											key={ index }
											id={ article?.news?.id }
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
											footer={ <CardFooter content='Read More' /> }
											className='mb-0'
											iconShare={ true }
											to={ `/news/${ article?.news?.news_id }` }
										/>
									))
								}
							</div>
						</div>
					}
				</div>
			</div>
		</CentreOfExcellenceStyle>
	);
};

export default CentreOfExcellencePage;