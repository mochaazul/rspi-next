'use client';
import { useRef } from 'react';
import moment from 'moment';
import 'moment/locale/id';

import { WrapperNewsHealthArticles } from './style';

import { ArticleDetail } from '@/interface';
import Text from '@/components/ui/Text';
import Link from 'next/link';
import { colors, icons } from '@/constant';
import Card, { CardContentWithInner, CardFooter, CardsScrollHorizontal } from '@/components/ui/Card';
import { splitDate } from '@/helpers/datetime';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { EmptyData } from '@/components/ui';
import SliderNav from '@/components/ui/SliderNav';

interface NewsProps {
	articles: ArticleDetail[];
}

const NewsHealthArticles: React.FC<NewsProps> = ({ articles }) => {

	const currLang = useCurrentLocale();
	const t = useScopedI18n('page.landingPage.newsHealthArticle');

	const CardNewsWrapperRef = useRef<HTMLDivElement>(null);

	const handleArrowClick = (direction: 'left' | 'right') => () => {
		CardNewsWrapperRef.current?.scrollBy({
			left: direction === 'left' ? -382 : 382,
			behavior: 'smooth'
		});
	};

	const renderSeeAll = () => {
		return (
			<Link href='/news'>
				<div className='see-all flex row items-center'>
					<Text fontSize='16px' fontType='p' fontWeight='900' color={ colors.paradiso.default } subClassName='text-right'>
						{ t('allItemBtnLabel') }
					</Text>
					<icons.LongArrowRight className='svg-green ml-2' />
				</div>
			</Link>
		);
	};

	return (
		<WrapperNewsHealthArticles className='w-full'>
			<div className='flex row justify-between items-center container-content'>
				<Text fontSize='44px' fontType='h2' fontWeight='900' color={ colors.grey.darker } lineHeight='57px' subClassName='heading-section'>
					{ t('heading') }
				</Text>
				<div className='slider-title mt-3 max-sm:hidden'>
					{ renderSeeAll() }
				</div>
			</div>
			{ articles.length !== 0 ?
				<div className='flex flex-row w-full mt-6 sm:mt-[58px] relative'>
					<CardsScrollHorizontal customRef={ CardNewsWrapperRef }>
						<>
							{
								articles?.map((article, index) => {
									return (
										<Card
											id={ article?.id }
											slug={ article?.slug }
											language={ article?.language }
											image={ article.img_url }
											imageHeight='200px'
											key={ index }
											to={ `/news/${ article?.slug }` }
											className='max-sm:w-[92%] !m-0'
											header={
												<Text
													text={ moment(splitDate(article?.posted_date)).locale(currLang)
														.format('dddd, DD MMM YYYY') }
													fontWeight='400'
													fontSize='14px'
													lineHeight='17px'
													color={ colors.grey.dark }
													subClassName='max-sm:text-[12px]'
												/>
											}
											content={ <CardContentWithInner title={ article.title } description={ article.short_description } /> }
											footer={ <CardFooter content={ t('readMoreBtnLabel') } /> }
											iconShare={ true }
										/>
									);
								}) || []
							}
						</>
					</CardsScrollHorizontal>
					<SliderNav
						onNext={ handleArrowClick('right') }
						onPrev={ handleArrowClick('left') }
					/>
				</div>
				:
				<Text textAlign='center' fontSize='20px' color={ colors.grey.dark } className='mt-[20px]'>
					<EmptyData menu={ t('heading') } />
				</Text>
			}
			<div className='w-full mt-6 flex justify-center sm:hidden'>
				{ renderSeeAll() }
			</div>

		</WrapperNewsHealthArticles>
	);
};

export default NewsHealthArticles;