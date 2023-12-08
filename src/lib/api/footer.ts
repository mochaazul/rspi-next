import { FooterState } from '@/interface';

import fetcher, { ApiOptions } from './utils/fetcher';

export const getFooterPages = (options?: ApiOptions) => {
	return fetcher<FooterState>('footerPages', options);
};