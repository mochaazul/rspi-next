'use server';

import { ToastContainer } from 'react-toastify';

import { appStage } from '@/config';
import { Footer, Header } from '@/components';
import MedicalRecordReminder from '@/components/ui/MedicalRecordReminder';
import CallForAmbulance from '@/components/ui/CallForAmbulance';
import DevTools from '@/components/ui/DevTools';

import { OutletStyleType, } from './style';
import {
	centerOfExcellenceFetch,
	facilityServicesFetch,
	footersFetch,
	hospitalsFetch
} from './helpers';
import getSession from '@/session/server';
import { NotificationResponse } from '@/interface';
import { getNotification } from '@/lib/api/notif';

export default async function RootLayout({
	props,
	children,
}: {
	children: React.ReactNode,
	props: {
		containerStyle?: OutletStyleType;
		footerShow?: boolean;
	};
}) {
	const session = await getSession();
	const hospitals = await hospitalsFetch();
	const footers = await footersFetch();
	const centerOfExcellence = await centerOfExcellenceFetch();
	const facilityServices = await facilityServicesFetch();
	let notificationResponseData: NotificationResponse = {
		notification: [],
		total_unread: 0
	};
	if (session?.token && session?.user?.email) {
		const notificationResponse = await getNotification({
			query: {
				medical_record: session?.user?.medical_record ?? '',
				email: session?.user?.email,
			},
		});
		notificationResponseData = notificationResponse?.data;
	}

	return (
		<>
			<Header
				session={ session }
				hospitalData={ hospitals.data }
				centerOfExcellenceData={ centerOfExcellence.data }
				facilityServicesData={ facilityServices.data }
				notificationResponseData={ notificationResponseData }
			/>
			{ children }
			{
				props?.footerShow !== false &&
				<Footer footerData={ footers.data } hospitalData={ hospitals.data } />
			}
			{
				props?.footerShow !== false &&
				<CallForAmbulance hospitalData={ hospitals.data } session={ session } />
			}
			{
				appStage !== 'prod' &&
				<DevTools />
			}
			<MedicalRecordReminder session={ session } />
			<ToastContainer />
		</>
	);
}
