'use client';
import useSWR from 'swr';

import { FooterState } from '@/interface';

import fetcher, { ApiOptions } from '../utils/fetcher';

export const useGetFooterPages = (option?: ApiOptions) => {
	return useSWR('footerPages', () => fetcher<FooterState>('footerPages', option));
};