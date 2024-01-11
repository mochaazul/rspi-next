'use server';

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
import LangWrapper from '@/components/ui/LangWrapper';

export default async function PageWrapper({
	children,
}: {
	children: React.ReactNode,
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
		img_url: coe.img_url ?? '',
		slug: coe.slug,
		title: coe.title ?? ''
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
				centerOfExcellenceData={ centerOfExcellenceData as any }
				facilityServicesData={ facilityServicesData as any }
				marAllReadNotifFunc={ marAllReadNotif }
			/>
			{ children }
			<LangWrapper>
				<Footer
					footerData={ footerData }
					hospitalData={ hospitalData }
				/>
				<CallForAmbulance hospitalData={ hospitalData } session={ session } />
				<MedicalRecordReminder session={ session } />

			</LangWrapper>
			{
				appStage !== 'prod' &&
				<DevTools />
			}
		</>
	);
}
