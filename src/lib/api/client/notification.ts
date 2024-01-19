import fetcher, { ApiOptions } from '../utils/fetcher';

export const markAllAsReadClient = (param: ApiOptions) => {
	return fetcher('readNotification', param);
};
