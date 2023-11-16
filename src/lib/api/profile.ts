import { FamilyProfilePayload, UserDataDetail } from '@/interface';

import fetcher, { ApiOptions } from './utils/fetcher';

export const getProfile = () => {
	return fetcher<UserDataDetail>('profile');
};
