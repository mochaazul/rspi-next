import { getDoctorDetail } from '@/lib/api/doctors';
import DoctorDetail from './DoctorDetail';
import { getHospital } from '@/lib/api/hospital';

export default async function Page({ params: { id } }: { params: { id: string; } }) {
	const doctor = await getDoctorDetail({ param: id });
	const hospital = await getHospital();

	return (
		<DoctorDetail params={ { id } } hospitals={ hospital.data } doctor={ doctor.data } doctorResponse={ doctor } />
	);
};
