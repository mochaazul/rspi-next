'use server';

import {
	getHospitals,
	getCenterOfExcellence,
	getNotificationResponse,
	postMarkNotifAllRead,
	getFooterSlug,
} from '@/lib/api';

import { getFAS } from '@/lib/api/clinics';

// TO DO : ambil mr & email ambil dari session
const paramNotification = {
	param: null,
	query: {
		medical_record: 100154999,
		email: 'riko.logwirno@rebelworks.co'
	},
	body: null,
};

export async function marAllReadNotif(params: any) {
	const paramMarkAllReadNotif = {
		param: params,
		query: null,
		body: null,
	};
	return postMarkNotifAllRead(paramMarkAllReadNotif);

};

export const footersFetch = async () => await getFooterSlug();
export const hospitalsFetch = async () => await getHospitals();
export const centerOfExcellenceFetch = async () => await getCenterOfExcellence();
export const facilityServicesFetch = async () => await getFAS();
export const notificationResponseFetch = async () => await getNotificationResponse(paramNotification);