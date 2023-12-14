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
	const footerData = footers.data?.map(footer => ({
		title: footer.title,
		slug: footer.slug,
		footer_category: footer.footer_category
	}));
	const hospitalData = hospitals.data?.map(hospital => ({
		slug: hospital.slug,
		img_url: hospital.img_url,
		name: hospital.name,
		address: hospital.address,
		phone: hospital.phone,
		id: hospital.id,
		hospital_code: hospital.hospital_code
	}));
	const centerOfExcellenceData = centerOfExcellence?.data?.map(coe => ({
		img_url: coe.img_url,
		slug: coe.slug,
		title: coe.title
	}));
	const facilityServicesData = facilityServices?.data?.map(facility => ({
		slug: facility.slug,
		image_url: facility.image_url,
		name: facility.name
	}));

	return (
		<>
			<Header
				session={ session }
				hospitalData={ hospitalData }
				centerOfExcellenceData={ centerOfExcellenceData }
				facilityServicesData={ facilityServicesData }
				marAllReadNotifFunc={ marAllReadNotif }
			/>
			{ children }
			{
				props?.footerShow !== false &&
				<Footer
					footerData={ footerData }
					hospitalData={ hospitalData }
				/>
			}
			{
				props?.footerShow !== false &&
				<CallForAmbulance hospitalData={ hospitalData } session={ session } />
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
