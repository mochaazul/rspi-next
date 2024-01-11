'use client';
import { Modal, Text } from '@/components/ui';
import { icons } from '@/constant';
import { protectedRoutes } from '@/constant/config';
import { cookiesHelper } from '@/helpers';
import clearSWRCache from '@/helpers/clearSwrCache';
import { UserSessionData } from '@/interface';
import { useScopedI18n } from '@/locales/client';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, PropsWithChildren, PropsWithRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

type Props = PropsWithRef<PropsWithChildren<{
  session: UserSessionData
}>>

const ProfileMenus = ({ children, session }:Props) => {
	const [showSuccessLogout, setShowSuccessLogout] = useState<boolean>(false);
	const [dropdownHide, setDropdownHide] = useState<boolean>(true);
	const [showSideBar, setShowSideBar] = useState<boolean>(false);
	const t = useScopedI18n('navMenu');
	const isLoggedIn = !!session?.token;
	const { mutate, cache } = useSWRConfig();
	const router = useRouter();
	const pathname = usePathname();

	const logOutHandler = async() => {
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

	return (
		<>
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
						<Menu.Item as={ Link } href='/patient-portal' className='group/dropDownProfileList flex px-5 py-4 hover:bg-[#35888814]'>
							<Text subClassName='group-hover/dropDownProfileList:text-green-secondary'>{ t('user.patientPortal') }</Text>
						</Menu.Item>
						<Menu.Item as={ Link } href='/user-information' className='group/dropDownProfileList flex px-5 py-4 hover:bg-[#35888814]'>
							<Text subClassName='group-hover/dropDownProfileList:text-green-secondary'>{ t('user.patientInformation') }</Text>
						</Menu.Item>
						<Menu.Item as='div' className='px-5 py-4 text-[#D71F28] cursor-pointer hover:bg-[#35888814]' onClick={ logOutHandler }>
							{ t('user.logout') }
						</Menu.Item>
					</Menu.Items>
				</Transition>
			</Menu>
		</>
	);
};

export default ProfileMenus;