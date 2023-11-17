
import { getHospitals, postContactUs, } from '@/lib/api';
import EventClassesPromo from './Promo';
import { fetchEvents } from './helpers';

const Promo = async() => {
	const dataEvent = await fetchEvents({
		page: 1,
		limit: 10,
		is_publish: true,
		category: '',
		hospital_id: ''
	});
	
	const hospitals = await getHospitals();

	return (
		<EventClassesPromo
			hospitalSelector = { hospitals?.data }
			breadcrumbsPath={ [{ name: 'Promo & Packages', url: '/promo' }] }
			events={ dataEvent?.data }
			pagination={ dataEvent?.pagination }
		/>
	);
};

export default Promo;
