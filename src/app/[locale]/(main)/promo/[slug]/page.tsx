
import { getScopedI18n } from '@/locales/server';

import { PanelH1, PanelV1 } from '../../style';

import { getAllEvents, getPromoById } from '@/lib/api/events';
import PromoDetail from '@/components/ui/PageComponents/News/Promo/PromoDetail';


const DetailEventClassesPromo = async ({ params }: { params: { slug: string; }; }) => {
	
	const t = await getScopedI18n('page.promoPage');
	const newParam = decodeURIComponent(params?.slug);

	const selectedEvent = await getPromoById({
		param: `${ params?.slug }`,
	});

	const eventsData = await getAllEvents();

	const eventsOther = eventsData?.data?.filter(ev => {
		return ev?.slug !== newParam;
	});

	const breadcrumbsPath = [{ name: t('heading'), url: '/promo' }, { url: '#', name: selectedEvent?.data[0]?.title || '' }];

	return (
		<PanelV1>
			<PanelH1>
				<PromoDetail
					selectedEvent = { selectedEvent?.data }
					breadcrumbsPath = { breadcrumbsPath }
					eventsOther = { eventsOther }
				/>
			</PanelH1>
		</PanelV1>
	);
};

export default DetailEventClassesPromo;