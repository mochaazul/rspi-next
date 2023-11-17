import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import {
	CheckPinType,
	FamilyProfilePayload,
	PatientUploadPhoto,
	UpdateAvatarType,
	UpdateEmailType,
	UpdateProfileType,
	UserDataDetail
} from '@/interface';

import fetcher, { ApiOptions } from '../utils/fetcher';

export const useGetProfile = (options?: ApiOptions) => {
	return useSWR('profile', () => fetcher<UserDataDetail>('profile', options));
};

export const useGetFamilyProfile = (options?: ApiOptions) => {
	return useSWR('familyProfile', () => fetcher<UserDataDetail[]>('familyProfile', options));
};

export const useFamilyProfileMutation = (options?: ApiOptions) => {
	return useSWRMutation('familyProfile', (key, { arg }: { arg: FamilyProfilePayload; }) => fetcher<UserDataDetail[]>('createFamilyProfile', { ...options, body: arg }));
};

export const useDeleteFamilyProfileMutation = (options?: ApiOptions) => {
	return useSWRMutation('familyProfile', (key, { arg }: { arg: { id: number; }; }) => fetcher<UserDataDetail[]>('deleteFamilyProfile', { ...options, param: `${ arg.id }` }));
};

export const useGeneralUploads = (options?: ApiOptions) => {
	return useSWRMutation('generalUploads', (key, { arg }: { arg: { payload: File; }; }) => {
		const body = new FormData();
		body.append('upload', arg.payload);

		return fetcher<string>('generalUploads', { ...options, body: body, isUpload: true });
	});
};

export const useUpdateAvatar = (options?: ApiOptions) => {
	return useSWRMutation('updateAvatar', (key, { arg }: { arg: UpdateAvatarType; }) => fetcher<PatientUploadPhoto>('updateAvatar', { ...options, body: arg }));
};

export const useUpdateProfile = (options?: ApiOptions) => {
	return useSWRMutation('updateProfile', (key, { arg }: { arg: UpdateProfileType; }) => fetcher<any>('updateProfile', { ...options, body: arg }));
};

export const useUpdateEmail = (options?: ApiOptions) => {
	return useSWRMutation('updateEmail', (key, { arg }: { arg: UpdateEmailType; }) => fetcher<any>('updateEmail', { ...options, body: arg }));
};

export const useCheckPin = (options?: ApiOptions) => {
	return useSWRMutation('checkPin', (key, { arg }: { arg: CheckPinType; }) => fetcher<any>('checkPin', { ...options, body: arg }));
};