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
						<img src={ selectedEvent?.img_url_detail || '' } className='mx-auto object-cover max-w-[450px] max-h-[624px] w-full' alt='' />
						<div>
							<TextHtml
								htmlStr={ selectedEvent?.content || '' }
								className='innerHTML text-xs max-md:!leading-[18px] sm:text-sm md:text-base'
							/>
							<div className='mt-[50px]'>
								<Text
									fontType='p'
									lineHeight='30px'
									fontSize='20px'
									fontWeight='900'
									color={ colors.paradiso.default }
									className='mt-[50px]'
									text={ t('schedule') }
								/>
								<div>
									<TextHtml
										className='innerHTML mt-5 leading-[30px] text-[20px] font-bold'
										htmlStr={ selectedEvent?.title }
									/>
									<div className='flex flex-col gap-1 mt-3'>
										{
											(selectedEvent?.hospitals ?? []).map((hospital: any, index: number) =>
												<Text
													fontType='p'
													key={ index }
													lineHeight='20px'
													fontSize='16px'
													fontWeight='900'
													color={ colors.grey.dark }
													text={ hospital?.hospital_name }
												/>
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
												color={ colors.grey.darker }
												text='Telepon (WhatsApp Only)'
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
					<div className=''>
						<div className='mt-[40px]'>
							<section
								className={ 'py-[20px] border-solid border-b-4 border-green-primary w-fit ' }
							>
								<Text
									text={ t('morePromo') }
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