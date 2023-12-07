import { getProfile } from '@/lib/api/profile';
import { getVisitHistory } from '@/lib/api/hospital';
import { I_VisitHistory, ResponseType } from '@/interface';

import PortalContainer from './components/PortalContainer';

export default async function Page() {
	const profile = await getProfile();
	let visitHistoryResponse: ResponseType<I_VisitHistory[]> = {
		data: [],
		pagination: {}
	};
	// TODO: ada issue di trackare jika tidak ada no_mr menampilkan semua data. akan jadi sangat berat.
	// jika sudah fix, bisa diadjust lagi
	if (profile && profile?.data?.no_mr) {
		visitHistoryResponse = await getVisitHistory();
	}
	return (
		<PortalContainer patientProfile={ profile?.data } visitHistoryResponse={ visitHistoryResponse } />
	);
}