'use client';

import { ReactElement, useState } from 'react';

import { usePathname } from 'next/navigation';
import { I18nProviderClient } from '@/locales/client';
import { SWRConfig } from 'swr';
import LogoutModal from '@/components/ui/LogoutModal';
import NeedLoginModal from '@/components/ui/NeedLoginModal';
import { cookiesHelper } from '@/helpers';

export default function SubLayout({ params: { locale }, children }: { params: { locale: string; }, children: ReactElement; }) {
	const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
	const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
	const pathname = usePathname(); // catch user last url

	return (
		<SWRConfig
			value={ {

				onError: (err: any, key: string) => {
					if (err.message.toLowerCase().includes('token is invalid') || err.message.toLowerCase().includes('token is expired')) {
						cookiesHelper.setUrlForRedirectLogin(pathname); // store user url, to be used as redirect url when user login
						setLoginModalVisible(true);
					}
					if (err.message.toLowerCase().includes('signed out because your account is signed in from another device'))
						setLogoutModalVisible(true);
				}
			} }
		>
			<I18nProviderClient locale={ locale }>
				{ children }
			</I18nProviderClient>

			{ /* Blocking Component / Global Component
				Any component that will behave as a blocker should be mounted here
				ex: Token expired modal , User-not logged in modal, toast (if any)
			*/ }

			<LogoutModal visible={ logoutModalVisible } toggler={ setLogoutModalVisible } />
			<NeedLoginModal visible={ loginModalVisible } toggler={ setLoginModalVisible } />
		</SWRConfig>
	);
}