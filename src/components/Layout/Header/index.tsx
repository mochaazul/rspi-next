'use client';

import React, { useState } from 'react';

import type {
	GetStaticPaths,
	GetStaticProps,
	NextPage
} from 'next';

import * as Icons from 'react-feather';
import moment from 'moment';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import {
	CenterOfExcellenceState,
	FacilityServicesDetail,
	FacilityServicesState,
	HospitalState
} from '@/interface';

import colors from '@/constant/colors';
import images from '@/constant/images';
import icons from '@/constant/icons';

import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import MainNavLanguage from '@/components/MainNavLanguage';
import Modal from '@/components/Modal';
import useSession from '@/session/client';
import { cookiesHelper } from '@/helpers';

import HeaderStyle from './style';

export const Header = ({
	hospitalData,
	centerOfExcellenceData,
	facilityServicesData
}: {
	hospitalData: HospitalState,
	centerOfExcellenceData: CenterOfExcellenceState,
	facilityServicesData: FacilityServicesDetail[];
}) => {
	const router = useRouter();

	const [dropdownHide, setDropdownHide] = useState(true);
	const [showSideBar, setShowSideBar] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [isHoverCOE, setIsHoverCOE] = useState(false);
	const [isHoverFacilities, setIsHoverFacilities] = useState(false);
	const [showNotification, setShowNotification] = useState(false);

	// Notes: CSR. Jika ada kebutuhan u/ SSR, pakai getSession dari @/session/server dan props ke Header component
	const session = useSession();
	const isLoggedIn = session.isAuthenticated;

	const toggleMouseHover = (hovered: boolean) => () => { setIsHover(hovered); };
	const toggleMouseHoverCOE = (hovered: boolean) => () => { setIsHoverCOE(hovered); };
	const toggleMouseHoverFacilities = (hovered: boolean) => () => { setIsHoverFacilities(hovered); };

	const handleClick = async() => {
		// TODO: karena async, butuh loading state ketika logout. need enhancement
		if (isLoggedIn) {
			await cookiesHelper.clearStorage();
			router.replace('/');
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
						// onClick={ () => readNotificationDispatch({
						// 	queryParam: {
						// 		medical_record: '100154999',
						// 		email: 'riko.logwirno@rebelworks.co'
						// 	}
						// }) }
						// End Migrate
						/>
					</div>

					<div className='pb-4'>
						<div className='flex flex-col py-4 px-[20px]' style={ {
							backgroundColor: 'rgba(0, 0, 0, 0)'
						} }>
							<div className='flex justify-between'>
								<Text
									fontSize='12px'
									fontWeight='400'
									textAlign='center'
									color={ colors.grey.pencil }
									text={ moment().format('DD MMM, hh:mm') }
								/>
							</div>
							<Text
								fontSize='14px'
								lineHeight='20px'
								fontWeight='700'
								textAlign='center'
								color='#000000'
								text='Judul'
								className='flex justify-start'
							/>
							<Text
								fontSize='12px'
								lineHeight='20px'
								fontWeight='400'
								textAlign='center'
								color='#000000'
								text='Judul'
								className='flex justify-start pt-2'
							/>
						</div>
					</div>

				</div>
			</Modal>
		);
	};

	return (
		<HeaderStyle>
			<div className='w-full'>
				{ /* <MainNavLanguage /> */ }
				<div className={ 'xl:!px-[40px] navbar animate-slideUpToDown transition-all duration-300' }>
					<div className='leftNav'>
						<div className='logo cursor-pointer py-[22px] max-sm:py-[15px]'>
							<Link href='/'>
								<images.LogoRSPI />
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
									<icons.ArrowDown className={ 'xl:relative xl:top-[1px] [&>path]:stroke-gray-700' } />
								</div>
								<div id='dropdownOurHospital' className={ `${ isHover === false ? 'hidden' : 'fixed' } w-[480px] mt-[45px] ml-[240px] bg-white divide-y divide-gray-100 shadow custom-scrollbar` }>
									<ul className='text-sm text-gray-700' aria-labelledby='dropdownDefault'>
										{ Object.values(hospitalData || [])?.map((item, idx) => (
											<div key={ idx } className='hospital-list border-b border-gray flex py-4 px-4 items-center'>
												<img
													alt=''
													src={ item?.img_url?.[0] || '' }
													width={ 80 }
													height={ 80 }
												/>
												<div className='ml-[10px] w-[310px]'>
													<Text text={ item?.name } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
													<Text text={ item?.address } fontSize='14px' fontWeight='400' className='mt-[5px]' />
												</div>
												<icons.ArrowRight
													alt=''
													className='ml-[27px] mr-auto'
												/>
											</div>
										)) }
									</ul>
								</div>
							</div>

							<div id='centre-of-excellence' className='flex py-[22px] max-sm:py-[10px]' onMouseEnter={ toggleMouseHoverCOE(true) } onMouseLeave={ toggleMouseHoverCOE(false) }>
								<Text text={ 'Centre of Excellence' } className='cursor-pointer' color={ isHoverCOE === true ? colors.paradiso.default : colors.grey.darker } fontSize='14px' fontWeight='900' />
								<div className='ml-[9px] cursor-pointer'>
									<icons.ArrowDown
										className={ 'xl:relative xl:top-[1px] [&>path]:stroke-gray-700' }
									/>
								</div>
								<div id='dropdownOurHospital' className={ `${ isHoverCOE === false ? 'hidden' : 'fixed' } w-[480px] mt-[45px] ml-[380px] bg-white divide-y divide-gray-100 shadow custom-scrollbar` }>
									<ul className='text-sm text-gray-700' aria-labelledby='dropdownDefault'>
										{ Object.values(centerOfExcellenceData || [])?.map((item, idx) => (
											<Link href={ `/center-of-excellence/${ item.id }` } key={ idx }>
												<div className='hospital-list border-b border-gray flex py-4 px-4 items-center'>
													<img src={ item?.img_url?.[0] } width={ 60 } height={ 60 } />
													<div className='ml-[10px] w-[310px]'>
														<Text text={ item?.title } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
													</div>
													<icons.ArrowRight
														className='ml-[27px] mr-auto'
													/>
												</div>
											</Link>
										)) }
									</ul>
								</div>
							</div>

							<div id='facilities' className='flex py-[22px] max-sm:py-[10px]' onMouseEnter={ toggleMouseHoverFacilities(true) } onMouseLeave={ toggleMouseHoverFacilities(false) }>
								<Text text={ 'Facilities & Services' } className='cursor-pointer' color={ isHoverFacilities === true ? colors.paradiso.default : colors.grey.darker } fontSize='14px' fontWeight='900' />
								<div className='ml-[9px] cursor-pointer'>
									<icons.ArrowDown
										className={ 'xl:relative xl:top-[1px] [&>path]:stroke-gray-700' }
									/>
								</div>
								<div id='dropdownOurHospital' className={ `${ isHoverFacilities === false ? 'hidden' : 'fixed' } w-[480px] mt-[45px] ml-[540px] bg-white divide-y divide-gray-100 shadow custom-scrollbar` }>
									<ul className='text-sm text-gray-700' aria-labelledby='dropdownDefault'>
										{ Object.values(facilityServicesData || [])?.map((item, idx) => (
											<Link href={ `/facilities-services/${ item.slug }` } key={ idx }>
												<div className='hospital-list border-b border-gray flex py-4 px-4 items-center'>
													<img src={ item?.image_url?.[0] } width={ 60 } height={ 60 } />
													<div className='ml-[10px] w-[310px]'>
														<Text text={ item?.name } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
													</div>
													<icons.ArrowRight
														alt=''
														className='ml-[27px] mr-auto'
													/>
												</div>
											</Link>
										)) }

										<Link href={ '/facilities-services/medical-specialities' } >
											<div className='hospital-list border-b border-gray flex py-4 px-4 items-center'>
												<Image src={ images.AestheticClinic } alt='' width={ 60 } height={ 60 } />
												<div className='ml-[10px] w-[310px]'>
													<Text text={ 'Medical Specialities' } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
												</div>
												<icons.ArrowRight
													className='ml-[27px] mr-auto'
												/>
											</div>
										</Link>
									</ul>
								</div>
							</div>

							<div id='career' className='py-[22px] max-sm:py-[10px]'>
								<Text text={ 'Career' } className='cursor-pointer' color={ colors.grey.darker } fontSize='14px' fontWeight='900' />
							</div>

							<a id='find-doctor' className='py-[22px] max-sm:py-[10px]' href='/find-a-doctor'>
								<Text text={ 'Find a Doctor' } className='cursor-pointer' color={ colors.grey.darker } fontSize='14px' fontWeight='900' />
							</a>

						</div>
					</div>
					<div className='rightNav py-[22px] max-sm:py-[10px]'>
						<div className='translate'>
							<div className='mobile-nav flex items-center gap-6 sm:hidden'>
								<icons.Notif onClick={ () => setShowNotification(true) } />
								<Icons.AlignLeft onClick={ () => setShowSideBar(!showSideBar) } />
							</div>
							<div className='p-4'>
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
													className='absolute top-0 right-0 px-2 py-1 translate-x-1/2 bg-red-500 border border-white rounded-full text-xs text-white'>0</span>
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
														: <images.Profile className='w-[50px] h-[50px]' /> }
													{ /* <Image src={ '' } alt={ '' } /> :
													<Image
														src={ images.Profile }
														alt=''
													/> */ }

												</div>
												<div className='ml-[24px] cursor-pointer'>
													<icons.ArrowDown
														className={ 'xl:relative xl:top-[1px] [&>path]:stroke-gray-700' }
														onClick={ () => setDropdownHide(!dropdownHide) }
													/>
												</div>
											</div>
										</> :
										<Button className='btn-main h-[44px] min-w-[190px]' theme='outline' hoverTheme='primary' onClick={ handleLoginClick }>Login / Register</Button>
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
											<Text color={ colors.red.text } className='block py-4 px-4 cursor-pointer' onClick={ handleClick }>Logout</Text>
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
								onClick={ () => handleNavigateSideBar('/center-of-excellence') }>
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
