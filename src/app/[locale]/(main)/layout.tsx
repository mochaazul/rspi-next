import { headers } from 'next/headers';

import { appStage } from '@/config';

import {
	getHospitals,
	getCenterOfExcellence
} from '@/lib/api';

import { getFacilitiesAndServices } from '@/lib/api/clinics';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

import MedicalRecordReminder from '@/components/MedicalRecordReminder';
import CallForAmbulance from '@/components/CallForAmbulance';
import DevTools from '@/components/DevTools';

import { OutletStyleType, } from './style';

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

	const hospitals = await getHospitals();
	const centerOfExcellence = await getCenterOfExcellence();
	const facilityServices = await getFacilitiesAndServices();

	return (
		<>
			<Header
				hospitalData={ hospitals.data }
				centerOfExcellenceData={ centerOfExcellence.data }
				facilityServicesData={ facilityServices.data }
			/>
			{ children }

			{ props?.footerShow !== false &&
				<Footer />
			}
			{ props?.footerShow !== false &&
				<CallForAmbulance />
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
