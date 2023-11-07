import { useEffect } from 'react';

import { useAppDispatch } from '@/hooks';
import { getHospitals } from '@/stores/actions';
import { initDev, initStage } from '@/utils/metaPixelTrack';

const payload = {
	page: 1,
	limit: 10,
	is_active: true
};

/**
 * @description Pengambilan data hospital saat sesudah page load
 * @description Contoh implementasi cuku panggil selector seperti dibawah
 * @description const hospitalSelector = useTypedSelector<HospitalState>('hospital');
 * @returns null
 */
const HospitalMenu = () => {
	const hospitalDispatch = useAppDispatch(getHospitals);

	useEffect(() => {
		if (process.env.REACT_APP_STAGE === 'dev') {
			initDev();
		} else if (process.env.REACT_APP_STAGE === 'stage') {
			initStage();
		}
		hospitalDispatch({ queryParam: payload });
	}, []);

	return null;
};

export default HospitalMenu;
