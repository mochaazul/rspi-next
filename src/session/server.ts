'use server';

import { cookiesHelper } from '@/helpers';
import { UserSessionData } from '@/interface';

const getSession = async(): Promise<UserSessionData> => {
	const userData = await cookiesHelper.getUserData();
	const token = await cookiesHelper.getToken();

	return {
		user: userData,
		token,
		isAuthenticated: !!token
	};
};

export default getSession;