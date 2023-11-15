import { UserDataDetail } from '@/interface';

import fetcher from './utils/fetcher';

export const getProfile = () => {
	return fetcher<UserDataDetail>('profile');
};
