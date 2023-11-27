'use client';

import moment from 'moment';
import { useRef, Key } from 'react';

import { colors } from '@/constant';
import { Button, Text } from '@/components/ui';
import Card, { CardContentWithInner, CardFooter, CardsScrollHorizontal } from '@/components/ui/Card';
import { useScopedI18n } from '@/locales/client';

const RelatedNewsMobile = (props: any) => {
	const CardWrapperRef = useRef<HTMLDivElement>(null);
	const t = useScopedI18n('page.centerOfExcellence');

	return (
		<CardsScrollHorizontal customRef={ CardWrapperRef }>
			{
				(props?.centerOfExcellenceNewsByID ?? []).map((article: any, index: Key) => (
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
						footer={ <CardFooter content={ t('serviceLocation.readMore') } /> }
						className='mb-0'
						iconShare={ true }
						to={ `/news/${ article?.news?.slug }` }
					/>
				))
			}
		</CardsScrollHorizontal>
	);
};

export default RelatedNewsMobile;