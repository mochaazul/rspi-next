'use server';

import {
	LoginType,
	UserData,
	RegisterType
} from '@/interface';
import { cookiesHelper } from '@/helpers';

import fetcher from './utils/fetcher';
import { getProfile } from './profile';

export const login = async (loginPayload: LoginType) => {
	const loginRes = await fetcher<UserData>('auth', { body: loginPayload });

	if (loginRes.stat_code === 'APP:SUCCESS') {
		const userLogin = loginRes?.data;
		await cookiesHelper.setTokenUser(userLogin.token || '');

		const userDetail = await getProfile();
		cookiesHelper.setUserData(JSON.stringify({
			...userDetail?.data,
			...userLogin
		}));
	}

	return loginRes;
};

export const register = async (formRegister: RegisterType) => {
	const registerRes = await fetcher<UserData>('register', { body: formRegister });

	if (registerRes?.stat_code === 'APP:SUCCESS') {
		await cookiesHelper.clearToken();
		cookiesHelper.setUserData(JSON.stringify(registerRes?.data));
	}

	return registerRes;
};

export const verifyEmail = async (token: string) => {
	const verifyRes = await fetcher<string>('verifyEmail', { query: { token } });

	if (verifyRes?.stat_code === 'APP:SUCCESS') {
		await cookiesHelper.setTokenUser(verifyRes?.data || '');

		const userDetail = await getProfile();
		cookiesHelper.setUserData(JSON.stringify(userDetail?.data));
	}

	return verifyRes;
};
