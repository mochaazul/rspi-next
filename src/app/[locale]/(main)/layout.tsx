'use server';
import { headers } from 'next/headers';

import { appStage } from '@/config';

import { Footer, Header } from '@/components';

import MedicalRecordReminder from '@/components/ui/MedicalRecordReminder';
import CallForAmbulance from '@/components/ui/CallForAmbulance';
import DevTools from '@/components/ui/DevTools';

import '@/styles/globals.css';
import { OutletStyleType, } from './style';

import {
	centerOfExcellenceFetch,
	facilityServicesFetch,
	marAllReadNotif,
	notificationResponseFetch,
	footersFetch,
	hospitalsFetch
} from './helpers';

const blacklistedRoute = [
	'/patient-portal',
	'/doctor-detail',
	'/book-appointment'
];

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

	const headersList = headers();

	const pathname = headersList.get('x-invoke-path') || '';

	const shouldRenderReminder = !blacklistedRoute.some(route => pathname.includes(route));

	const hospitals = await hospitalsFetch();
	const footers = await footersFetch();
	const centerOfExcellence = await centerOfExcellenceFetch();
	const facilityServices = await facilityServicesFetch();
	const notificationResponse = await notificationResponseFetch();

	return (
		<>
			<Header
				hospitalData={ hospitals.data }
				centerOfExcellenceData={ centerOfExcellence.data }
				facilityServicesData={ facilityServices.data }
				notificationResponseData={ notificationResponse?.data }
				marAllReadNotifFunc={ marAllReadNotif }
				footersData={ footers.data }
			/>
			{ children }

			{ props?.footerShow !== false &&
				<Footer footerData={ footers.data } />
			}
			{ props?.footerShow !== false &&
				<CallForAmbulance hospitalData={ hospitals.data } />
			}
			{ appStage !== 'prod' &&
				<DevTools />
			}
			{ shouldRenderReminder &&
				<MedicalRecordReminder />
			}
		</>
	);
}
