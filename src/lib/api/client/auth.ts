'use server';

import { UserData, CheckPinType } from '@/interface';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import fetcher, { ApiOptions } from '../utils/fetcher';

export const usePostCheckPinMutation = (options?: ApiOptions) => {
	return useSWRMutation('checkPin', (key, { arg }: { arg: CheckPinType; }) => fetcher<UserData[]>('checkPin', { ...options, body: arg }));
};