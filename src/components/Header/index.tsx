import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'react-feather';

import { useTypedSelector, useAppDispatch } from 'hooks';
import { Images, icons, colors } from 'constant';
import { Text, Button, MainNavLanguage } from 'components';
import { navigation } from 'helpers';
import { removeUser as removeUserData } from 'stores/User';
import {
	UserState,
	HospitalState,
	FacilityServicesState,
	CenterOfExcellenceState,
} from 'interface';

import HeaderStyle from './style';

const Header: React.FC = () => {
	const [dropdownHide, setDropdownHide] = useState(true);
	const [showSideBar, setShowSideBar] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [isHoverCOE, setIsHoverCOE] = useState(false);
	const [isHoverFacilities, setIsHoverFacilities] = useState(false);

	const userSelector = useTypedSelector<UserState>('user');
	const { user, userDetail } = userSelector;
	const { hospitals } = useTypedSelector<HospitalState>('hospital');
	const { facilityServices } = useTypedSelector<FacilityServicesState>('facilityServices');
	const { centerOfExcellence } = useTypedSelector<CenterOfExcellenceState>('centerOfExcellence');
	const removeUser = useAppDispatch(removeUserData);
	const { navigate } = navigation();
	const isLoggedIn = !!user.token;

	const toggleMouseHover = (hovered: boolean) => () => { setIsHover(hovered); };
	const toggleMouseHoverCOE = (hovered: boolean) => () => { setIsHoverCOE(hovered); };
	const toggleMouseHoverFacilities = (hovered: boolean) => () => { setIsHoverFacilities(hovered); };

	const handleClick = () => {
		if (isLoggedIn) {
			removeUser();
		}
		navigate('/');
	};

	const handleLoginClick = () => {
		navigate('/login');
	};

	const handleNavigateSideBar = (path: string) => {
		setShowSideBar(!showSideBar);
		navigate(path);
	};

	return (
		<HeaderStyle>
			<div className='w-full'>
				<MainNavLanguage />
				<div className={ 'xl:!px-[40px] navbar animate-slideUpToDown transition-all duration-300' }>
					<div className='leftNav'>
						<div className='logo cursor-pointer py-[22px] max-sm:py-[15px]'>
							<Link to='/'>
								<Images.LogoRSPI />
							</Link>
						</div>
						<div className='menu max-sm:hidden'>
							<div id='home' className='py-[22px] max-sm:py-[10px]'>
								<Link to='/'>
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
										{ hospitals.map((item, idx) => (
											<div key={ idx } className='hospital-list border-b border-gray flex py-4 px-4 items-center'>
												<img src={ item?.img_url?.[0] } width={ 80 } height={ 80 } />
												<div className='ml-[10px] w-[310px]'>
													<Text text={ item?.name } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
													<Text text={ item?.address } fontSize='14px' fontWeight='400' className='mt-[5px]' />
												</div>
												<icons.ArrowRight className='ml-[27px] mr-auto' />
											</div>
										)) }
									</ul>
								</div>
							</div>

							<div id='centre-of-excellence' className='flex py-[22px] max-sm:py-[10px]' onMouseEnter={ toggleMouseHoverCOE(true) } onMouseLeave={ toggleMouseHoverCOE(false) }>
								<Text text={ 'Centre of Excellence' } className='cursor-pointer' color={ isHoverCOE === true ? colors.paradiso.default : colors.grey.darker } fontSize='14px' fontWeight='900' />
								<div className='ml-[9px] cursor-pointer'>
									<icons.ArrowDown className={ 'xl:relative xl:top-[1px] [&>path]:stroke-gray-700' } />
								</div>
								<div id='dropdownOurHospital' className={ `${ isHoverCOE === false ? 'hidden' : 'fixed' } w-[480px] mt-[45px] ml-[380px] bg-white divide-y divide-gray-100 shadow custom-scrollbar` }>
									<ul className='text-sm text-gray-700' aria-labelledby='dropdownDefault'>
										{ centerOfExcellence.map((item, idx) => (
											<Link to={ `/center-of-excellence/${ item.id }` } key={ idx }>
												<div className='hospital-list border-b border-gray flex py-4 px-4 items-center'>
													<img src={ item?.img_url?.[0] } width={ 60 } height={ 60 } />
													<div className='ml-[10px] w-[310px]'>
														<Text text={ item?.title } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
													</div>
													<icons.ArrowRight className='ml-[27px] mr-auto' />
												</div>
											</Link>
										)) }
									</ul>
								</div>
							</div>

							<div id='facilities' className='flex py-[22px] max-sm:py-[10px]' onMouseEnter={ toggleMouseHoverFacilities(true) } onMouseLeave={ toggleMouseHoverFacilities(false) }>
								<Text text={ 'Facilities & Services' } className='cursor-pointer' color={ isHoverFacilities === true ? colors.paradiso.default : colors.grey.darker } fontSize='14px' fontWeight='900' />
								<div className='ml-[9px] cursor-pointer'>
									<icons.ArrowDown className={ 'arrowdown xl:relative xl:top-[1px] [&>path]:stroke-gray-700' } />
								</div>
								<div id='dropdownOurHospital' className={ `${ isHoverFacilities === false ? 'hidden' : 'fixed' } w-[480px] mt-[45px] ml-[540px] bg-white divide-y divide-gray-100 shadow custom-scrollbar` }>
									<ul className='text-sm text-gray-700' aria-labelledby='dropdownDefault'>
										{ facilityServices?.map((item, idx) => (
											<Link to={ `/facilities/${ item.id }` } key={ idx }>
												<div className='hospital-list border-b border-gray flex py-4 px-4 items-center'>
													<img src={ item?.image_url?.[0] } width={ 60 } height={ 60 } />
													<div className='ml-[10px] w-[310px]'>
														<Text text={ item?.name } fontSize='16px' fontWeight='900' color={ colors.paradiso.default } />
													</div>
													<icons.ArrowRight className='ml-[27px] mr-auto' />
												</div>
											</Link>
										)) }
									</ul>
								</div>
							</div>

							<div id='career' className='py-[22px] max-sm:py-[10px]'>
								<Text text={ 'Career' } className='cursor-pointer' color={ colors.grey.darker } fontSize='14px' fontWeight='900' />
							</div>

							<Link id='find-doctor' className='py-[22px] max-sm:py-[10px]' to='/find-a-doctor'>
								<Text text={ 'Find a Doctor' } className='cursor-pointer' color={ colors.grey.darker } fontSize='14px' fontWeight='900' />
							</Link>

						</div>
					</div>
					<div className='rightNav py-[22px] max-sm:py-[10px]'>
						<div className='translate'>

							<div className='mobile-nav flex items-center gap-6 sm:hidden'>
								<icons.Notif />
								<Icons.AlignLeft onClick={ () => setShowSideBar(!showSideBar) } />
							</div>

							<div className='flex items-center gap-6 max-sm:hidden'>
								<Button className='btn-main h-[44px] min-w-[190px]' onClick={ () => navigate('/find-a-doctor') }>Book Appointment</Button>
								{
									isLoggedIn ?
										<>
											<div className='mx-[24px] my-auto'><i><icons.Notif /></i></div>
											<div className='flex text-white items-center'>
												<div>
													{
														!!userDetail?.img_url ?
															<img src={ userDetail?.img_url } alt={ userDetail.name } /> :
															<Images.Profile />
													}
												</div>
												<div className='ml-[24px] cursor-pointer'>
													<icons.ArrowDown className={ 'xl:relative xl:top-[1px] [&>path]:stroke-gray-700' } onClick={ () => setDropdownHide(!dropdownHide) } />
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
											navigate('/patient-portal');
										} }>
											<a href='#' className='border-b border-gray block py-4 px-4'>Patient Portal</a>
										</li>
										<li>
											<a href='/user-information' className='border-b border-gray block py-4 px-4'>User Information</a>
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
								onClick={ () => handleNavigateSideBar('/') }>
								<Text text={ 'Home' } fontSize='16px' fontWeight='700' />
							</div>
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
		</HeaderStyle >
	);
};

export default React.memo(Header);
