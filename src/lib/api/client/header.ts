'use client';
import useSWR from 'swr';

import { NotificationResponse } from '@/interface';

import fetcher, { ApiOptions } from '../utils/fetcher';

export const useNotification = (option?: ApiOptions) => {
	return useSWR(option?.query?.email ? 'getNotification' : null, option?.query?.email ? () => fetcher<NotificationResponse>('getNotification', option) : null);
};