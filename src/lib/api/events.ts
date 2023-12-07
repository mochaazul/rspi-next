import { EventClassesDetail, EventClassesQuery, EventClassesState } from '@/interface';
import fetcher, { ApiOptions } from './utils/fetcher';

export const getEvents = (query?: EventClassesQuery) => {
	return fetcher<EventClassesDetail[]>('events', { query: { ...query, is_publish: true } });
};

export const getAllEvents = (param?: ApiOptions | undefined) => {
	return fetcher<EventClassesState['events']>('events', { ...param, query: { ...param?.query, is_publish: true } });
};

export const getPromoById = (param?: ApiOptions | undefined) => {
	return fetcher<EventClassesDetail[]>('events', { ...param, query: { ...param?.query, is_publish: true } });
};