'use client';

import React, { useState } from 'react';

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
import HeaderStyle, { DesktopMenu } from './style';

import { useCurrentLocale, useScopedI18n } from '@/locales/client';

import { cookiesHelper } from '@/helpers';
import clearSWRCache from '@/helpers/clearSwrCache';
import HeaderBrand from './Brand';
import Menus from './Menus/Menus';
import NotificationBell from './NotificationBell';
import ProfileMenus from './ProfileMenus';
import MobileMenus from './Menus/MobileMenus';

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

	const [showSideBar, setShowSideBar] = useState<boolean>(false);
	const [showNotification, setShowNotification] = useState<boolean>(false);
	const [showSuccessLogout, setShowSuccessLogout] = useState<boolean>(false);
	const [activeSubMenuIdMobile, setActiveSubMenuIdMobile] = useState<string>('');

	const isLoggedIn = !!session?.token;

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

	const handleClick = async() => {
		if (isLoggedIn) {
			await cookiesHelper.clearStorage();
			await clearSWRCache(cache);
			setShowSideBar(false);
			// Notes: protectedRoutes sudah dihandle oleh middleware. shg cukup dgn refresh page akan redirect ke halaman login
			// Khusus halaman disini tidak dihandle di middleware karna perlu show NeedLoginModal dari response error swr
			if (['/book-appointment'].some(path => pathname.includes(path))) {
				return router.replace('/login');
			}

			if (!protectedRoutes?.some(path => pathname.includes(path))) {
				setShowSuccessLogout(true);
			}

			router.refresh();
		}
	};

	const handleNavigateSideBar = (path: string) => {
		setShowSideBar(!showSideBar);
		router.push(path);
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
			case 'centre-of-excellence':
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
			case 'facilities':
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
				const title = activeSubMenuIdMobile === 'centre-of-excellence'
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
					<div className='nav-menu' onClick={ handleClick }>
						<Text text={ t('user.logout') } fontSize='16px' fontWeight='700' color={ colors.red.default } />
					</div>
					: null
				}
			</>
		);
	};

	const renderNotifIcon = () => {
		if (isLoggedIn) {
			return (
				<div className='relative inline-block text-white my-auto' onClick={ () => setShowNotification(true) }>
					<icons.Notif onClick={ () => {

						// if (marAllReadNotifFunc) {
						// 	marAllReadNotifFunc()
						// 		.then(() => {
						// 			mutate('getNotification');
						// 		});
						// }
					} }
					className='cursor-pointer w-8 h-8 sm:w-11 sm:h-11'
					/>
					<span className='absolute -top-2 -right-1 w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] flex items-center justify-center text-center flex-shrink-0 bg-[#EB5757] border-2 border-white rounded-full text-[10px] sm:text-xs text-white'>
						{ notificationResponseData?.total_unread ?? 0 }
					</span>
				</div>
			);
		}
	};

	const renderHospitalMenuItem = (item: HospitalDetail) => {
		return (
			<Link href={ `/hospital/${ item?.slug }` } key={ item.id } className='hospital-list border-b border-gray flex py-4 px-4 items-center hover:bg-[#F0F2F9] cursor-pointer'>
				<Image
					alt={ `thumbnail-${item.name}` }
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
		);
	};

	const renderCoeMenuItem = (item: CenterOfExcellenceDetail) => {
		return (
			<Link href={ `/center-of-excellence/${ item.slug }` }>
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
		);
	};

	const renderFacilitiesMenuItem = (item: FacilityServicesDetail) => {
		return (
			<Link href={ `/facilities-service/${ item.slug }` }>
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
		);
	};

	const renderMedicalSpecialities = (<Link href={ '/facilities-service/medical-specialties' }>
		<div className='hospital-list border-b border-gray flex py-4 px-4 items-center hover:bg-[#F0F2F9]'>
			<Image src={ images.AestheticClinic } alt='' width={ 60 } height={ 60 } />
			<div className='ml-[10px] w-[310px]'>
				<Text text={ 'Medical Specialties' } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
			</div>
			<icons.ArrowRight className='ml-[27px] mr-auto' />
		</div>
	</Link>);
	
	return (
		<HeaderStyle className={ className }>
			<div className='w-full'>
				<div className='lg:flex hidden'>
					{ /* Parent should be converted to full ssr */ }
					<MainNavLanguage session={ session } />
				</div>
				<header className='bg-white navbar w-full'>
					<nav className='mx-auto flex items-center container-page gap-2 lg:gap-5 h-[64px] lg:h-[90px]' aria-label='Global'>
						<div className='flex items-center gap-x-5 xl2:gap-x-10'>
							<HeaderBrand />
						</div>
						<DesktopMenu className='gap-x-2 hidden md:flex'>
							<Menus label={ t('ourHospitals') } items={ hospitalData } hrefKey='hospital' itemRender={ renderHospitalMenuItem } />
							<Menus label={ t('centreOfExcellence') } items={ centerOfExcellenceData } hrefKey='center-of-excellence' itemRender={ renderCoeMenuItem }/>
							<Menus label={ t('facility') } items={ facilityServicesData } hrefKey='facilities' itemRender={ renderFacilitiesMenuItem } appendItem={ renderMedicalSpecialities }/>
							<Menus label={ t('findDoctor') } hrefKey='find-a-doctor'/>
						</DesktopMenu>

						<section id='nav-separator' className='flex-1' />

						{ /* Mobile View Notif ETC */ }
						 <div className='flex lg:hidden items-center gap-x-5 xl2:gap-x-6'>
							{ renderNotifIcon() }
							<MobileMenus session={ session }/>
						</div>

						{ /* Right side Menus */ }
						<div className='hidden lg:flex lg:items-center lg:gap-x-4 xl2:gap-x-5'>
							<Link href='/find-a-doctor'>
								<Button className='h-11 px-5 flex items-center whitespace-nowrap text-base font-black'>
									{ t('bookAppointment') }
								</Button>
							</Link>

							{ isLoggedIn
								? (
									<>
										<NotificationBell session={ session }/>
										<ProfileMenus session={ session }/>
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
					</nav>
				</header>
			</div>
		</HeaderStyle>
	);
};

export default React.memo(Header);
