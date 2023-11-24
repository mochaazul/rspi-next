
import { getHospitals, } from '@/lib/api';
import { getScopedI18n } from '@/locales/server';

import EventClassesPromo from './Promo';
import { fetchEvents } from './helpers';

const Promo = async () => {
	const dataEvent = await fetchEvents({
		page: 1,
		limit: 10,
		is_publish: true,
		category: '',
		hospital_id: ''
	});

	const hospitals = await getHospitals();
	const t = await getScopedI18n('page.promoPage');

	return (
		<EventClassesPromo
			hospitalSelector={ hospitals?.data }
			breadcrumbsPath={ [{ name: t('heading'), url: '/promo' }] }
			events={ dataEvent?.data }
			pagination={ dataEvent?.pagination }
		/>
	);
};

export default Promo;
