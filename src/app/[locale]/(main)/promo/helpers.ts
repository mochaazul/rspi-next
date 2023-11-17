import { getAllEvents } from '@/lib/api/events';

export const fetchEvents = (params: any) => {
	const paramFetch = {
		query: params,
	};
	return getAllEvents(paramFetch);
};