import { getProfile } from '@/lib/api/profile';
import { getVisitHistory } from '@/lib/api/hospital';
import { I_VisitHistory } from '@/interface';

import PortalContainer from './components/PortalContainer';

export default async function Page() {
	const profile = await getProfile();
	let visitHistory: I_VisitHistory[] = [];

	if (profile && profile?.data?.no_mr) {
		const visitHistoryResponse = await getVisitHistory();
		visitHistory = visitHistoryResponse?.data;
	}

	return (
		<PortalContainer patientProfile={ profile?.data } visitHospitalHistory={ visitHistory } />
	);
}