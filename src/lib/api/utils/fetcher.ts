import endpoints, { EndpointKey } from './endpoints';
import { Pagination, ResponseType as SuccessResponse } from '@/interface';
import { cookiesHelper, generateQueryString } from '@/helpers';
import { config } from '@/constant/config';

export type ApiOptions = {
	body?: any,
	param?: string;
	query?: Record<string, any>,
	pagination?: Pagination;
	isUpload?: boolean;
};

const baseUrl = config.baseUrl ?? 'localhost:3000/v1';

export default async <Response>(endpointKey: EndpointKey, options?: ApiOptions): Promise<SuccessResponse<Response>> => {
	const endpoint = endpoints[endpointKey];
	const fetchOpt: Record<string, any> = {};
	const safeQueryParam = options?.query ?? {};
	const safePagination = options?.pagination ?? {};
	const Authorization = await cookiesHelper.getToken();

	const language = 'TODO: ADJUST WITH i18n thing';
	
	const headers: Record<string, any> = {
		'content-language': 'idn',
		...Authorization ? { Authorization } : {},
		'X-Channel': 'website'
		// 'Content-Type': options?.isUpload ? 'multipart/form-data' : 'application/json'
	};

	let url = baseUrl + endpoint.path;

	if (options?.param) {
		url += `/${ options.param }`;
	}

	url += '?' + generateQueryString({
		...safeQueryParam,
		...safePagination
	});

	if (options && options.body) {
		fetchOpt['body'] = options.isUpload ? options.body : JSON.stringify(options.body);
	}

	const res = await fetch(url, {
		method: endpoint.method,
		headers,
		...fetchOpt,
	});
	const response = await res.json();

	if (!res.ok) {
		if (typeof window === 'undefined') { // check the origin of the caller is server rendered / client rendered
			// just use console.error since throw, would result in crashing the service
			// eslint-disable-next-line no-console
			console.error({ endpoint, response });
		} else {
			// if client rendered we can safely use throw
			throw new Error(response.stat_msg);
		}
	}

	// Check if the endpoint def have payload def or not if yes then return typed response
	return response;

};
