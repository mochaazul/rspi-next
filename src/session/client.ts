'use client';

import { useEffect, useState } from 'react';

import { cookiesHelper } from '@/helpers';
import { UserSessionData } from '@/interface';
import { usePathname, useSearchParams } from 'next/navigation';

const isClientSide = (): boolean => typeof window !== 'undefined';
const decode = (str: string): string => {
	if (!str) return str;

	return str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
};

const useSession = (): UserSessionData => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [session, setSession] = useState<UserSessionData>({
		user: null,
		token: '',
		isAuthenticated: false
	});

	useEffect(() => {
		const getCookiesData = async () => {
			// let userData: UserSessionData['user'] = null;
			// let token = '';

			// if (!isClientSide()) {
			const userData = await cookiesHelper.getUserData();
			const token = await cookiesHelper.getToken();
			// } else {
			// 	let _cookies = {} as any;
			// 	const documentCookies = document.cookie ? document.cookie.split('; ') : [];
			// 	console.log('document.cookies');

			// 	for (let i = 0, len = documentCookies.length; i < len; i++) {
			// 		const cookieParts = documentCookies[i].split('=');

			// 		const _cookie = cookieParts.slice(1).join('=');
			// 		const name = cookieParts[0];

			// 		_cookies[name] = _cookie;
			// 	}

			// 	userData = _cookies['userData'] ? JSON.parse(decode(_cookies['userData'])) : null;
			// 	token = decode(_cookies['token']);
			// }

			setSession({
				user: userData,
				token,
				isAuthenticated: !!token
			});
		};

		getCookiesData();
	}, []);

	return session;
};

export default useSession;