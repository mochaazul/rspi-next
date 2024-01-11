import { getHospital } from '@/lib/api/hospital';
import FindADoctorComponent from './FindAdoctor';
import { getSpecialtyDropdown } from '@/lib/api/specialty';
import { getDoctors } from '@/lib/api/doctors';

export default async function Page() {
	const hospital = await getHospital();
	const specialtyDropdown = await getSpecialtyDropdown();
	const doctorFallbackData = await getDoctors({ pagination: { limit: 10 } });
	return (
		<>
			<FindADoctorComponent
				hospital={ hospital.data }
				clinics={ specialtyDropdown.data }
				doctorFallback={ doctorFallbackData }
			/>
		</>
	);
};
