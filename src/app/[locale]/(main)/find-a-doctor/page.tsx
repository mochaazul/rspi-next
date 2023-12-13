import { getHospital } from '@/lib/api/hospital';
import FindADoctorComponent from './FindAdoctor';
import { getSpecialtyDropdown } from '@/lib/api/specialty';

export default async function Page() {
	const hospital = await getHospital();
	const specialtyDropdown = await getSpecialtyDropdown();

	return (
		<>
			<FindADoctorComponent
				hospital={ hospital.data }
				clinics={ specialtyDropdown.data }
			/>
		</>
	);
};
