import endpoints, { EndpointKey } from './endpoints';
import { Pagination, ResponseType as SuccessResponse } from '@/interface';
import { generateQueryString } from '@/helpers';
import { config } from '@/constant/config';

export type ApiOptions = {
	body?: Record<string, any>,
	param?: string;
	query?: Record<string, any>,
	pagination?: Pagination;
};

const baseUrl = config.baseUrl ?? 'localhost:3000/v1';

export default async <Response>(endpointKey: EndpointKey, options?: ApiOptions): Promise<SuccessResponse<Response>> => {
	try {
		const endpoint = endpoints[endpointKey];
		const fetchOpt: Record<string, any> = {};
		const safeQueryParam = options?.query ?? {};
		const safePagination = options?.pagination ?? {};
		const Authorization = 'TODO IMPLEMENTED USING COOKIEES';
		const headers: Record<string, any> = {
			'content-language': 'idn',
			Authorization,
			'X-Channel': 'website',
		};

		let url = baseUrl + endpoint.path;

		if (options?.param) {
			url += `/${ options.param }`;
		}

		url += '?' + generateQueryString({
			...safeQueryParam,
			...safePagination
		});

		if (options && options.body) fetchOpt['body'] = JSON.stringify(options.body);

		const res = await fetch(url, {
			method: endpoint.method,
			headers,
			...fetchOpt,
		});
		const response = await res.json();

		if (!res.ok) {
			Promise.reject(response);
		}

		// Check if the endpoint def have payload def or not if yes then return typed response
		return response;
	} catch (error: any) {
		console.log(error);
		return error;
	}
};