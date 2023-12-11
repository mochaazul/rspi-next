import { getProfile } from '@/lib/api/profile';
import { getVisitHistory } from '@/lib/api/hospital';

import PortalContainer from './components/PortalContainer';

export default async function Page() {
	const profile = await getProfile();
	const visitHistoryResponse = await getVisitHistory();

	return (
		<PortalContainer patientProfile={ profile?.data } visitHistoryResponse={ visitHistoryResponse } />
	);
}