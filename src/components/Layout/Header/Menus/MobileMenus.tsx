import { PropsWithChildren, PropsWithRef } from 'react';
import { MobileMenuWrapper } from './style';
import * as Icons from 'react-feather';
import { colors } from '@/constant';
import { MainNavLanguage, Text } from '@/components/ui';
import { UserSessionData } from '@/interface';
import { useScopedI18n } from '@/locales/client';
import Link from 'next/link';

type Props = PropsWithRef<PropsWithChildren<{
  session?: UserSessionData
}>>

const MobileMenus = ({ session }:Props) => {
	const t = useScopedI18n('navMenu');
	const isLoggedIn = !!session?.token;
  
	return (
		<MobileMenuWrapper >
			<input id='menu' type='checkbox' className='peer'/>
			<label htmlFor='menu' className='peer-checked:hidden ' >
				<Icons.AlignLeft color={ colors.grey.darkOpacity } size={ 24 } />
			</label>
			<label htmlFor='menu' className='hidden peer-checked:block ' >
				<Icons.X color={ colors.grey.darkOpacity } size={ 24 } />
			</label>
			<div className='hidden absolute left-0 top-[100%] w-full peer-checked:block'>
				<MainNavLanguage session={ session } />
				<section className='bg-white h-screen  divide-y divide-solid'  >
					<div className='nav-menu ' >
						<Link href='/'>
							<Text text={ 'Beranda' } fontSize='16px' fontWeight='700' />
						</Link>
					</div>
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