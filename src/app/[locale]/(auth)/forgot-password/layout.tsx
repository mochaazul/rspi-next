'use server';

import { PropsWithChildren } from 'react';

import Header from '@/components/Layout/Header/';

import {
	centerOfExcellenceFetch,
	facilityServicesFetch,
	hospitalsFetch,
} from '../../(main)/helpers';
import LangWrapper from '@/components/ui/LangWrapper';

export default async function AuthLayout({ children }: PropsWithChildren) {
	const hospitals = await hospitalsFetch();
	const centerOfExcellence = await centerOfExcellenceFetch();
	const facilityServices = await facilityServicesFetch();

	return (
		<>
			<Header
				hospitalData={ hospitals.data }
				centerOfExcellenceData={ centerOfExcellence.data }
				facilityServicesData={ facilityServices.data }
				className='md:hidden'
			/>
			<LangWrapper>
				{ children }

			</LangWrapper>
		</>
	);
}