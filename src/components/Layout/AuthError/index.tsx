'use client';

import { ReactElement, useEffect, useState } from 'react';

import LogoutModal from '@/components/ui/LogoutModal';
import NeedLoginModal from '@/components/ui/NeedLoginModal';

const AuthError = ({ children, errorMessage }: { children: ReactElement; errorMessage?: string; }) => {
	const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
	const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);

	useEffect(() => {
		if (errorMessage) {
			if (errorMessage.toLowerCase().includes('token is invalid') || errorMessage.toLowerCase().includes('token is expired'))
				setLoginModalVisible(true);
			if (errorMessage.toLowerCase().includes('signed out because your account is signed in from another device'))
				setLogoutModalVisible(true);
		}
	}, [errorMessage]);

	return (
		<>
			{ children }

			<LogoutModal visible={ logoutModalVisible } toggler={ setLogoutModalVisible } />
			<NeedLoginModal visible={ loginModalVisible } toggler={ setLoginModalVisible } onClose={ () => setLoginModalVisible(false) } />
		</>
	);
};

export default AuthError;
