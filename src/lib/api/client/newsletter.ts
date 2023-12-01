import useSWRMutation from 'swr/mutation';
import fetcher, { ApiOptions } from '../utils/fetcher';
import { NewsletterPayload } from '@/interface/newsletter/index';

export const useUnsubscribe = (options?: ApiOptions) => {
	return useSWRMutation('createUnSubscribe', (key, { arg }: {arg: NewsletterPayload}) =>
		fetcher('unSubscribe', { ...options, body: arg })
	);
};

export const useSubscribe = (options?: ApiOptions) => {
	return useSWRMutation('createSubscribe', (key, { arg }: {arg: NewsletterPayload}) =>
		fetcher('subscribe', { ...options, body: arg })
	);
};