'use client';

import { useEffect, useState } from 'react';

import { colors, icons, sosmedLink } from '@/constant';

import PromoPackages from '@/components/ui/PageComponents/LandingPageSections/PromoPackages';

import {
	Breadcrumbs,
	Text,
	Tabs,
} from '@/components/ui';

import Link from 'next/link';
import Image from 'next/image';
import { useScopedI18n } from '@/locales/client';
import TextHtml from '@/components/ui/TextHtml';

import { useHostname } from '@/utils/useHostname';

type Props = {
	selectedEvent: any;
    eventsOther: any;
    breadcrumbsPath: {
		name: string;
		url: string;
	}[],
};

const PromoDetail: React.FC<Props> = ({
	selectedEvent,
	breadcrumbsPath,
	eventsOther
}) => {
	const t = useScopedI18n('page.promoPage');
	const [activeTabIdx, setActiveTabIdx] = useState(0);
	const hostname = useHostname({ fullUrl: true });

	const getLinkShareSocmed = (link: any) => {
		return link + hostname;
	};

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
				<div className='flex items-center gap-[30px] mt-[10px]'>
					<div className='flex gap-[15px] items-center'>
						<Text
							fontType='p'
							lineHeight='24px'
							fontSize='20px'
							fontWeight='400'
							text='Share now'
						/>
						<div className='flex gap-[15px]'>
							<Link href={ getLinkShareSocmed(sosmedLink.facebook) ?? ''  } target='_blank' className='cursor-pointer' >
								<Image src='/images/ic/facebook.svg' alt='RSPI Facebook link' width={ 16 } height={ 16 } />
							</Link>
							<Link href={ getLinkShareSocmed(sosmedLink.twitter) ?? ''  } target='_blank' className='cursor-pointer' >
								<Image src='/images/ic/twitter_x.svg' alt='RSPI twitter link' width={ 16 } height={ 16 } />
							</Link>
							<Link href={ getLinkShareSocmed(sosmedLink.linkedin) ?? ''  } target='_blank' className='cursor-pointer' >
								<Image src='/images/ic/LinkedIn/Negative.svg' alt='RSPI Linkedin link' width={ 16 } height={ 16 } />
							</Link>
							<div className='cursor-pointer' onClick={ () => {
								navigator?.clipboard?.writeText(hostname).then(() => {
									alert('URL Link copied');
								});
							} }>
								<Image src='/images/ic/Link.svg' alt='RSPI link' width={ 16 } height={ 16 } />
							</div>
						</div>
					</div>
				</div>
				<div className='content-wrapper mt-[20px] mb-[100px]'>
					<div className='mt-[30px] w-full flex lg:flex-row md:flex-row xl:flex-row gap-8 flex-col'>
						<img src={ selectedEvent?.img_url_detail || '' } className='mx-auto object-cover max-w-[450px] max-h-[624px] w-full' alt='' />
						<div>
							<TextHtml
								htmlStr={  selectedEvent?.content || '' }
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
												htmlStr={  selectedEvent?.information || '' }
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
												htmlStr={  selectedEvent?.phone || '' }
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
												htmlStr={  selectedEvent?.operational_hour || '' }
												className='mt-2 innerHTML text-14 leading-[18px]'
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='mt-[100px]'>
						<div className='mt-[40px]'>
							<span className={ 'text-gray-1 font-bold w-auto text-2xl leading-[10px] border-b-[4px] border-green-secondary' }>
								{ t('more') }
							</span>
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