import { baseUrl } from '@/config';
// import { localStorage } from '@/helpers';
// import { getLanguage } from '@/helpers/localStorage';
import { ResponseType } from '@/interface';

type Option = {
	endpoint: string,
	payload?: any,
	method: 'POST' | 'GET' | 'DELETE' | 'PATCH' | 'PUT';
	baseUrl?: string;
	token?: string;
	// eslint-disable-next-line no-undef
	header?: HeadersInit;
	isUpload: boolean;
};

/**
 * Function to make api call to endpoint provided
 * @param {Option} [option] - This is the object that contains the request parameters.
 * @returns Promise<ResponseType<T>>
*/

const generateBaseUrl = (endpoint: string, customBaseUrl?: string) => {
	if (customBaseUrl && endpoint) {
		return customBaseUrl + endpoint;
	}
	if (!customBaseUrl && endpoint) {
		return baseUrl + endpoint;
	}
	return '';
};

export const apiCall = async <T = unknown>({
	baseUrl, endpoint, header, method, payload, isUpload
}: Option): Promise<ResponseType<T>> => {
	try {
		const url = generateBaseUrl(endpoint, baseUrl);
		// const Authorization = localStorage.getToken() ? `${ localStorage.getToken() }` : '';
		const headers: Record<string, any> = {
			// 'content-language': getLanguage() ?? 'idn',
			'content-language': 'idn',
			// Authorization,
			'X-Channel': 'website',
			...header
		};
		let body = payload;
		if (!isUpload) {
			headers['Content-Type'] = 'application/json';
			headers['Accept'] = 'application/json';
			body = JSON.stringify(payload);
		}

		const response = await fetch(url, {
			method: method,
			headers,
			body: (method !== 'GET' && body) || null
		});
		const data = await response.json();
		if (!response.ok) {
			// Promise rejection will be handled on middleware
			// there is global error handler for redux thunk on middleware
			// use error handler logic there instead in here
			return Promise.reject(data);
		}
		return data;
	} catch (error) {
		throw new Error(error as any);
	}
};
