export const clearToken = () => {
	return localStorage.removeItem('token');
};

export const getToken = () => {
	return localStorage.getItem('token');
};

export const setLanguage = (value:string) => {
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

export const clearStorage = () => {
	return localStorage.clear();
};
