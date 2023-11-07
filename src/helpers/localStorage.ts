"use-client";

export const clearToken = () => {
	return localStorage.removeItem('token');
};

export const getToken = () => {
	return localStorage.getItem('token');
};

export const setLanguage = (value: string) => {
	localStorage.setItem('lang', value);
};

export const hasLanguageSet = () => {
	const currentLanguage = localStorage.getItem('lang');
	if (!currentLanguage) {
		setLanguage('idn');
	}
};

export const getLanguage = () => {
	hasLanguageSet();
	return localStorage.getItem('lang');
};

export const setTokenUser = (token: string) => {
	return localStorage.setItem('token', token);
};

export const setUserLoginHistory = (user: string, token: string) => {
	let loginHistory = localStorage?.getItem('loginHistory') ?? '';

	setEmail(user);
	if (loginHistory != null || loginHistory != '') {
		let isAvail = false;
		loginHistory?.split(',').map(data => {
			if (data.split(':')[0] === user) {
				loginHistory = loginHistory?.replace(data.split(':')[1], token);
				isAvail = true;
				return false;
			}
		});
		if (!isAvail) {
			const joinLoginHistory = loginHistory + user + ': ' + token + ',';
			localStorage.setItem('loginHistory', joinLoginHistory);
		} else {
			localStorage.setItem('loginHistory', loginHistory);
		}
	} else {
		const joinLoginHistory = user + ': ' + token + ',';
		localStorage.setItem('loginHistory', joinLoginHistory);
	}
};

export const getUserLoginHistory = () => {
	return localStorage.getItem('loginHistory');
};

export const setEmail = (email: string) => {
	return localStorage.setItem('email', email);
};

export const getEmail = () => {
	return localStorage.getItem('email');
};

export const setUserData = (userData: string) => {
	return localStorage.setItem('userData', userData);
};

export const getUserData = () => {
	return localStorage.getItem('userData');
};

export const clearStorage = () => {
	return localStorage.clear();
};

export const clearPersistRoot = async (persistor: any) => {
	const dummy = Array(7).fill('');
	await Promise.all(dummy.map(() => {
		persistor.purge();
	}));
	localStorage.removeItem('persist:root');
};
