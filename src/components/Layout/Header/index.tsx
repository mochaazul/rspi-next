'use server';

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

import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import MainNavLanguage from '@/components/ui/MainNavLanguage';
import HeaderStyle, { DesktopMenu } from './style';

import HeaderBrand from './Brand';
import Menus from './Menus/Menus';
import NotificationBell from './NotificationBell';
import ProfileMenus from './ProfileMenus';
import MobileMenus from './Menus/MobileMenus';
import { getScopedI18n } from '@/locales/server';
import LangWrapper from '@/components/ui/LangWrapper';

export default async function Header({
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
}) {

	const t = await getScopedI18n('navMenu');

	const isLoggedIn = !!session?.token;

	// const paramGetNotif = {
	// 	query: {
	// 		medical_record: session?.user?.medical_record ?? '',
	// 		email: session?.user?.email,
	// 	},
	// };
	// const {
	// 	data: getNotification,
	// } = useNotification(paramGetNotif);

	// const notificationResponseData = getNotification?.data;

	// const renderNotifIcon = () => {
	// 	if (isLoggedIn) {
	// 		return (
	// 			<div className='relative inline-block text-white my-auto' onClick={ () => setShowNotification(true) }>
	// 				<icons.Notif onClick={ () => {

	// 					// if (marAllReadNotifFunc) {
	// 					// 	marAllReadNotifFunc()
	// 					// 		.then(() => {
	// 					// 			mutate('getNotification');
	// 					// 		});
	// 					// }
	// 				} }
	// 				className='cursor-pointer w-8 h-8 sm:w-11 sm:h-11'
	// 				/>
	// 				<span className='absolute -top-2 -right-1 w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] flex items-center justify-center text-center flex-shrink-0 bg-[#EB5757] border-2 border-white rounded-full text-[10px] sm:text-xs text-white'>
	// 					{ notificationResponseData?.total_unread ?? 0 }
	// 				</span>
	// 			</div>
	// 		);
	// 	}
	// };

	const renderHospitalMenuItem = (item: HospitalDetail) => {
		return (
			<Link href={ `/hospital/${ item?.slug }` } key={ item.id } className='hospital-list border-b border-gray flex py-4 px-4 items-center hover:bg-[#F0F2F9] cursor-pointer'>
				<Image
					alt={ `thumbnail-${item.name}` }
					src={ item?.img_url?.[0] || '' }
					width={ 80 }
					height={ 80 }
				/>
				<div className='ml-[10px] w-[310px] hover:bg-transparent flex-1 group/dropDownList'>
					<Text text={ item?.name } fontSize='16px' fontWeight='900' subClassName={ 'group-hover/dropDownList:text-green-secondary' }/>
					<Text text={ item?.address } fontSize='14px' fontWeight='400' className='mt-[5px]' />
				</div>
				<icons.ArrowRight className='ml-[27px] mr-auto' />
			</Link>
		);
	};

	const renderCoeMenuItem = (item: CenterOfExcellenceDetail) => {
		return (
			<Link href={ `/center-of-excellence/${ item.slug }` }>
				<div className='hospital-list border-b border-gray flex py-4 px-4 items-center hover:bg-[#F0F2F9] group/dropDownList'>
					<div className='ml-[10px] w-[310px] hover:bg-transparent flex-1'>
						<Text text={ item?.title } fontSize='16px' fontWeight='900' subClassName={ 'group-hover/dropDownList:text-green-secondary' }/>
					</div>
					<icons.ArrowRight className='ml-[27px] ' />
				</div>
			</Link>
		);
	};

	const renderFacilitiesMenuItem = (item: FacilityServicesDetail) => {
		return (
			<Link href={ `/facilities-service/${ item.slug }` }>
				<div className='hospital-list border-b border-gray flex py-4 px-4 items-center hover:bg-[#F0F2F9] group/dropDownList'>
					<div className='ml-[10px] w-[310px] flex-1'>
						<Text text={ item?.name } fontSize='16px' fontWeight='900' subClassName={ 'group-hover/dropDownList:text-green-secondary' }/>
					</div>
					<icons.ArrowRight className='ml-[27px]' />
				</div>
			</Link>
		);
	};

	const renderMedicalSpecialities = (<Link href={ '/facilities-service/medical-specialties' }>
		<div className='hospital-list border-b border-gray flex py-4 px-4 items-center hover:bg-[#F0F2F9]'>
			<Image src={ images.AestheticClinic } alt='' width={ 60 } height={ 60 } />
			<div className='ml-[10px] w-[310px] flex-1'>
				<Text text={ 'Medical Specialties' } fontSize='16px' fontWeight='900'/>
			</div>
			<icons.ArrowRight className='ml-[27px]' />
		</div>
	</Link>);
	
	return (
		<HeaderStyle className={ className }>
			<div className='w-full'>
				<div className='lg:flex hidden'>
					{ /* Parent should be converted to full ssr */ }
					<LangWrapper>
						<MainNavLanguage session={ session } />
					</LangWrapper>
				</div>
				<header className='bg-white navbar w-full'>
					<nav className='mx-auto flex items-center container-page gap-x-9 lg:gap-x-9 h-[64px] lg:h-[90px]' aria-label='Global'>
						<div className='flex items-center gap-x-5 xl2:gap-x-10'>
							<HeaderBrand />
						</div>
						<DesktopMenu className='gap-x-6 hidden md:flex'>
							<Menus label={ t('home') } hrefKey='/'/>
							<Menus label={ t('ourHospitals') } items={ hospitalData } itemRender={ renderHospitalMenuItem } />
							<Menus label={ t('centreOfExcellence') } items={ centerOfExcellenceData } itemRender={ renderCoeMenuItem }/>
							<Menus label={ t('facility') } items={ facilityServicesData } itemRender={ renderFacilitiesMenuItem } appendItem={ renderMedicalSpecialities }/>
							<Menus label={ t('findDoctor') } hrefKey='/find-a-doctor'/>
						</DesktopMenu>

						<section id='nav-separator' className='flex-1' />

						{ /* Mobile View Notif ETC */ }
						 <div className='flex lg:hidden items-center gap-x-5 xl2:gap-x-6'>
							{ /* { renderNotifIcon() } */ }
							<MobileMenus
								session={ session }
							 	hospitals={ hospitalData }
							 	coe={ centerOfExcellenceData }
								facilitiy={ facilityServicesData }
							/>
						</div>

						{ /* Right side Menus */ }
						<div className='hidden lg:flex lg:items-center lg:gap-x-4 xl2:gap-x-5'>
							<Link href='find-a-doctor'>
								<Button className='h-11 px-5 flex items-center whitespace-nowrap text-base font-black'>
									{ t('bookAppointment') }
								</Button>
							</Link>

							{ isLoggedIn
								? (
									<LangWrapper>
										<NotificationBell session={ session }/>
										<ProfileMenus session={ session }/>
									</LangWrapper>
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
				</header>
			</div>
		</HeaderStyle>
	);
};
