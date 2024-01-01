import { PropsWithChildren, PropsWithRef } from 'react';
import { MobileMenuWrapper } from './style';
import * as Icons from 'react-feather';
import { colors, icons } from '@/constant';
import { MainNavLanguage, Text } from '@/components/ui';
import { CenterOfExcellenceDetail, FacilityServicesDetail, HospitalDetail, UserSessionData } from '@/interface';
import Link from 'next/link';
import MobileSubMenus, { MenuEntry } from './MobileSubMenus';
import { getScopedI18n } from '@/locales/server';
import LangWrapper from '@/components/ui/LangWrapper';

type Props = PropsWithRef<PropsWithChildren<{
  session?: UserSessionData
  hospitals: HospitalDetail[]
  coe: CenterOfExcellenceDetail[]
  facilitiy: FacilityServicesDetail[]
}>>

const MobileMenus = async({ session, hospitals, coe, facilitiy }:Props) => {
	const t = await getScopedI18n('navMenu');
	const isLoggedIn = !!session?.token;

	const mapHospital:MenuEntry[] = hospitals.map(item => ({ id: item.id, label: item.name ?? '', slug: item.slug }));
	const mapCoe:MenuEntry[] = coe.map(item => ({ id: item.id, label: item.title ?? '', slug: item.slug }));
	const mapFacility: MenuEntry[] = facilitiy.map(item => ({ id: item.id, label: item.name ?? '', slug: item.slug }));
	const medSpec:MenuEntry = { id: 1, label: 'Medical Specialties', slug: '/medical-specialties' };
	return (
		<MobileMenuWrapper >
			<input id='menu' type='checkbox' className='peer' defaultChecked={ false }/>
			<label htmlFor='menu' className='peer-checked:hidden ' >
				<Icons.AlignLeft color={ colors.grey.darkOpacity } size={ 24 } />
			</label>
			<label htmlFor='menu' className='hidden peer-checked:block ' >
				<Icons.X color={ colors.grey.darkOpacity } size={ 24 } />
			</label>
			<div className='hidden absolute left-0 top-[100%] w-full peer-checked:block'>
				<LangWrapper>
					<MainNavLanguage session={ session } />
				</LangWrapper>
				<section className='bg-white h-screen divide-y divide-solid relative'  >
					<div className='nav-menu ' >
						<Link href='/' >
							<Text text={ 'Beranda' } fontSize='16px' fontWeight='700' />
						</Link>
					</div>
					{ /* Logged in menu */ }
					{
						isLoggedIn && (
							<>
								<div className='nav-menu' >
									<Link href='/find-a-doctor'>
									  <Text text={ t('bookAppointment') } fontSize='16px' fontWeight='700' />
									</Link>
								</div>
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
								<div className='nav-menu ' >
									<Link href='/find-a-doctor'>
									  <Text text={ t('bookAppointment') } fontSize='16px' fontWeight='700' />
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
							label={ t('centreOfExcellence') }
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
							<Text text={ t('user.logout') } fontSize='16px' fontWeight='700' color={ colors.red.default } />
						</div>
					)
					}
				</section>
				{ /* { activeSubMenuIdMobile && (
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
				) } */ }
				<div className='sider-nav-menu divide-y divide-solid overflow-y-auto'>
					{ /* { renderListMenuMobile() } */ }
				</div>
			</div>
		</MobileMenuWrapper>
	);
};

export default MobileMenus;