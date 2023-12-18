
import { getHospitals, } from '@/lib/api';
import { getScopedI18n } from '@/locales/server';
import { getAllEvents } from '@/lib/api/events';
import EventClassesPromo from './Promo';

const Promo = async ({ searchParams }: any) => {
	
	const dataEvent = await getAllEvents({
		query: {
			limit: 10,
			page: searchParams?.page ?? 1,
			category: searchParams?.category ?? '',
			hospital_id: searchParams?.hospital_id ?? '',
		}
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
