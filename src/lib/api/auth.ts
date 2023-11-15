'use server';

import {
	ForgotPasswordType,
	NewPasswordPayload,
	LoginType,
	ResendEmailVerificationType,
	UserData
} from '@/interface';
import { cookiesHelper } from '@/helpers';

import fetcher from './utils/fetcher';
import { getProfile } from './profile';

export const login = async (loginPayload: LoginType) => {
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

export const forgotPassword = (formForgotPassword: ForgotPasswordType) => {
	return fetcher<any>('forgotPassword', { body: formForgotPassword });
};

export const verifyResetToken = (token: string) => {
	return fetcher<any>('verifyResetToken', { query: { token } });
};

export const setNewPassword = (token: string, formNewPassword: NewPasswordPayload) => {
	return fetcher<any>('newPassword', { body: formNewPassword, query: { token } });
};