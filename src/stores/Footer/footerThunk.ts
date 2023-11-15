/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	FooterCategories, GetFooterParams
} from '@/interface';
import { endpoints } from '@/constant';
import { thunkUtils } from '@/utils';

export const getFooterCategories = thunkUtils<FooterCategories[]>({
	type: 'footer/footerCategories',
	method: 'GET',
	endpoint: endpoints.footerCategories,
});

export const getFooterSlug = thunkUtils<FooterCategories[], GetFooterParams>({
	type: 'footer/footerSlug',
	method: 'GET',
	endpoint: endpoints.getFooter,
});

export const getFooterDetail = thunkUtils<FooterCategories[], GetFooterParams>({
	type: 'footer/footerDetail',
	method: 'GET',
	endpoint: endpoints.getFooter,
});