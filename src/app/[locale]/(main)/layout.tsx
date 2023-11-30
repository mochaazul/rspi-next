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
	marAllReadNotif,
	notificationResponseFetch,
	footersFetch,
	hospitalsFetch
} from './helpers';
import getSession from '@/session/server';

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

	return (
		<>
			<Header
				session={ session }
				hospitalData={ hospitals.data }
				centerOfExcellenceData={ centerOfExcellence.data }
				facilityServicesData={ facilityServices.data }
				marAllReadNotifFunc={ marAllReadNotif }
				footersData={ footers.data }
			/>
			{ children }
			{
				props?.footerShow !== false &&
				<Footer footerData={ footers.data } hospitalData={ hospitals.data } />
			}
			{
				props?.footerShow !== false &&
				<CallForAmbulance hospitalData={ hospitals.data } />
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
