'use client';

import { ReactElement, useState } from 'react';

import { I18nProviderClient } from '@/locales/client';
import { SWRConfig } from 'swr';
import LogoutModal from '@/components/ui/LogoutModal';
import { isTokenError } from '@/utils/parseError';

export default function SubLayout({ params: { locale }, children }: { params: { locale: string; }, children: ReactElement; }) {
	const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
	return (
		<SWRConfig
			value={ {
			
				onError: (err:any, key: string) => {
					setLogoutModalVisible(isTokenError(err));
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

			<LogoutModal visible={ logoutModalVisible } toggler={ setLogoutModalVisible }/>
		</SWRConfig>
	);
}