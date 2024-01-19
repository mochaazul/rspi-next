import { Metadata } from 'next';

import { getDoctorDetail } from '@/lib/api/doctors';
import { getHospital } from '@/lib/api/hospital';
import { getScopedI18n } from '@/locales/server';

import DoctorDetail from './DoctorDetail';

export async function generateMetadata({ params }: { params: { id: string; }; }): Promise<Metadata> {
	const doctorResponse = await getDoctorDetail({ param: params?.id });
	const doctorData = doctorResponse?.data;
	const t = await getScopedI18n('page.doctorProfile.shareDoctor');

	const desc = t('metaDesc', { speciality: doctorData?.specialty?.[0] ?? '' });

	return {
		openGraph: {
			title: doctorData?.name,
			description: desc,
			images: [doctorData?.img_url],
		},
		twitter: {
			card: 'summary_large_image',
			title: doctorData?.name,
			description: desc,
			images: [doctorData?.img_url]
		},
	};
}

export default async function Page({ params: { id } }: { params: { id: string; }; }) {
	const doctor = await getDoctorDetail({ param: id });
	const hospital = await getHospital();

	return (
		<DoctorDetail params={ { id } } hospitals={ hospital.data } doctor={ doctor.data } doctorResponse={ doctor } />
	);
};
