'use server';

import {
	getHospitals,
	getCenterOfExcellence,
	getNotificationResponse,
	postMarkNotifAllRead,
	getFooterSlug,
} from '@/lib/api';

import { getFAS } from '@/lib/api/clinics';
import getSession from '@/session/server';
// import getSession from '@/session/server';

export async function marAllReadNotif() {
	const session = await getSession();

	return postMarkNotifAllRead({
		query: {
			medical_record: session.user?.medical_record,
			email: session.user?.email,
		},
	});
};

export const footersFetch = async() => await getFooterSlug();
export const hospitalsFetch = async() => await getHospitals();
export const centerOfExcellenceFetch = async() => await getCenterOfExcellence();
export const facilityServicesFetch = async() => await getFAS();
export const notificationResponseFetch = async() => {

	const session = await getSession();

	// TO DO : ambil mr & email ambil dari session

	return session.user?.medical_record ? await getNotificationResponse({
		query: {
			medical_record: session.user?.medical_record,
			email: session.user?.email,
		},
	}) : null;
};
