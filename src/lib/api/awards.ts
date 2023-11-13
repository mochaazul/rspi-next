import { AwardsDetail } from '@/interface';

import fetcher, { ApiOptions } from './utils/fetcher';

export const getAwards = (options: ApiOptions) => {
	return fetcher<AwardsDetail[]>('awards', options);
};
