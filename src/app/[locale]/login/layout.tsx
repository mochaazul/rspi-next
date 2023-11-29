'use server';

import { PropsWithChildren } from "react";
import RootLayout from "../(main)/layout";
import { Header } from "@/components/Layout/Header";
import { centerOfExcellenceFetch, facilityServicesFetch, footersFetch, hospitalsFetch } from "../(main)/helpers";

export default async function AuthLayout({
	children
}: PropsWithChildren) {
	const hospitals = await hospitalsFetch();
	const footers = await footersFetch();
	const centerOfExcellence = await centerOfExcellenceFetch();
	const facilityServices = await facilityServicesFetch();

	return (
		<>
			<div className="sm:hidden">
				{/* <Header
				hospitalData={ hospitals.data }
				centerOfExcellenceData={ centerOfExcellence.data }
				facilityServicesData={ facilityServices.data }
				footersData={ footers.data }
			/> */}
			</div>
			{ children }
		</>
	);
}