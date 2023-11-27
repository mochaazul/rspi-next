import { getHospital } from '@/lib/api/hospital';
import FindADoctorComponent from './FindAdoctor';
import { getClinics } from '@/lib/api/clinics';

export default async function Page() {
	const hospital = await getHospital();
	const clinics = await getClinics();

	return (
		<>
			<FindADoctorComponent hospital={ hospital.data } clinics={ clinics.data }/>
		</>
	);
};
