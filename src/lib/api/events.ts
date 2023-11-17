import { EventClassesDetail, EventClassesQuery, EventClassesState } from '@/interface';
import fetcher, { ApiOptions } from './utils/fetcher';

export const getEvents = (query?:EventClassesQuery) => {
	return fetcher<EventClassesDetail[]>('events', { query });
};

export const getAllEvents = (param: ApiOptions | undefined) => {
	return fetcher<EventClassesState['events']>('events', param);
};

export const getPromoById = (param: ApiOptions | undefined) => {
	return fetcher<EventClassesState['selectedEvent']>('events', param);
}