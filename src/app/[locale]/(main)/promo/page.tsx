
import { getHospitals, } from '@/lib/api';
import { getScopedI18n } from '@/locales/server';
import { getAllEvents } from '@/lib/api/events';
import EventClassesPromo from './Promo';
import LangWrapper from '@/components/ui/LangWrapper';

const Promo = async({ searchParams }: any) => {
	
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
		img_url_card: event?.img_url_card ?? '',
		title: event?.title ?? '',
		short_description: event?.short_description ?? '',
		slug: event?.slug ?? '',
		category: event?.category,
		hospitals: event?.hospitals,
		language: event?.language,
	}));

	const getHospital = await getHospitals();

	const hospitals = getHospital?.data?.map(hospital => ({
		id: hospital?.id,
		name: hospital?.name ?? '',
	}));

	const t = await getScopedI18n('page.promoPage');

	return (
		<LangWrapper>
			<EventClassesPromo
				hospitalSelector={ hospitals }
				breadcrumbsPath={ [{ name: t('heading'), url: '/promo' }] }
				events={ dataEvent }
				pagination={ getEvent?.pagination }
			/>
		</LangWrapper>
	);
};

export default Promo;
