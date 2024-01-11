'use client';
import { PropsWithChildren, PropsWithRef, useEffect, useState } from 'react';
import { MobileMenuWrapper } from './style';
import * as Icons from 'react-feather';
import { colors, icons } from '@/constant';
import { MainNavLanguage, Text } from '@/components/ui';
import { CenterOfExcellenceDetail, FacilityServicesDetail, HospitalDetail, UserSessionData } from '@/interface';
import Link from 'next/link';
import MobileSubMenus, { MenuEntry } from './MobileSubMenus';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { usePathname, useRouter } from 'next/navigation';
import { cookiesHelper } from '@/helpers';
import clearSWRCache from '@/helpers/clearSwrCache';
import { useSWRConfig } from 'swr';
import { toast } from 'react-toastify';

type Props = PropsWithRef<PropsWithChildren<{
  session?: UserSessionData
  hospitals: HospitalDetail[]
  coe: CenterOfExcellenceDetail[]
  facilitiy: FacilityServicesDetail[]
}>>

const MobileMenus = ({ session, hospitals, coe, facilitiy }:Props) => {
	const [isOpen, setOpen] = useState(false);
	const t = useScopedI18n('navMenu');
	const pathname = usePathname();
	const currentLocale = useCurrentLocale();
	const router = useRouter();
	const { mutate, cache } = useSWRConfig();

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	const isLoggedIn = !!session?.token;

	const mapHospital:MenuEntry[] = hospitals.map((item, index) => ({ id: item.id ?? index, label: item.name ?? '', slug: item.slug }));
	const mapCoe:MenuEntry[] = coe.map((item, index) => ({ id: item.id ?? index, label: item.title ?? '', slug: item.slug }));
	const mapFacility: MenuEntry[] = facilitiy.map((item, index) => ({ id: item.id ?? index,  label: item.name ?? '', slug: item.slug }));
	const medSpec:MenuEntry = { id: 9999999, label: 'Medical Specialties', slug: '/medical-specialties' };

	const logOutHandler = async() => {
		if (isLoggedIn) {
			await cookiesHelper.clearStorage();
			await clearSWRCache(cache);
			setOpen(false);
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

	return (
		<MobileMenuWrapper >
			<div onClick={ () => { setOpen(!isOpen); } }>
				{
					isOpen
						? <Icons.X color={ colors.grey.darkOpacity } size={ 24 } />
						: <Icons.AlignLeft color={ colors.grey.darkOpacity } size={ 24 } />
				}
			</div>
				
			<div className={ `absolute left-0 top-[100%] w-full ${ isOpen ? 'block' : 'hidden'}` }>
				<MainNavLanguage session={ session } />
				<section className='bg-white h-screen divide-y divide-solid relative'  >
					<div className='nav-menu' >
						<Link href={ `/${currentLocale}/` } >
							<Text text={ t('home') } fontSize='16px' fontWeight='700' />
						</Link>
					</div>
					{ /* Logged in menu */ }
					{
						isLoggedIn && (
							<>
								<div className='nav-menu' >
									<Link href='/patient-portal'>
										<Text text={ t('user.patientPortal') } fontSize='16px' fontWeight='700' />
									</Link>
								</div>
								<div className='nav-menu' >
									<Link href='/user-information'>
										<Text text={ t('user.patientInformation') } fontSize='16px' fontWeight='700' />
									</Link>
								</div>
							</>
						)
					}

					{ /* Not Logged in Menu */ }
					{
						!isLoggedIn && (
							<>
								<div className='nav-menu ' >
									<Link href='/login'>
									  <Text text={ t('loginRegister') } fontSize='16px' fontWeight='700' />
									</Link>
								</div>
							</>
						)
					}

					{ /* Content Menus with submenu */ }
					<div className='nav-menu '>
						<input id='our-hospital-menu' type='checkbox' className='peer/hospital' />
						<label htmlFor='our-hospital-menu' className='flex items-center justify-between gap-2.5'>
						  <Text text={ t('ourHospitals') } fontSize='16px' fontWeight='700' />
						  <icons.ArrowRight className='w-4 h-4 [&>path]:fill-[#6A6D81] flex-shrink-0' />
						</label>
						<MobileSubMenus
							className='peer-checked/hospital:block hidden'
							label={ t('ourHospitals') }
							data={ mapHospital }
							triggerId='our-hospital-menu'
							urlPrefix='hospital'
						/>
					</div>
					<div className='nav-menu'>
						<input id='coe-menu' type='checkbox' className='peer/coe' />
						<label htmlFor='coe-menu' className='flex items-center justify-between gap-2.5'>
							<Text text={ t('centreOfExcellence') } fontSize='16px' fontWeight='700' />
							<icons.ArrowRight className='w-4 h-4 [&>path]:fill-[#6A6D81] flex-shrink-0' />
						</label>
						<MobileSubMenus
							className='peer-checked/coe:block hidden'
							label={ t('centreOfExcellence') }
							data={ mapCoe }
							triggerId='coe-menu'
							urlPrefix='center-of-excellence'
						/>
					</div>
					<div className='nav-menu'>
						<input id='facility-menu' type='checkbox' className='peer/facility' />
						<label htmlFor='facility-menu' className='flex items-center justify-between gap-2.5'>
							<Text text={ t('facility') } fontSize='16px' fontWeight='700' />
							<icons.ArrowRight className='w-4 h-4 [&>path]:fill-[#6A6D81] flex-shrink-0' />
						</label>
						<MobileSubMenus
							className='peer-checked/facility:block hidden'
							label={ t('facility') }
							data={ [...mapFacility, medSpec] }
							triggerId='facility-menu'
							urlPrefix='facilities-service'
						/>
					</div>
					<div className='nav-menu flex items-center justify-between gap-2.5'>
						<Link href='/find-a-doctor'>
							<Text text={ t('findDoctor') } fontSize='16px' fontWeight='700' />
						</Link>
					</div>
					{ /* End menu with submenu */ }
					<div className='nav-menu ' >
						<Link href='/contact'>
							<Text text={ t('contactUs') } fontSize='16px' fontWeight='700' />
						</Link>
					</div>

					{ /* Log out menu */ }
					{ isLoggedIn && (
						<div className='nav-menu'>
							<Text text={ t('user.logout') } fontSize='16px' fontWeight='700' color={ colors.red.default } onClick={ logOutHandler }/>
						</div>
					)
					}
				</section>
			</div>
		</MobileMenuWrapper>
	);
};

export default MobileMenus;