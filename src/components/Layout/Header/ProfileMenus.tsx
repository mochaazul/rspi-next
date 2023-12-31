import { Modal, Text } from '@/components/ui';
import { icons } from '@/constant';
import { protectedRoutes } from '@/constant/config';
import { cookiesHelper } from '@/helpers';
import clearSWRCache from '@/helpers/clearSwrCache';
import { UserSessionData } from '@/interface';
import { useScopedI18n } from '@/locales/client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, PropsWithRef, useState } from 'react';
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

			if (!protectedRoutes?.some(path => pathname.includes(path))) {
				setShowSuccessLogout(true);
			}

			router.refresh();
		}
	};

	return (
		<>
    
			<div className='relative flex'>
				<div className='flex text-white items-center relative z-[2]'>
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
				</div>

				<div className={ `${ dropdownHide ? 'hidden' : 'absolute' } top-0 right-0 pt-[70px] z-[1]` }>
					<ul className='dropdownNavbar divide-y divide-gray-100 custom-scrollbar !w-[230px]' aria-labelledby='dropdownDefault'>
						<li>
							<Link href='/patient-portal' className='border-b border-gray block py-4 px-4 hover:bg-[#F0F2F9]' onClick={ () => setDropdownHide(true) }>
								{ t('user.patientPortal') }
							</Link>
						</li>
						<li>
							<Link href='/user-information' className='border-b border-gray block py-4 px-4 hover:bg-[#F0F2F9]' onClick={ () => setDropdownHide(true) }>
								{ t('user.patientInformation') }
							</Link>
						</li>
						<li className='block py-4 px-4 text-red-600 cursor-pointer hover:bg-[#F0F2F9]' onClick={ logOutHandler }>
							{ t('user.logout') }
						</li>
					</ul>
				</div>
			</div>
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
		</>
	);
};

export default ProfileMenus;