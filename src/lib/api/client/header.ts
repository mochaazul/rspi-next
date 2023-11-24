'use client';
import useSWR from 'swr';

import { NotificationResponse } from '@/interface';

import fetcher, { ApiOptions } from '../utils/fetcher';

export const useNotification = (option?: ApiOptions) => {
	return useSWR('getNotification', () => fetcher<NotificationResponse>('getNotification', option));
};