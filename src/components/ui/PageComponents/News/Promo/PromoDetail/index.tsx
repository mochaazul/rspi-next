'use server';

import { colors } from '@/constant';

import PromoPackages from '@/components/ui/PageComponents/LandingPageSections/PromoPackages';

import {
	Breadcrumbs,
	Text,
} from '@/components/ui';

import TextHtml from '@/components/ui/TextHtml';

import SocialShare from './SocialShare';
import { getScopedI18n } from '@/locales/server';
import BreadcrumbsServer from '@/components/ui/Breadcrumbs/server';
import LangWrapper from '@/components/ui/LangWrapper';

type Props = {
	selectedEvent: any;
	eventsOther: any;
	breadcrumbsPath: {
		name: string;
		url: string;
	}[],
};

const PromoDetail: React.FC<Props> = async({
	selectedEvent,
	breadcrumbsPath,
	eventsOther
}) => {
	const t = await getScopedI18n('page.promoPage');

	return (
		<div>
			<div className='max-sm:mx-[16px]'>
				<BreadcrumbsServer datas={ breadcrumbsPath } />
			</div>
			<div className='mt-[50px] max-sm:mt-[25px]'>
				<Text
					subClassName='max-sm:text-[24px]'
					className='max-sm:mx-[16px]'
					fontType='h1'
					fontWeight='900'
					fontSize='44px'
					lineHeight='57px'>
					{ selectedEvent?.title }
				</Text>
				<LangWrapper>
					<SocialShare />
				</LangWrapper>
				<div className='content-wrapper mt-[20px] max-sm:mt-[24px] mb-[100px]'>
					<div className='mt-[30px] w-full flex lg:flex-row md:flex-row xl:flex-row gap-8 flex-col'>
						<img src={ selectedEvent?.img_url_detail || '' } className='mx-0 object-cover max-w-[450px] max-h-[624px] w-full rounded-[5px] max-sm:rounded-none' alt='' />
						<div className='mx-[16px] sm:mx-0 '>
							<TextHtml
								htmlStr={ selectedEvent?.content || '' }
								className='innerHTML !h-auto'
							/>
							<div className='mt-[50px]'>
								<p className={ 'sm:leading-[30px] leading-[24px] sm:text-[20px] text-[16px] font-bold text-green-secondary mt-[50px]' }>
									{ t('schedule') }
								</p>
								
								<div>
									<TextHtml
										className='innerHTML mt-5 leading-[30px] sm:text-[20px] text-[16px] font-bold'
										htmlStr={ selectedEvent?.title }
									/>
									<div className='flex flex-col gap-1 mt-3'>
										{
											(selectedEvent?.hospitals ?? []).map((hospital: any, index: number) =>
												<p key={ index } className='leading-[20px] font-bold sm:text-[16px] text-[14px] text-gray-2'>
													{ hospital?.hospital_name }
												</p>
											)
										}
									</div>
									<div className='grid sm:grid-cols-2 grid-cols-1 gap-4 mt-6'>
										<div className='flex flex-col gap-4'>
											<div>
												<Text
													fontType='p'
													lineHeight='18px'
													fontSize='14px'
													fontWeight='900'
													color={ colors.grey.darker }
													text={ t('info') }
												/>
												{
													selectedEvent?.information ?
														<TextHtml
															htmlStr={ selectedEvent?.information || '' }
															className='innerHTML mt-2'
														/> : <></>
												}
											</div>
											<div>
												<Text
													fontType='p'
													lineHeight='18px'
													fontSize='14px'
													fontWeight='900'
													color={ colors.grey.darker }
													text={ t('operational') }
												/>
												{
													selectedEvent?.operational_hour ?
														<TextHtml
															htmlStr={ selectedEvent?.operational_hour || '' }
															className='mt-2 innerHTML'
														/> : <></>
												}
												
											</div>
										</div>

										<div>
											<Text
												fontType='p'
												lineHeight='18px'
												fontSize='14px'
												fontWeight='900'
												className='text-gray-1'
												text={ t('phone') }
											/>
											{
												selectedEvent?.phone ?
													<TextHtml
														htmlStr={ selectedEvent?.phone || '' }
														className='mt-2 innerHTML font-bold text-green-secondary'
													/> : <></>
											}
											
										</div>
										
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='sm:mt-[100px] mt-[40px] mx-[16px] sm:mx-0 '>
						<div className='mt-[40px]'>
							<span className={ 'text-gray-1 font-bold w-auto sm:text-2xl text-[16px] py-[5px] sm:border-b-[4px] border-b-[2px] border-green-secondary' }>
								{ t('more') }
							</span>
							<div className='pt-[10px]' />
							<LangWrapper>
								<PromoPackages showAsRelated={ true } events={ eventsOther } />
							</LangWrapper>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

};

export default PromoDetail;