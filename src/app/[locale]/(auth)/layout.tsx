'use server';

import { PropsWithChildren } from 'react';

import Header from '@/components/Layout/Header';
import getSession from '@/session/server';

import {
	centerOfExcellenceFetch,
	facilityServicesFetch,
	hospitalsFetch,
} from '../(main)/helpers';
import { NotificationResponse } from '@/interface';
import { getNotificationResponse } from '@/lib/api';

export default async function AuthLayout({ children }: PropsWithChildren) {
	const session = await getSession();
	const hospitals = await hospitalsFetch();
	const centerOfExcellence = await centerOfExcellenceFetch();
	const facilityServices = await facilityServicesFetch();
	let notificationResponseData: NotificationResponse = {
		notification: [],
		total_unread: 0
	};
	if (session?.token && session?.user?.email) {
		const notificationResponse = await getNotificationResponse({
			query: {
				medical_record: session?.user?.medical_record ?? '',
				email: session?.user?.email,
			},
		});
		notificationResponseData = notificationResponse?.data;
	}

	return (
		<>
			<div className='md:hidden'>
				<Header
					session={ session }
					hospitalData={ hospitals.data }
					centerOfExcellenceData={ centerOfExcellence.data }
					facilityServicesData={ facilityServices.data }
					notificationResponseData={ notificationResponseData }
				/>
			</div>

			{ children }
		</>
	);
}