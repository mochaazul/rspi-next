'use server';

import { revalidateTag } from 'next/cache';

import { NotificationResponse } from '@/interface';

import fetcher, { ApiOptions } from './utils/fetcher';

export const getNotification = (param: ApiOptions) => {
	return fetcher<NotificationResponse>('getNotification', {
		...param,
		requestOpt: {
			next: {
				tags: ['notification']
			}
		}
	});
};

export const markAllNotif = async (param: ApiOptions) => {
	const res = await fetcher('readNotification', param);
	revalidateTag('notification');

	return res;
};