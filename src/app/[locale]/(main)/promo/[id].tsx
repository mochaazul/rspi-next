import { useEffect, useState } from 'react';
import * as Icons from 'react-feather';

import {
	Breadcrumbs,
	Text,
	Tabs,
	Layout,
	Spinner
} from '@/components';
import { colors, icons, sosmedLink } from '@/constant';
import { navigation } from '@/helpers';
import { getEventsByID } from '@/stores/EventClasses';
import { useAppDispatch, useTypedSelector } from '@/hooks';
import { EventClassesState } from '@/interface';
import PromoPackages from 'pages/LandingPage/PromoPackages';
import Image from 'next/image';

const DetailEventClassesPromo = () => {
	const [activeTabIdx, setActiveTabIdx] = useState(0);
	const { params, pathname } = navigation();
	const eventClassesSelector = useTypedSelector<EventClassesState>('events');
	const { selectedEvent } = eventClassesSelector;

	const detailArticleDispatch = useAppDispatch(getEventsByID);

	const breadcrumbsPath = [{ name: 'Promo & Packages', url: '/promo' }, { url: '#', name: selectedEvent?.title || '' }];

	useEffect(() => {
		detailArticleDispatch({ id: params?.id });
	}, []);

	useEffect(() => {
		if (params?.id !== eventClassesSelector.selectedEvent?.id) {
			detailArticleDispatch({ id: params?.id });
		}
	}, [params]);

	const handleOpenSocmed = (link: string) => () => {
		window.open(link, '_blank');
	};

	return (
		<Layout.PanelV1>
			<Layout.PanelH1>
				<Breadcrumbs datas={ breadcrumbsPath } />
				{
					eventClassesSelector.loading ?
						<Spinner size='m' className='sm:my-48 my-3' /> :
						<div className='mt-[50px]'>
							<Text fontWeight='900' fontSize='44px' lineHeight='57px'>
								{ selectedEvent?.title }
							</Text>
							<div className='flex items-center gap-[30px] mt-[10px]'>
								<div className='flex gap-[15px] items-center'>
									<Text
										lineHeight='24px'
										fontSize='20px'
										fontWeight='400'
										text='Share now'
									/>
									<div className='cursor-pointer' onClick={ handleOpenSocmed(sosmedLink.facebook + window.location.href) }>
										<Image src={icons.FacebookIcon} width={16} height={16} />
									</div>
									<div className='cursor-pointer' onClick={ handleOpenSocmed(sosmedLink.twitter + window.location.href) }>
										<Image src={icons.TwitterIcon} width={16} height={16} />
									</div>
									<div className='cursor-pointer' onClick={ handleOpenSocmed(sosmedLink.linkedin + window.location.href) }>
										<Image src={icons.LinkedIn} width={16} height={16} />
									</div>
									<div className='cursor-pointer' onClick={ () => { navigator.clipboard.writeText(pathname); } }>
										<Image src={icons.Link} width={16} height={16} />
									</div>
								</div>
							</div>
							<div className='content-wrapper mt-[20px] mb-[100px]'>
								<div className='mt-[30px] w-full flex gap-8'>
									<img src={ selectedEvent?.img_url_detail } className='mx-auto object-cover max-w-[450px] max-h-[624px]' />
									<div>
										<div
											className='innerHTML'
											dangerouslySetInnerHTML={ { __html: selectedEvent?.content || '' } }
										/>
										<div className='mt-[50px]'>
											<Text
												lineHeight='30px'
												fontSize='20px'
												fontWeight='900'
												color={ colors.paradiso.default }
												className='mt-[50px]'
												text='Jadwal'
											/>
											<div>
												<Text
													lineHeight='30px'
													fontSize='20px'
													fontWeight='900'
													color={ colors.grey.darker }
													className='mt-5'
													text={ selectedEvent?.title }
												/>
												<div className='flex flex-col gap-1 mt-3'>
													{
														(selectedEvent?.hospitals ?? []).map((hospital, index) =>
															<Text
																key={ index }
																lineHeight='20px'
																fontSize='16px'
																fontWeight='900'
																color={ colors.grey.dark }
																text={ hospital.hospital_name }
															/>
														)
													}
												</div>
												<div className='grid grid-cols-2 gap-4 mt-6'>
													<div>
														<Text
															lineHeight='18px'
															fontSize='14px'
															fontWeight='900'
															color={ colors.grey.darker }
															text='Informasi'
														/>
														<div
															className='mt-2 innerHTML text-14'
															dangerouslySetInnerHTML={ { __html: selectedEvent?.information ?? '' } }
														/>
													</div>
													<div>
														<Text
															lineHeight='18px'
															fontSize='14px'
															fontWeight='900'
															color={ colors.grey.darker }
															text='Telepon (WhatsApp Only)'
														/>
														<div
															className='mt-2 innerHTML text-14 leading-[18px] font-bold'
															style={ { color: colors.paradiso.default } }
															dangerouslySetInnerHTML={ { __html: selectedEvent?.phone ?? '' } }
														/>
													</div>
													<div>
														<Text
															lineHeight='18px'
															fontSize='14px'
															fontWeight='900'
															color={ colors.grey.darker }
															text='Jam Operasional'
														/>
														<div
															className='mt-2 innerHTML text-14 leading-[18px]'
															dangerouslySetInnerHTML={ { __html: selectedEvent?.operational_hour ?? '' } }
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className=''>
									<div className='mt-[40px]'>
										<Tabs
											activeTabIndex={ activeTabIdx }
											setActiveTabIndex={ setActiveTabIdx }
											tabsData={ ['More From Promo & Packages'] }
										/>
										<div className='pt-[10px]' />
										<PromoPackages showAsRelated={ true } events={ eventClassesSelector } />
									</div>
								</div>
							</div>
						</div>

				}
			</Layout.PanelH1>
		</Layout.PanelV1>
	);
};

export default DetailEventClassesPromo;