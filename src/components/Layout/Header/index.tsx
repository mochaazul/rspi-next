'use client';

import React, { Fragment, useState } from 'react';

import * as Icons from 'react-feather';
import moment from 'moment';
import { useSWRConfig } from 'swr';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import {
	CenterOfExcellenceDetail,
	FacilityServicesDetail,
	HospitalDetail,
	UserSessionData,
} from '@/interface';
import colors from '@/constant/colors';
import images from '@/constant/images';
import icons from '@/constant/icons';
import { protectedRoutes } from '@/constant/config';

import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import MainNavLanguage from '@/components/ui/MainNavLanguage';
import Modal from '@/components/ui/Modal';
import { useNotification } from '@/lib/api/client/header';
import HeaderStyle from './style';

import { useCurrentLocale, useScopedI18n } from '@/locales/client';

import { cookiesHelper } from '@/helpers';
import clearSWRCache from '@/helpers/clearSwrCache';
import { Menu, Popover, Transition } from '@headlessui/react';
import { toast } from 'react-toastify';
import Spinner from '@/components/ui/Spinner';

export const Header = ({
	session,
	hospitalData,
	centerOfExcellenceData,
	facilityServicesData,
	marAllReadNotifFunc,
	className
}: {
	session?: UserSessionData,
	hospitalData: HospitalDetail[],
	centerOfExcellenceData: CenterOfExcellenceDetail[],
	facilityServicesData: FacilityServicesDetail[],
	marAllReadNotifFunc?: () => any;
	className?: string;
}) => {

	const router = useRouter();
	const pathname = usePathname();
	const { mutate, cache } = useSWRConfig();
	const currentLang = useCurrentLocale();
	const t = useScopedI18n('navMenu');

	const [dropdownHide, setDropdownHide] = useState<boolean>(true);
	const [showSideBar, setShowSideBar] = useState<boolean>(false);
	const [isHover, setIsHover] = useState<boolean>(false);
	const [isHoverCOE, setIsHoverCOE] = useState<boolean>(false);
	const [isHoverFacilities, setIsHoverFacilities] = useState<boolean>(false);
	const [showSuccessLogout, setShowSuccessLogout] = useState<boolean>(false);
	const [activeSubMenuIdMobile, setActiveSubMenuIdMobile] = useState<string>('');

	const isLoggedIn = !!session?.token;

	const toggleMouseHover = (hovered: boolean) => () => { setIsHover(hovered); };
	const toggleMouseHoverCOE = (hovered: boolean) => () => { setIsHoverCOE(hovered); };
	const toggleMouseHoverFacilities = (hovered: boolean) => () => { setIsHoverFacilities(hovered); };

	const paramGetNotif = {
		query: {
			medical_record: session?.user?.medical_record ?? '',
			email: session?.user?.email,
		},
	};
	const {
		data: getNotification,
	} = useNotification(paramGetNotif);

	const notificationResponseData = getNotification?.data;

	const handleClickLogout = async () => {
		if (isLoggedIn) {
			await cookiesHelper.clearStorage();
			await clearSWRCache(cache);
			setShowSideBar(false);
			// Notes: protectedRoutes sudah dihandle oleh middleware. shg cukup dgn refresh page akan redirect ke halaman login
			// Khusus halaman disini tidak dihandle di middleware karna perlu show NeedLoginModal dari response error swr
			if (['/book-appointment'].some(path => pathname.includes(path))) {
				return router.replace('/login');
			}

			// if (!protectedRoutes?.some(path => pathname.includes(path))) {
			// 	setShowSuccessLogout(true);
			// }
			toast.success(t('logoutSuccess'), {
				hideProgressBar: true,
				pauseOnHover: false,
			});

			router.refresh();
		}
	};

	const handleNavigateSideBar = (path: string) => {
		setShowSideBar(!showSideBar);
		router.push(path);
	};

	const renderModalSuccessLogout = () => {
		return (
			<Modal
				visible={ showSuccessLogout }
				noPadding
			>
				<div className='py-3 sm:py-4 px-6 sm:px-10 flex flex-col items-center gap-y-3'>
					<div className='flex-shrink-0'>
						<icons.Confirmed className='w-10 h-10 sm:w-12 sm:h-12' />
					</div>

					<Text
						fontSize='16px'
						lineHeight='24px'
						fontWeight='700'
					>
						{ t('logoutSuccess') }
					</Text>
				</div>
			</Modal>
		);
	};

	const renderMenuWithDropdown = (label: string, isActive: boolean) => {
		return (
			<div className='flex gap-x-[5px] cursor-pointer relative z-[2]'>
				<Text text={ label } color={ isActive ? colors.paradiso.default : colors.grey.darker } fontSize='14px' fontWeight='900' />
				<div className='flex-shrink-0'>
					<icons.ArrowDown className='[&>path]:stroke-[#6A6D81] group-hover:rotate-180 transition-all' />
				</div>
			</div>
		);
	};

	const getDataSubMenu = () => {
		switch (activeSubMenuIdMobile) {
			case 'center-of-excellence':
				return {
					title: t('centreOfExcellence'),
					data: centerOfExcellenceData,
					href: '/center-of-excellence'
				};
			case 'our-hospital':
				return {
					title: t('ourHospitals'),
					data: hospitalData,
					href: '/hospital'
				};
			case 'facilities-service':
				return {
					title: t('facility'),
					data: facilityServicesData,
					href: '/facilities-service'
				};
			default:
				return {
					title: '',
					data: []
				};
		}
	};

	const renderMenuMobile = (label: string, href: string) => {
		return (
			<div className='nav-menu' onClick={ () => handleNavigateSideBar(href) }>
				<Text text={ label } fontSize='16px' fontWeight='700' />
			</div>
		);
	};

	const renderMenuMobileWithSubmenu = (label: string, id: string) => {
		return (
			<div className='nav-menu flex items-center justify-between gap-2.5' onClick={ () => setActiveSubMenuIdMobile(id) }>
				<Text text={ label } fontSize='16px' fontWeight='700' />
				<icons.ArrowRight className='w-4 h-4 [&>path]:fill-[#6A6D81] flex-shrink-0' />
			</div>
		);
	};

	const renderListMenuMobile = () => {
		if (activeSubMenuIdMobile) {
			const data = getDataSubMenu().data;
			const prefixHref = getDataSubMenu().href;

			return data.map((item: any) => {
				const title = activeSubMenuIdMobile === 'center-of-excellence'
					? item.title
					: item.name;
				const dataIdentifier = activeSubMenuIdMobile === 'our-hospital'
					? item.id
					: item.slug;

				return (
					<div
						className='nav-menu'
						key={ item.id }
						onClick={ () => handleNavigateSideBar(`${ prefixHref }/${ dataIdentifier }`) }
					>
						<Text text={ title } fontSize='16px' fontWeight='700' />
					</div>
				);
			});
		}

		return (
			<>
				{ renderMenuMobile(t('home'), '/') }
				{ isLoggedIn
					? (
						<>
							{ renderMenuMobile(t('bookAppointment'), '/find-a-doctor') }
							{ renderMenuMobile(t('user.patientPortal'), '/patient-portal') }
							{ renderMenuMobile(t('user.patientInformation'), '/user-information') }
						</>
					)
					: (
						<>
							{ renderMenuMobile(t('loginRegister'), '/login') }
							{ renderMenuMobile(t('bookAppointment'), '/find-a-doctor') }
						</>
					) }
				{ renderMenuMobileWithSubmenu(t('ourHospitals'), 'our-hospital') }
				{ renderMenuMobileWithSubmenu(t('centreOfExcellence'), 'center-of-excellence') }
				{ renderMenuMobileWithSubmenu(t('facility'), 'facilities-service') }
				{ renderMenuMobile(t('findDoctor'), '/find-a-doctor') }
				{ /* { renderMenuMobile(t('career'), '/') } */ }
				{ renderMenuMobile(t('contactUs'), '/contact') }
				{ isLoggedIn ?
					<div className='nav-menu' onClick={ handleClickLogout }>
						<Text text={ t('user.logout') } fontSize='16px' fontWeight='700' color={ colors.red.default } />
					</div>
					: null
				}
			</>
		);
	};

	const handleReadAllNotif = () => {
		if (marAllReadNotifFunc) {
			marAllReadNotifFunc()
				.then(() => {
					mutate('getNotification');
				});
		}
	};

	const renderMenuNotif = () => {
		if (isLoggedIn) {
			return (
				<Popover className='relative'>
					<div>
						<Popover.Button
							onClick={ handleReadAllNotif }
							className='flex items-center justify-center relative w-full focus:ring-0 focus:outline-none'>
							<icons.Notif className='w-8 h-8 sm:w-11 sm:h-11 flex-shrink-0' />
							<span className='absolute -top-2 -right-1 w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] flex items-center justify-center text-center flex-shrink-0 bg-[#EB5757] border-2 border-white rounded-full text-[10px] sm:text-xs text-white'>
								{ notificationResponseData?.total_unread ?? 0 }
							</span>
						</Popover.Button>
					</div>

					<Transition
						as={ Fragment }
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<Popover.Panel className='absolute z-[999] right-0 mt-4 lg:mt-5 w-screen max-w-[calc(100vw-92px)] sm:max-w-[400px] origin-top-right shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] overflow-hidden bg-white rounded-[10px] font-Lato'>
							<div className='flex flex-col gap-2'>
								<div className='flex p-3'>
									<Text
										fontSize='16px'
										lineHeight='24px'
										fontType='h3'
										fontWeight='700'
										color={ colors.black.ink }
										text='Notification'
									/>
								</div>

								<div className='max-h-[50vh] overflow-y-auto custom-scrollbar flex flex-col gap-y-2 px-3 pb-3'>
									{
										notificationResponseData?.notification?.map((item, idx) => (
											<div
												key={ idx }
												className={ `flex flex-col gap-y-2 p-3 rounded-lg cursor-pointer hover:bg-green-secondary/10 ${ item.flag === 0 ? 'bg-green-secondary/10' : '' }` }
												onClick={ () => {
													if (item?.url) {
														router.push(`${ item?.url }`);
													}
												} }
											>
												<Text
													fontSize='12px'
													fontWeight='400'
													color={ colors.grey.pencil }
													text={ moment(item.create_datetime)?.format('DD MMM, hh:mm A') }
												/>
												<Text
													fontSize='14px'
													lineHeight='20px'
													fontWeight='700'
													color={ colors.black.ink }
													text={ currentLang === 'id' ? item?.judul_idn : item?.judul_en }
												/>
												<Text
													fontSize='12px'
													lineHeight='20px'
													fontWeight='400'
													color={ colors.black.ink }
													text={ currentLang === 'id' ? item?.isi_idn : item?.isi_en }
												/>
											</div>
										))
									}
								</div>

							</div>
						</Popover.Panel>
					</Transition>
				</Popover>
			);
		}
	};

	const renderMenuProfile = () => {
		return (
			<Menu as='div' className='relative inline-block text-left'>
				<div>
					<Menu.Button className='flex items-center relative w-full focus:ring-0 focus:outline-none'>
						<div>
							{ session?.user?.img_url
								? (
									<div className='relative overflow-hidden w-[50px] h-[50px] rounded-full'>
										<Image
											src={ session.user?.img_url }
											alt=''
											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'

											fill
										/>
									</div>
								)
								: <icons.EmptyProfile className='w-[50px] h-[50px]' /> }
						</div>
						<div className='ml-4 cursor-pointer'>
							<icons.ArrowDown className={ '[&>path]:stroke-[#6A6D81]' } onClick={ () => setDropdownHide(!dropdownHide) } />
						</div>
					</Menu.Button>
				</div>
				<Transition
					as={ Fragment }
					enter='transition ease-out duration-100'
					enterFrom='transform opacity-0 scale-95'
					enterTo='transform opacity-100 scale-100'
					leave='transition ease-in duration-75'
					leaveFrom='transform opacity-100 scale-100'
					leaveTo='transform opacity-0 scale-95'
				>
					<Menu.Items className='absolute right-0 mt-5 w-[230px] origin-top-right shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] overflow-hidden bg-white rounded-b-[10px] font-Lato font-bold text-base'>
						<Menu.Item as={ Link } href='/patient-portal' className='flex px-5 py-4 text-gray-1 hover:bg-[#F0F2F9]'>
							{ t('user.patientPortal') }
						</Menu.Item>
						<Menu.Item as={ Link } href='/user-information' className='flex px-5 py-4 text-gray-1 hover:bg-[#F0F2F9]'>
							{ t('user.patientInformation') }
						</Menu.Item>
						<Menu.Item as='div' className='px-5 py-4 text-[#D71F28] cursor-pointer hover:bg-[#F0F2F9]' onClick={ handleClickLogout }>
							{ t('user.logout') }
						</Menu.Item>
					</Menu.Items>
				</Transition>
			</Menu>
		);
	};

	return (
		<HeaderStyle className={ className }>
			<div className='w-full'>
				<div className='lg:flex hidden'>
					<MainNavLanguage session={ session } />
				</div>
				<header className='bg-white navbar w-full'>
					<nav className='mx-auto flex items-center justify-between container-page gap-2 lg:gap-5 h-[64px] lg:h-[90px]' aria-label='Global'>
						<div className='flex items-center gap-x-5 xl2:gap-x-10'>
							<Link href='/' className='relative overflow-hidden w-[70px] h-8 lg:w-[132px] lg:h-[60px]'>
								<Image
									src='/images/logo_rspi.svg'
									alt='rspi-logo'
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
									fill
								/>
							</Link>
							<div className='hidden lg:flex lg:gap-x-4 xl2:gap-x-5'>
								<div id='home'>
									<Link href='/'>
										<Text text={ t('home') } className='cursor-pointer' color={ colors.grey.darker } fontSize='14px' fontWeight='900' />
									</Link>
								</div>

								<div id='our-hospital' className='relative group' onMouseEnter={ toggleMouseHover(true) } onMouseLeave={ toggleMouseHover(false) }>
									{ renderMenuWithDropdown(t('ourHospitals'), isHover) }
									<div className={ `${ isHover === false ? 'hidden' : 'absolute' } dropdownPosition` }>
										<ul className='dropdownNavbar divide-y divide-gray-100 custom-scrollbar' aria-labelledby='dropdownDefault'>
											{ Object.values(hospitalData || [])?.map((item, idx) => (
												<Link href={ `/hospital/${ item?.slug }` } key={ idx } className='hospital-list border-b border-gray flex py-4 px-4 items-center hover:bg-[#F0F2F9] cursor-pointer'>
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
													<icons.ArrowRight className='ml-[27px] mr-auto' />
												</Link>
											)) }
										</ul>
									</div>
								</div>

								<div id='centre-of-excellence' className='relative group' onMouseEnter={ toggleMouseHoverCOE(true) } onMouseLeave={ toggleMouseHoverCOE(false) }>
									{ renderMenuWithDropdown(t('centreOfExcellence'), isHoverCOE) }

									<div className={ `${ isHoverCOE === false ? 'hidden' : 'absolute' } dropdownPosition` }>
										<ul className='dropdownNavbar divide-y divide-gray-100 custom-scrollbar' aria-labelledby='dropdownDefault'>
											{ Object.values(centerOfExcellenceData || [])?.map((item, idx) => (
												<Link href={ `/center-of-excellence/${ item.slug }` } key={ idx }>
													<div className='hospital-list border-b border-gray flex py-4 px-4 items-center hover:bg-[#F0F2F9]'>
														{ item?.img_url?.[0] && (
															<Image src={ item?.img_url?.[0] } width={ 60 } height={ 60 } alt='center-of-excellence-image' />
														) }
														<div className='ml-[10px] w-[310px] hover:bg-transparent'>
															<Text text={ item?.title } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
														</div>
														<icons.ArrowRight className='ml-[27px] mr-auto' />
													</div>
												</Link>
											)) }
										</ul>
									</div>
								</div>

								<div id='facilities' className='flex relative group' onMouseEnter={ toggleMouseHoverFacilities(true) } onMouseLeave={ toggleMouseHoverFacilities(false) }>
									{ renderMenuWithDropdown(t('facility'), isHoverFacilities) }
									<div className={ `${ isHoverFacilities === false ? 'hidden' : 'absolute' } dropdownPosition` }>
										<ul className='dropdownNavbar divide-y divide-gray-100 custom-scrollbar' aria-labelledby='dropdownDefault'>
											{ Object.values(facilityServicesData || [])?.map((item, idx) => (
												<Link href={ `/facilities-service/${ item.slug }` } key={ idx }>
													<div className='hospital-list border-b border-gray flex py-4 px-4 items-center hover:bg-[#F0F2F9]'>
														{
															item?.image_url?.[0] && (
																<Image src={ item?.image_url?.[0] } width={ 60 } height={ 60 } alt={ 'facilities-image' } />
															)
														}
														<div className='ml-[10px] w-[310px]'>
															<Text text={ item?.name } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
														</div>
														<icons.ArrowRight className='ml-[27px] mr-auto' />
													</div>
												</Link>
											)) }

											<Link href={ '/facilities-service/medical-specialties' }>
												<div className='hospital-list border-b border-gray flex py-4 px-4 items-center hover:bg-[#F0F2F9]'>
													<Image src={ images.AestheticClinic } alt='' width={ 60 } height={ 60 } />
													<div className='ml-[10px] w-[310px]'>
														<Text text={ 'Medical Specialties' } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
													</div>
													<icons.ArrowRight className='ml-[27px] mr-auto' />
												</div>
											</Link>
										</ul>
									</div>
								</div>

								{ /* <div id='career'>
									<Text text={ t('career') } className='cursor-pointer' color={ colors.grey.darker } fontSize='14px' fontWeight='900' />
								</div> */ }

								<Link id='find-doctor' href='/find-a-doctor'>
									<Text text={ t('findDoctor') } className='cursor-pointer' color={ colors.grey.darker } fontSize='14px' fontWeight='900' />
								</Link>
							</div>
						</div>
						<div className='flex lg:hidden items-center gap-x-5 xl2:gap-x-6'>
							{ renderMenuNotif() }
							<button
								type='button'
								className='-m-2 inline-flex items-center justify-center p-2 focus:outline-none focus:ring-0'
								onClick={ () => setShowSideBar(!showSideBar) }
							>
								{ showSideBar
									? <Icons.X color={ colors.grey.darkOpacity } size={ 24 } />
									: <Icons.AlignLeft color={ colors.grey.darkOpacity } size={ 24 } /> }

							</button>
						</div>
						<div className='hidden lg:flex lg:items-center lg:gap-x-4 xl2:gap-x-5'>
							<Link href='/find-a-doctor'>
								<Button className='h-11 px-5 flex items-center whitespace-nowrap text-base font-black'>
									{ t('bookAppointment') }
								</Button>
							</Link>

							{ isLoggedIn
								? (
									<>
										{ renderMenuNotif() }
										{ renderMenuProfile() }
									</>
								)
								: (
									<Link href='/login'>
										<Button className='h-11 flex items-center whitespace-nowrap px-5 text-base font-black' theme='outline' $hoverTheme='primary'>
											{ t('loginRegister') }
										</Button>
									</Link>
								) }
						</div>
					</nav>
					{ showSideBar && (
						<div className='mobile-sidebar'>
							<MainNavLanguage session={ session } />
							{ activeSubMenuIdMobile && (
								<div className='p-4 bg-[#F0F2F9] flex items-center gap-2'>
									<button
										type='button'
										className='flex-shrink-0 focus:outline-none focus:ring-0'
										onClick={ () => setActiveSubMenuIdMobile('') }
									>
										<Icons.ArrowLeft size={ 20 } color={ colors.grey.darkOpacity } />
									</button>
									<Text fontSize='16px' fontWeight='700'>{ getDataSubMenu().title }</Text>
								</div>
							) }
							<div className='sider-nav-menu divide-y divide-solid overflow-y-auto'>
								{ renderListMenuMobile() }
							</div>
						</div>
					) }
				</header>
			</div>
			{ renderModalSuccessLogout() }
		</HeaderStyle>
	);
};

export default React.memo(Header);
