import { EventClassesDetail, EventClassesQuery, PayloadEventClasses } from '@/interface';
import fetcher from './utils/fetcher';

export const getEvents = (query?:EventClassesQuery) => {
	return fetcher<EventClassesDetail[]>('events', { query });
};