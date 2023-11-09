/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventClassesDetail, PayloadEventClasses } from '@/interface';
import { endpoints } from '@/constant';
import { thunkUtils } from '@/utils';

export const getEvents = thunkUtils<EventClassesDetail[], PayloadEventClasses>({
	type: 'events/getEvents',
	method: 'GET',
	endpoint: endpoints.events,
});

export const getEventsByID = thunkUtils<EventClassesDetail, PayloadEventClasses>({
	type: 'events/getEventsByID',
	method: 'GET',
	endpoint: endpoints.events,
});