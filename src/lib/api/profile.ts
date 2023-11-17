'use server';

import { UserDataDetail } from '@/interface';
import { cookiesHelper } from '@/helpers';

import fetcher from './utils/fetcher';

export const getProfile = async (setCookies?: boolean) => {
	const response = await fetcher<UserDataDetail>('profile');
	if (response?.stat_code === 'APP:SUCCESS' && setCookies) {
		const currentUser = await cookiesHelper.getUserData();

		cookiesHelper.setUserData(JSON.stringify({
			medical_record: currentUser?.currentUser,
			pin_status: currentUser?.pin_status,
			...response?.data
		}));
	}

	return response;
};
