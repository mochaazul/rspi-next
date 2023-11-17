
import { getPromoById } from '@/lib/api/events';
import { getEvents } from '@/lib/api/events';

export const fetchPromoByID = (id: any) => {
	
	const paramFetch = {
		param: id,
	};

	return getPromoById(paramFetch);
};

export const fetchEvents = () => {
	return getEvents({ is_publish: true });
};