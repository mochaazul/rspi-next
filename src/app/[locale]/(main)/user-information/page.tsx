import { getProfile } from '@/lib/api/profile';
import { getVisitHistory } from '@/lib/api/hospital';
import { I_VisitHistory } from '@/interface';

import PatientProfile from './PatientProfile';
import AuthError from '@/components/Layout/AuthError';

export default async function Page() {
	const profile = await getProfile();
	let visitHistory: I_VisitHistory[] = [];

	if (profile?.stat_code !== 'APP:SUCCESS') {
		return (
			<AuthError errorMessage={ profile?.stat_msg }>
				<PatientProfile patientProfile={ null } visitHospitalHistory={ [] } />
			</AuthError>
		);
	}

	if (profile?.data?.no_mr && profile?.data?.mr_active) {
		const visitHistoryResponse = await getVisitHistory();
		visitHistory = visitHistoryResponse?.data;
	}

	return (
		<PatientProfile patientProfile={ profile?.data } visitHospitalHistory={ visitHistory } />
	);
}