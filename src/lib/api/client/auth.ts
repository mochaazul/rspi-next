import useSWRMutation from 'swr/mutation';

import { ResendEmailVerificationType } from '@/interface';

import fetcher, { ApiOptions } from '../utils/fetcher';

export const requestVerifyEmail = (formResend: ResendEmailVerificationType) => {
	return fetcher('reVerifyEmail', { body: formResend });
};

export const useVerifyChangeEmailToken = (options?: ApiOptions) => {
	return useSWRMutation('verifyChangeEmailToken', (key, { arg }: { arg: { token: string; }; }) => fetcher<any>('verifyChangeEmailToken', { ...options, query: arg }));
};