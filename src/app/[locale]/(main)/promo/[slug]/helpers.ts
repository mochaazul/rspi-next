
import { getPromoById } from '@/lib/api/events';
import { getEvents } from '@/lib/api/events';

export const fetchPromoByID = (slug: any) => {
	const paramFetch = {
		param: slug,
	};

	return getPromoById(paramFetch);
};

export const fetchEvents = () => {
	return getEvents();
};