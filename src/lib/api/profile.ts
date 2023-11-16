import { FamilyProfilePayload, UserDataDetail } from '@/interface';

import fetcher, { ApiOptions } from './utils/fetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export const getProfile = () => {
	return fetcher<UserDataDetail>('profile');
};

export const useGetProfile = (options?: ApiOptions) => {
	return useSWR('profile', () => fetcher<UserDataDetail>('profile', options));
};

export const useGetFamilyProfile = (options?: ApiOptions) => {
	return useSWR('familyProfile', () => fetcher<UserDataDetail[]>('familyProfile', options));
};

export const useFamilyProfileMutation = (options?: ApiOptions) => {
	return useSWRMutation('familyProfile', (key, { arg }: {arg: FamilyProfilePayload}) => fetcher<UserDataDetail[]>('createFamilyProfile', { ...options, body: arg }));
};

export const useDeleteFamilyProfileMutation = (options?:ApiOptions) => {
	return useSWRMutation('familyProfile', (key, { arg }: {arg: {id: number}}) => fetcher<UserDataDetail[]>('deleteFamilyProfile', { ...options, param: `${arg.id}` }));
};