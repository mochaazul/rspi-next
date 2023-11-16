'use server';

import {
	LoginType,
	ResendEmailVerificationType,
	UserData
} from '@/interface';
import { cookiesHelper } from '@/helpers';

import fetcher from '../utils/fetcher';
import { getProfile } from '../profile';

export const login = async(loginPayload: LoginType) => {
	const loginRes = await fetcher<UserData>('auth', { body: loginPayload });

	if (loginRes.stat_code === 'APP:SUCCESS') {
		const userLogin = loginRes?.data;
		cookiesHelper.setTokenUser(userLogin.token || '');

		const userDetail = await getProfile();
		cookiesHelper.setUserData(JSON.stringify(userDetail?.data));
	}

	return loginRes;
};

export const requestVerifyEmail = (formResend: ResendEmailVerificationType) => {
	return fetcher('reVerifyEmail', { body: formResend });
};