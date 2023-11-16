import { FamilyProfilePayload, UserDataDetail } from '@/interface';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import fetcher, { ApiOptions } from '../utils/fetcher';

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