import { endpoints } from '@/constant';
import { NotificationResponse, PayloadNotification } from '@/interface/Notification';
import { thunkUtils } from '@/utils';

// function that accepts a Redux action type string and a callback function that should return a promise

export const getNotification = thunkUtils<NotificationResponse, PayloadNotification>({
	type: 'notification',
	method: 'GET',
	endpoint: endpoints.notification,
});

export const readNotification = thunkUtils({
	type: 'notification',
	method: 'GET',
	endpoint: endpoints.readNotification,
});