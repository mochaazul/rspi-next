'use server';

import { PropsWithChildren } from 'react';

import Header from '@/components/Layout/Header/index_old';
import getSession from '@/session/server';

import {
	centerOfExcellenceFetch,
	facilityServicesFetch,
	hospitalsFetch,
	marAllReadNotif,
} from '../../(main)/helpers';

export default async function AuthLayout({ children }: PropsWithChildren) {
	const session = await getSession();
	const hospitals = await hospitalsFetch();
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
				className='md:hidden'
			/>

			{ children }
		</>
	);
}