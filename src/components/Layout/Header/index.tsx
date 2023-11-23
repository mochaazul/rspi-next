'use client';

import React, { useState } from 'react';

import * as Icons from 'react-feather';
import moment from 'moment';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import {
	CenterOfExcellenceState,
	FacilityServicesState,
	FooterDetail,
	FooterState,
	HospitalState,
	NotificationResponse,
} from '@/interface';
import colors from '@/constant/colors';
import images from '@/constant/images';
import icons from '@/constant/icons';

import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import MainNavLanguage from '@/components/ui/MainNavLanguage';
import Modal from '@/components/ui/Modal';

import HeaderStyle from './style';

import { useCurrentLocale } from '@/locales/client';
import { notificationResponseFetch } from '@/app/[locale]/(main)/helpers';
import useSession from '@/session/client';
import { cookiesHelper } from '@/helpers';

export const Header = ({
	hospitalData,
	centerOfExcellenceData,
	facilityServicesData,
	notificationResponseData,
	marAllReadNotifFunc,
	footersData,
}: {
	hospitalData: HospitalState,
	centerOfExcellenceData: CenterOfExcellenceState,
	facilityServicesData: FacilityServicesState,
	notificationResponseData?: NotificationResponse,
	marAllReadNotifFunc: () => any,
	footersData: FooterDetail[],
}) => {

	const router = useRouter();

	const currentLang = useCurrentLocale();

	const [dropdownHide, setDropdownHide] = useState(true);
	const [showSideBar, setShowSideBar] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [isHoverCOE, setIsHoverCOE] = useState(false);
	const [isHoverFacilities, setIsHoverFacilities] = useState(false);
	const [showNotification, setShowNotification] = useState(false);
	const session = useSession();
	const navigate = useRouter();

	const isLoggedIn = !!session?.token;

	const toggleMouseHover = (hovered: boolean) => () => { setIsHover(hovered); };
	const toggleMouseHoverCOE = (hovered: boolean) => () => { setIsHoverCOE(hovered); };
	const toggleMouseHoverFacilities = (hovered: boolean) => () => { setIsHoverFacilities(hovered); };

	const handleClick = async () => {
		if (isLoggedIn) {
			await cookiesHelper.clearStorage();
			router.refresh();
		}
	};

	const handleLoginClick = () => {
		router.push('/login');
	};

	const handleNavigateSideBar = (path: string) => {
		setShowSideBar(!showSideBar);
		router.push(path);
	};

	const modalNotification = () => {
		return (
			<Modal
				visible={ showNotification }
				onClose={ () => setShowNotification(false) }
				width='380px'
				noPadding={ true }
			>
				<div className='relative flex flex-col'>
					<div className='flex justify-between p-[20px]'>
						<Text
							fontSize='16px'
							lineHeight='24px'
							fontType='h3'
							fontWeight='700'
							textAlign='center'
							color={ colors.black.default }
							text='Notification'
						/>
						<Text
							fontSize='12px'
							lineHeight='20px'
							fontWeight='400'
							textAlign='center'
							color={ colors.green.brandAccent }
							text='Mark all as read'
							// Migrate
							onClick={ () => marAllReadNotifFunc()
								.then(function (response: any) {
								notificationResponseFetch();
							})
							}
						// End Migrate
						/>
					</div>

					{
						notificationResponseData?.notification?.map((item, idx) => (
							<div key={ idx } className='pb-4'>
								<div className='flex flex-col py-4 px-[20px]' style={ {
									backgroundColor: item.flag === 0 ? 'rgba(0, 0, 0, 0)' : 'rgba(53, 136, 136, 0.1)'
								} }>
									<div className='flex justify-between'>
										<Text
											fontSize='12px'
											fontWeight='400'
											textAlign='center'
											color={ colors.grey.pencil }
											text={ moment(item.create_datetime)?.format('DD MMM, hh:mm') }
										/>
									</div>
									<Text
										fontSize='14px'
										lineHeight='20px'
										fontWeight='700'
										textAlign='center'
										color={ colors.black.default }
										text={ currentLang === 'id' ? item?.judul_idn : item?.judul_en }
										className='flex justify-start'
									/>
									<Text
										fontSize='12px'
										lineHeight='20px'
										fontWeight='400'
										textAlign='center'
										color={ colors.black.default }
										text={ currentLang === 'id' ? item?.isi_idn : item?.isi_en }
										className='flex justify-start pt-2'
									/>
								</div>
							</div>
						))
					}

				</div>
			</Modal>
		);
	};

	return (
		<HeaderStyle>
			<div className='w-full'>
				<MainNavLanguage />
				<div className={ 'xl:!px-[40px] navbar animate-slideUpToDown transition-all duration-300' }>
					<div className='leftNav'>
						<div className='logo cursor-pointer py-[22px] max-sm:py-[15px]'>
							<Link href='/'>
								<Image src={ '/images/logo_rspi.svg' } alt='rspi-logo' width={ 150 } height={ 80 } />
							</Link>
						</div>
						<div className='menu max-sm:hidden'>
							<div id='home' className='py-[22px] max-sm:py-[10px]'>
								<Link href='/'>
									<Text text={ 'Home' } className='cursor-pointer' color={ colors.grey.darker } fontSize='14px' fontWeight='900' />
								</Link>
							</div>

							<div id='our-hospital' className='flex py-[22px] max-sm:py-[10px]' onMouseEnter={ toggleMouseHover(true) } onMouseLeave={ toggleMouseHover(false) }>
								<Text text={ 'Our Hospitals' } className='cursor-pointer' color={ isHover === true ? colors.paradiso.default : colors.grey.darker } fontSize='14px' fontWeight='900' />
								<div className='ml-[9px] cursor-pointer'>
									<icons.ArrowDown alt='' className={ 'xl:relative xl:top-[1px] [&>path]:stroke-gray-700' }
									/>
								</div>
								<div id='dropdownOurHospital' className={ `${ isHover === false ? 'hidden' : 'fixed' } w-[480px] mt-[45px] ml-[240px] bg-white divide-y divide-gray-100 shadow custom-scrollbar` }>
									<ul className='text-sm text-gray-700' aria-labelledby='dropdownDefault'>
										{ Object.values(hospitalData || [])?.map((item, idx) => (
											<div key={ idx } className='hospital-list border-b border-gray flex py-4 px-4 items-center hover:bg-gray-100 ' onClick={ () => {
												// redirect to hospital detail, using footer data
												Object.values(footersData || []).filter(footer => footer.footer_category === 'our-hospital')?.forEach((element: FooterDetail) => {
													if (element?.title === item?.name) {
														navigate.push(`/footer/${ element.slug }`);
													}
												});
											} }>
												<Image
													alt='hospital image'
													src={ item?.img_url?.[0] || '' }
													width={ 80 }
													height={ 80 }
												/>
												<div className='ml-[10px] w-[310px] hover:bg-transparent'>
													<Text text={ item?.name } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
													<Text text={ item?.address } fontSize='14px' fontWeight='400' className='mt-[5px]' />
												</div>
												<icons.ArrowRight alt='' className='ml-[27px] mr-auto' />
											</div>
										)) }
									</ul>
								</div>
							</div>

							<div id='centre-of-excellence' className='flex py-[22px] max-sm:py-[10px]' onMouseEnter={ toggleMouseHoverCOE(true) } onMouseLeave={ toggleMouseHoverCOE(false) }>
								<Text text={ 'Centre of Excellence' } className='cursor-pointer' color={ isHoverCOE === true ? colors.paradiso.default : colors.grey.darker } fontSize='14px' fontWeight='900' />
								<div className='ml-[9px] cursor-pointer'>
									<icons.ArrowDown alt='' className={ 'xl:relative xl:top-[1px] [&>path]:stroke-gray-700' } />
								</div>
								<div id='dropdownOurHospital' className={ `${ isHoverCOE === false ? 'hidden' : 'fixed' } w-[480px] mt-[45px] ml-[380px] bg-white divide-y divide-gray-100 shadow custom-scrollbar` }>
									<ul className='text-sm text-gray-700' aria-labelledby='dropdownDefault'>
										{ Object.values(centerOfExcellenceData || [])?.map((item, idx) => (
											<Link href={ `/centre-of-excellence/${ item.slug }` } key={ idx }>
												<div className='hospital-list border-b border-gray flex py-4 px-4 items-center  hover:bg-gray-100 '>
													<Image src={ item?.img_url?.[0] } width={ 60 } height={ 60 } alt='center-of-excellence-image' />
													<div className='ml-[10px] w-[310px]  hover:bg-transparent'>
														<Text text={ item?.title } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
													</div>
													<icons.ArrowRight alt='' className='ml-[27px] mr-auto' />
												</div>
											</Link>
										)) }
									</ul>
								</div>
							</div>

							<div id='facilities' className='flex py-[22px] max-sm:py-[10px]' onMouseEnter={ toggleMouseHoverFacilities(true) } onMouseLeave={ toggleMouseHoverFacilities(false) }>
								<Text text={ 'Facilities & Services' } className='cursor-pointer' color={ isHoverFacilities === true ? colors.paradiso.default : colors.grey.darker } fontSize='14px' fontWeight='900' />
								<div className='ml-[9px] cursor-pointer'>
									<icons.ArrowDown alt='' className={ 'xl:relative xl:top-[1px] [&>path]:stroke-gray-700' } />
								</div>
								<div id='dropdownOurHospital' className={ `${ isHoverFacilities === false ? 'hidden' : 'fixed' } w-[480px] mt-[45px] ml-[540px] bg-white divide-y divide-gray-100 shadow custom-scrollbar` }>
									<ul className='text-sm text-gray-700' aria-labelledby='dropdownDefault'>
										{ Object.values(facilityServicesData || [])?.map((item, idx) => (
											<Link href={ `/facilities/${ item.slug }` } key={ idx }>
												<div className='hospital-list border-b border-gray flex py-4 px-4 items-center hover:bg-gray-100'>
													<Image src={ item?.image_url?.[0] } width={ 60 } height={ 60 } alt={ 'facilities-image' } />
													<div className='ml-[10px] w-[310px]'>
														<Text text={ item?.name } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
													</div>
													<icons.ArrowRight alt='' className='ml-[27px] mr-auto' />
												</div>
											</Link>
										)) }

										<Link href={ '/facilities/medical-specialities' } >
											<div className='hospital-list border-b border-gray flex py-4 px-4 items-center'>
												<Image src={ images.AestheticClinic } alt='' width={ 60 } height={ 60 } />
												<div className='ml-[10px] w-[310px]'>
													<Text text={ 'Medical Specialities' } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
												</div>
												<icons.ArrowRight alt='' className='ml-[27px] mr-auto' />
											</div>
										</Link>
									</ul>
								</div>
							</div>

							<div id='career' className='py-[22px] max-sm:py-[10px]'>
								<Text text={ 'Career' } className='cursor-pointer' color={ colors.grey.darker } fontSize='14px' fontWeight='900' />
							</div>

							<Link id='find-doctor' className='py-[22px] max-sm:py-[10px]' href='/find-a-doctor'>
								<Text text={ 'Find a Doctor' } className='cursor-pointer' color={ colors.grey.darker } fontSize='14px' fontWeight='900' />
							</Link>

						</div>
					</div>
					<div className='rightNav py-[22px] max-sm:py-[10px]'>
						<div className='translate'>
							<div className='mobile-nav flex items-center gap-6 sm:hidden'>
								<Image
									src={ icons.Notif }
									alt=''
									onClick={ () => setShowNotification(true) }
									fill
								/>
								<Icons.AlignLeft onClick={ () => setShowSideBar(!showSideBar) } />
							</div>
							<div>
								{ modalNotification() }
							</div>
							<div className='flex items-center gap-6 max-sm:hidden'>
								<Button className='btn-main h-[44px] min-w-[190px]' onClick={ () => router.push('/find-a-doctor') }>Book Appointment</Button>
								{
									isLoggedIn ?
										<>
											<a href='#' className='relative inline-block text-6xl text-white mx-[24px] my-auto' onClick={ () => setShowNotification(true) }>
												<icons.Notif />
												<span
													className='absolute top-0 right-0 px-2 py-1 translate-x-1/2 bg-red-500 border border-white rounded-full text-xs text-white'>{ notificationResponseData?.total_unread }</span>
											</a>
											<div className='flex text-white items-center'>
												<div>

													{ session.user?.img_url
														? (
															<div className='relative overflow-hidden w-[50px] h-[50px] rounded-full'>
																<Image
																	src={ session.user?.img_url }
																	alt=''
																	fill
																/>
															</div>
														)
														: <icons.EmptyProfile className='w-[50px] h-[50px]' /> }
												</div>
												<div className='ml-[24px] cursor-pointer'>
													<icons.ArrowDown alt='' className={ 'xl:relative xl:top-[1px] [&>path]:stroke-gray-700' } onClick={ () => setDropdownHide(!dropdownHide) } />
												</div>
											</div>
										</> :
										<Button className='btn-main h-[44px] min-w-[190px]' theme='outline' $hoverTheme='primary' onClick={ handleLoginClick }>Login / Register</Button>
								}
							</div>

							{
								isLoggedIn &&
								<div id='dropdown' className={ `${ dropdownHide === true ? 'hidden' : 'fixed' } z-10 w-[208px] mt-[10px] bg-white divide-y divide-gray-100 shadow dark:bg-gray-700` }>
									<ul className='py-1 text-sm text-gray-700' aria-labelledby='dropdownDefault'>
										<li onClick={ () => {
											setDropdownHide(true);
											router.push('/patient-portal');
										} }>
											<a href='#' className='border-b border-gray block py-4 px-4'>Patient Portal</a>
										</li>
										<li>
											<Link href='/user-information' className='border-b border-gray block py-4 px-4'>User Information</Link>
										</li>
										<li>
											<a href='#' className='block py-4 px-4 text-red-600' onClick={ handleClick }>Logout</a>
										</li>
									</ul>
								</div>
							}
						</div>
					</div>
				</div>
				{ showSideBar === true ?
					<div className='mobile-sidebar'>
						<div className='sider-nav-menu divide-y divide-solid'>
							<div
								className='nav-menu'
								onClick={ () => { handleNavigateSideBar('/'); } }>
								<Text text={ 'Home' } fontSize='16px' fontWeight='700' />
							</div>
							{ isLoggedIn &&
								<div className='nav-menu' onClick={ () => { handleNavigateSideBar('/patient-portal'); } }>
									<Text text={ 'Patient Portal' } fontSize='16px' fontWeight='700' />
								</div>
							}
							{ isLoggedIn &&
								<div className='nav-menu' onClick={ () => { handleNavigateSideBar('/user-information'); } }>
									<Text text={ 'User Information' } fontSize='16px' fontWeight='700' />
								</div>
							}
							{ isLoggedIn ? null :
								<div className='nav-menu' onClick={ handleLoginClick }>
									<Text text={ 'Login' } fontSize='16px' fontWeight='700' />
								</div>
							}
							{ isLoggedIn ? null :
								<div className='nav-menu' onClick={ handleLoginClick }>
									<Text text={ 'Login' } fontSize='16px' fontWeight='700' />
								</div>
							}
							{ isLoggedIn ? null :
								<div className='nav-menu' onClick={ handleLoginClick }>
									<Text text={ 'Login' } fontSize='16px' fontWeight='700' />
								</div>
							}
							{ isLoggedIn ? null :
								<div
									className='nav-menu'
									onClick={ () => handleNavigateSideBar('/register') }>
									<Text text={ 'Register' } fontSize='16px' fontWeight='700' />
								</div>
							}
							<div
								className='nav-menu'
								onClick={ () => handleNavigateSideBar('/find-a-doctor') }>
								<Text text={ 'Book Appointment' } fontSize='16px' fontWeight='700' />
							</div>
							{ isLoggedIn ? null :
								<div
									className='nav-menu'
									onClick={ () => handleNavigateSideBar('/patient-portal') }>
									<Text text={ 'Patient Portal' } fontSize='16px' fontWeight='700' />
								</div>
							}
							{ isLoggedIn ? null :
								<div
									className='nav-menu'
									onClick={ () => handleNavigateSideBar('/user-information') }>
									<Text text={ 'User Information' } fontSize='16px' fontWeight='700' />
								</div>
							}
							<div
								className='nav-menu'
								onClick={ () => handleNavigateSideBar('/centre-of-excellence') }>
								<Text text={ 'Center Of Excellence' } fontSize='16px' fontWeight='700' />
							</div>
							<div
								className='nav-menu'
								onClick={ () => handleNavigateSideBar('/facilities') }>
								<Text text={ 'Facilities & Services' } fontSize='16px' fontWeight='700' />
							</div>
							<div className='nav-menu'>
								<Text text={ 'Our Hospital' } fontSize='16px' fontWeight='700' />
							</div>
						</div>
						{ isLoggedIn ?
							<div className='nav-menu'>
								<Text text={ 'Logout' } fontSize='16px' fontWeight='700' color={ colors.red.default } onClick={ handleClick } />
							</div>
							: null
						}
					</div> : null
				}
			</div>
		</HeaderStyle>
	);
};

export default React.memo(Header);
