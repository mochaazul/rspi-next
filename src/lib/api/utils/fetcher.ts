import { config } from '@/constants/config';
import endpoints, { EndpointKey } from './endpoints';
import { ResponseType as SuccessResponse } from '@/interface';

type ApiOptions = {
  body?: any,
  param?: any
  query?: any
}

const baseUrl = config.baseUrl ?? 'localhost:3000/v1';

export default async <Response>(endpointKey:EndpointKey, options?:ApiOptions):Promise<SuccessResponse<Response>> =>  {
	try {

		const endpoint = endpoints[endpointKey];
		const fetchOpt:Record<string, any> = {};
		const Authorization = process.env.NEXT_PUBLIC_TOKEN;
		const headers: Record<string, any> = {
			'content-language': 'idn',
			Authorization,
			'X-Channel': 'website',
		};

		const url = baseUrl + endpoint.path + `${options?.param ? '/' + options?.param : ''}` + `${options?.query ? `?${options?.query}` : ''}`;
		
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
	} catch (error:any) {
		console.log(error);
		return error;
	}
};
