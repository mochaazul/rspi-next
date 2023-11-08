/* eslint-disable @typescript-eslint/no-unused-vars */
import { BannerDetail, PayloadBanner } from '@/interface';
import { endpoints } from '@/constant';
import { thunkUtils } from '@/utils';

export const getBanner = thunkUtils<BannerDetail[], PayloadBanner>({
	type: 'banner/getBanner',
	method: 'GET',
	endpoint: endpoints.banner,
});