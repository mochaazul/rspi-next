import { getProfile } from '@/lib/api/profile';
import { getVisitHistory } from '@/lib/api/hospital';
import { I_VisitHistory } from '@/interface';

import PatientProfile from './PatientProfile';

export default async function Page() {
	const profile = await getProfile();
	let visitHistory: I_VisitHistory[] = [];

	if (profile?.data?.no_mr && profile?.data?.mr_active) {
		const visitHistoryResponse = await getVisitHistory();
		visitHistory = visitHistoryResponse?.data;
	}

	return (
		<PatientProfile patientProfile={ profile?.data } visitHospitalHistory={ visitHistory } />
	);
}