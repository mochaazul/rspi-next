'use server';

import { cookies } from 'next/headers';

export const getToken = async () => {
	const token = cookies().get('token')?.value ?? '';

	return token;
};

export const setTokenUser = async (token: string) => {
	return cookies().set('token', token);
};

export const clearToken = () => {
	return cookies().delete('token');
};

export const setUserData = async (userData: string) => {
	return cookies().set('userData', userData);
};

export const getUserData = () => {
	const userData = cookies().get('userData')?.value;

	return userData && JSON.parse(userData);
};

export const clearStorage = () => {
	clearToken();
	cookies().delete('userData');
};

export const getCurrentLocale = async () => {
	const nextLocale = cookies().get('Next-Locale')?.value;

	return nextLocale;
};

export const getUrlForRedirectLogin = async () => {
	const nextLocale = cookies().get('redirect-url-login')?.value ?? '/';
	cookies().delete('redirect-url-login'); // delete stored url, avoid being redirected to same url everytime do log in
	return nextLocale;
};

export const setUrlForRedirectLogin = async (url: string) => {
	return cookies().set('redirect-url-login', url);
};