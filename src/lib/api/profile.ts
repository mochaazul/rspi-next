'use server';

import { FamilyProfilePayload, UpdateProfileType, UserDataDetail } from '@/interface';
import { cookiesHelper } from '@/helpers';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import fetcher from './utils/fetcher';

// TODO: pisahkan di file lain
const isErrorToken = (errMessage?: string) => {
	const isShouldRedirect = errMessage && (errMessage?.toLowerCase().includes('token is invalid')
		|| errMessage?.toLowerCase().includes('token is expired')
		|| errMessage?.toLowerCase().includes('signed out because your account is signed in from another device'));

	return isShouldRedirect;
};

export const getProfile = async (setCookies?: boolean) => {
	const response = await fetcher<UserDataDetail>('profile', {
		requestOpt: {
			next: {
				tags: ['profile']
			}
		}
	});
	if (response?.stat_code === 'APP:SUCCESS') {
		if (setCookies) {
			const currentUser = await cookiesHelper.getUserData();

			cookiesHelper.setUserData(JSON.stringify({
				medical_record: currentUser?.medical_record,
				pin_status: currentUser?.pin_status,
				...response?.data
			}));
		}
	}

	return response;
};

export const getFamilyProfiles = async () => {
	return fetcher<UserDataDetail[]>('familyProfile', {
		requestOpt: {
			next: {
				tags: ['familyProfiles']
			}
		}
	});
};

export const addFamilyProfile = async (payload: FamilyProfilePayload) => {
	const res = await fetcher<UserDataDetail>('createFamilyProfile', {
		body: payload
	});

	revalidateTag('familyProfiles');
	return res;
};

export const updateProfile = async (palyoad: UpdateProfileType) => {
	const res = await fetcher<UserDataDetail>('updateProfile', {
		body: palyoad
	});
	// revalidateTag('profile');
	return res;
};

export const deleteFamilyProfile = async (id: number) => {
	const res = await fetcher('deleteFamilyProfile', {
		param: `${ id }`
	});

	revalidateTag('profile');
	return res;
};
