
import { getHospitals, } from '@/lib/api';
import { getScopedI18n } from '@/locales/server';
import { getAllEvents } from '@/lib/api/events';
import EventClassesPromo from './Promo';

const Promo = async ({ searchParams }: any) => {
	
	const getEvent = await getAllEvents({
		query: {
			limit: 10,
			page: searchParams?.page ?? 1,
			category: searchParams?.category ?? '',
			hospital_id: searchParams?.hospital_id ?? '',
		}
	});

	const dataEvent = getEvent?.data?.map(event => ({
		id: event?.id,
		img_url_card: event?.img_url_card,
		title: event?.title,
		short_description: event?.short_description,
		slug: event?.slug,
	}));

	const getHospital = await getHospitals();

	const hospitals = getHospital?.data?.map(hospital => ({
		id: hospital?.id,
		name: hospital?.name,
	}));

	const t = await getScopedI18n('page.promoPage');

	return (
		<EventClassesPromo
			hospitalSelector={ hospitals }
			breadcrumbsPath={ [{ name: t('heading'), url: '/promo' }] }
			events={ dataEvent }
			pagination={ getEvent?.pagination }
		/>
	);
};

export default Promo;
