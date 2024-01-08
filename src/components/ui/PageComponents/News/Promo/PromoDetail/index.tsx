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
			<Breadcrumbs datas={ breadcrumbsPath } />
			<div className='mt-[50px]'>
				<Text
					fontType='h1'
					fontWeight='900'
					fontSize='44px'
					lineHeight='57px'>
					{ selectedEvent?.title }
				</Text>
				<SocialShare />
				<div className='content-wrapper mt-[20px] mb-[100px]'>
					<div className='mt-[30px] w-full flex lg:flex-row md:flex-row xl:flex-row gap-8 flex-col'>
						<img src={ selectedEvent?.img_url_detail || '' } className='mx-0 object-cover max-w-[450px] max-h-[624px] w-full' alt='' />
						<div className='mx-[16px] sm:mx-0 '>
							<TextHtml
								htmlStr={ selectedEvent?.content || '' }
								className='innerHTML text-xs max-md:!leading-[18px] sm:text-sm md:text-base'
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
									<div className='grid grid-cols-2 gap-4 mt-6'>
										<div>
											<Text
												fontType='p'
												lineHeight='18px'
												fontSize='14px'
												fontWeight='900'
												color={ colors.grey.darker }
												text='Informasi'
											/>
											<TextHtml
												htmlStr={ selectedEvent?.information || '' }
												className='innerHTML mt-2 text-14'
											/>
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
											<TextHtml
												style={ { color: colors.grey.dark } }
												htmlStr={ selectedEvent?.phone || '' }
												className='mt-2 innerHTML text-14 leading-[18px] font-bold'
											/>
										</div>
										<div>
											<Text
												fontType='p'
												lineHeight='18px'
												fontSize='14px'
												fontWeight='900'
												color={ colors.grey.darker }
												text='Jam Operasional'
											/>
											<TextHtml
												htmlStr={ selectedEvent?.operational_hour || '' }
												className='mt-2 innerHTML text-14 leading-[18px]'
											/>
										</div>
										
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='sm:mt-[100px] mt-[40px] mx-[16px] sm:mx-0 '>
						<div className='mt-[40px]'>
							<section
								className={ 'py-[20px] border-solid border-b-4 border-green-primary w-fit ' }
							>
								<Text
									text={ t('more') }
									className=''
									fontWeight='700'
									color={ colors.paradiso.default } />
							</section>
							<div className='pt-[10px]' />
							<PromoPackages showAsRelated={ true } events={ eventsOther } />
						</div>
					</div>
				</div>
			</div>
		</div>
	);

};

export default PromoDetail;