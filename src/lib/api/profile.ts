'use server';

import {  FamilyProfilePayload, UpdateProfileType, UserDataDetail } from '@/interface';
import { cookiesHelper } from '@/helpers';
import { revalidateTag } from 'next/cache';

import fetcher from './utils/fetcher';

export const getProfile = async(setCookies?: boolean) => {
	const response = await fetcher<UserDataDetail>('profile', {
		requestOpt: {
			next: {
				tags: ['profile']
			}
		}
	});
	if (response?.stat_code === 'APP:SUCCESS' && setCookies) {
		const currentUser = await cookiesHelper.getUserData();

		cookiesHelper.setUserData(JSON.stringify({
			medical_record: currentUser?.medical_record,
			pin_status: currentUser?.pin_status,
			...response?.data
		}));
	}

	return response;
};

export const getFamilyProfiles = async() => {
	return fetcher<UserDataDetail[]>('familyProfile', { requestOpt: {
		next: {
			tags: ['familyProfiles']
		},
		cache: 'no-cache'
	} });
};

export const addFamilyProfile = async(payload: FamilyProfilePayload) => {
	const res = await fetcher<UserDataDetail>('createFamilyProfile', {
		body: payload
	});
	
	revalidateTag('familyProfiles');
	return res;
};

export const updateProfile = async(palyoad: UpdateProfileType) => {
	const res = await fetcher<UserDataDetail>('updateProfile', {
		body: palyoad
	});
	revalidateTag('profile');
	return res;
};

export const deleteFamilyProfile = async(id: number) => {
	const res = await fetcher('deleteFamilyProfile', {
		param: `${id}`
	});
	
	revalidateTag('profile');
	return res;
};