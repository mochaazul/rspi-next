
import { getDoctorDetail } from '@/lib/api/doctors';
import { ReactElement, ReactNode } from 'react';
import Page from './page';
import { getHospital } from '@/lib/api/hospital';

export default async function SubLayout({ params: { id } }: { params: { id: string; } }) {
	const doctor = await getDoctorDetail({ param: id });
	const hospital = await getHospital();

	return (
		<Page params={ { id } } hospitals={ hospital.data } doctor={ doctor.data } doctorResponse={ doctor } />
	);
}