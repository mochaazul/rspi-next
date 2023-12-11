'use client';

import { ReactElement, useState } from 'react';

import { I18nProviderClient } from '@/locales/client';
import { SWRConfig } from 'swr';
import LogoutModal from '@/components/ui/LogoutModal';
import NeedLoginModal from '@/components/ui/NeedLoginModal';

export default function SubLayout({ params: { locale }, children }: { params: { locale: string; }, children: ReactElement; }) {
	const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
	const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
	return (
		<SWRConfig
			value={ {
				onError: (err: any, key: string) => {
					if (err.message.toLowerCase().includes('token is invalid') || err.message.toLowerCase().includes('token is expired'))
						setLoginModalVisible(true);
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
			<NeedLoginModal visible={ loginModalVisible } toggler={ setLoginModalVisible } onClose={ () => setLoginModalVisible(false) } />
		</SWRConfig>
	);
}