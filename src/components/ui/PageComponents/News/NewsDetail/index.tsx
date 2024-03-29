import Link from 'next/link';
import TextHtml from '@/components/ui/TextHtml';
import { ArticleState } from '@/interface';

import { colors } from '@/constant';
import dayjs from 'dayjs';
import SocialShare from './SocialShare';
import { getCurrentLocale, getScopedI18n } from '@/locales/server';
import { Breadcrumbs, Button, Text } from '@/components/ui';

const NewsDetail = async({
	filteredSelectedArticle,
	specialty,
	relatedNews,
	breadcrumbsPath,
}: {
	filteredSelectedArticle: any,
	specialty: ArticleState[ 'specialty' ],
	relatedNews: ArticleState[ 'relatedNews' ],
	breadcrumbsPath: {
		name: string;
		url: string;
	}[],
}) => {

	const t = await getScopedI18n('page.newsDetail');
	const currentLang = getCurrentLocale();
	const renderNews = () => {
		return (
			<div className='max-sm:mx-[15px] '>
				<Text fontType='p' fontWeight='700' fontSize='20px' lineHeight='30px'>
					{ filteredSelectedArticle?.short_description }
				</Text>
				<img alt={ filteredSelectedArticle?.title } src={ filteredSelectedArticle?.img_url } className='mx-auto my-[50px] lg:w-[729px] lg:h-[502px] object-cover' />

				<TextHtml
					style={ { color: colors.grey.dark } }
					className='innerHTML mt-[10px]'
					htmlStr={ filteredSelectedArticle?.content ?? '' }
				/>

				<div className={ filteredSelectedArticle?.category === 'healthfirst' ? 'hidden' : 'sm:hidden' }>
					<section
						className={ 'py-[20px] border-solid border-b-4 border-green-primary w-fit ' }>
						<Text
							text={ 'Related News' }
							className=''
							fontWeight='700'
							color={ colors.paradiso.default } />
					</section>

					<div className='divide-y divide-solid pt-[10px]'>
						{ Object.values(relatedNews || []).map((a, index) => {
							return (
								<div key={ index }>
									<Link href={ `/news/${a.slug}` }>
										<Text
											text={ a.posted_date }
											className='py-[10px]'
											fontSize='12px'
											fontWeight='400'
											lineHeight='14px'
											color={ colors.grey.dark }
											fontType='p'
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
				{
					relatedNews.length > 0 || specialty.length > 0
						?
						<div className='bg-[#FAFAFA] max-sm:px-[15px] max-sm:py-[24px] max-sm:mt-[12px]'>
							<div className={ filteredSelectedArticle?.category === 'healthfirst' || relatedNews.length === 0 ? 'hidden' : 'sm:hidden' }>
								<span className='text-gray-1 font-black w-auto text-[16px] py-[5px] sm:border-b-[4px] border-b-[3px] border-green-secondary'>
									{ t('relatedNews') }
								</span>
								<div className='divide-y divide-solid pt-[10px] '>
									{ Object.values(relatedNews || []).map((a, index) => {
										return (
											<div key={ index }>
												<Link href={ `/news/${a.slug}` }>
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
						<div className={ `${filteredSelectedArticle?.category === 'healthfirst' ? 'w-full' : 'sm:w-[729px] '} max-sm:px-[15px]` }>
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
										<Link href={ `/doctor/${filteredSelectedArticle?.author}` } className='hover:underline'>
											<span>{ filteredSelectedArticle?.news_author?.doctor_name }</span>
										</Link>
									</Text>
									: <></>
							};

							<SocialShare date={ filteredSelectedArticle.posted_date } />
						</div >
						<div className='content-wrapper flex mt-[50px] mb-[100px] max-sm:mt-[25px]'>
							<div className={ ` ${filteredSelectedArticle?.category === 'healthfirst' ? 'w-full' : 'w-[729px]'} leftSide mt-0 ` }>
								{ filteredSelectedArticle?.category === 'healthfirst' ? renderHealthFirst() : renderNews() };
								<div className={ filteredSelectedArticle?.category === 'healthfirst' ? 'hidden' : 'sm:hidden' } >

									<section
										className={ 'py-[20px] border-solid border-b-4 border-green-primary w-fit ' }
									>
										<Text
											text={ 'Specialty' }
											className=''
											fontWeight='700'
											color={ colors.paradiso.default } />
									</section>
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
							</div >
							{ /* Dekstop View */ }
							< div className={ ` ${filteredSelectedArticle?.category === 'healthfirst' ? 'hidden' : 'rightSide sm:ml-[32px] max-sm:hidden mr-auto w-[349px] '} ` }>
								<div className={ filteredSelectedArticle?.category === 'healthfirst' ? 'hidden' : 'w-[349px]' }>
									<section
										className={ 'py-[20px] border-solid border-b-4 border-green-primary w-fit ' }
									>
										<Text
											text={ 'Related News' }
											className=''
											fontWeight='700'
											color={ colors.paradiso.default } />
									</section>
									<div className='divide-y divide-solid pt-[10px]'>
										{ Object.values(relatedNews || [])?.map((a, index) => {
											return (
												<div key={ index }>
													<Link href={ `/news/${a.slug}` }>
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
								</div >
								<div className={ filteredSelectedArticle?.category === 'healthfirst' ? 'hidden' : 'mt-[40px]' }>
									<section
										className={ 'py-[20px] border-solid border-b-4 border-green-primary w-fit ' }
									>
										<Text
											text={ 'Specialty' }
											className=''
											fontWeight='700'
											color={ colors.paradiso.default } />
									</section>
									<div className='divide-y divide-solid pt-[10px]'>
										{ Object.values(specialty || [])?.map((specialty, index) => {
											return (
												<div key={ index }>
													<Link href={ `/doctor/${specialty.doctor_code}` } className='hover:underline'>
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
								</div >
							</div >
						</div >
					</div >
				</div >
			</div >
		</div >
	);

};

export default NewsDetail;