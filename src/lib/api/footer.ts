import { FooterDetail } from '@/interface';

import fetcher, { ApiOptions } from './utils/fetcher';

export const getFooterPages = (options?: ApiOptions) => {
	return fetcher<FooterDetail[]>('footerPages', options);
};