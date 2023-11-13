import { AwardsDetail, Pagination, PayloadAwards } from '@/interface';
import fetcher from './utils/fetcher';

export const getAwards = (query?: PayloadAwards, pagination?: Pagination) => {
	return fetcher<AwardsDetail[]>('awards', { query, pagination });
};
