'use server';

import {
	ForgotPasswordType,
	NewPasswordPayload,
	LoginType,
	ResendEmailVerificationType,
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

export const register = async (formRegister: RegisterType) => {
	// builder.addCase(register.fulfilled, (state, action) => {
	// 			state.loading = false;
	// 			state.user = action.payload.data;
	// 			state.error = initialState.error;
	// 			state.registerOnboard = true;
	// 			localStorage.setTokenUser(action.payload.data.token || '');
	// 		});
	const registerRes = await fetcher<UserData>('register', { body: formRegister });

	if (registerRes?.stat_code === 'APP:SUCCESS') {
		// cookiesHelper.setTokenUser(registerRes?.data?.token || ''); // notes: token is empty, get token after verify-email
		cookiesHelper.setUserData(JSON.stringify(registerRes?.data));
	}

	return registerRes;
};

export const verifyEmail = async (token: string) => {
	const verifyRes = await fetcher<string>('verifyEmail', { query: { token } });

	if (verifyRes?.stat_code === 'APP:SUCCESS') {
		cookiesHelper.setTokenUser(verifyRes?.data || '');
	}

	return verifyRes;
};