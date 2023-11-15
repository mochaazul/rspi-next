'use server';

import { ForgotPasswordType, NewPasswordPayload } from '@/interface';

import fetcher from './utils/fetcher';

export const forgotPassword = (formForgotPassword: ForgotPasswordType) => {
	return fetcher<any>('forgotPassword', { body: formForgotPassword });
};

export const verifyResetToken = (token: string) => {
	return fetcher<any>('verifyResetToken', { query: { token } });
};

export const setNewPassword = (token: string, formNewPassword: NewPasswordPayload) => {
	return fetcher<any>('newPassword', { body: formNewPassword, query: { token } });
};