import { Metadata } from 'next';

import { getScopedI18n } from '@/locales/server';

import { PanelH1 } from '../../style';

import { getAllEvents, getPromoById } from '@/lib/api/events';
import PromoDetail from '@/components/ui/PageComponents/News/Promo/PromoDetail';
import { redirect } from 'next/navigation';
import LangWrapper from '@/components/ui/LangWrapper';

export async function generateMetadata({ params }: { params: { slug: string; }; }): Promise<Metadata> {
	const getArticle = await getPromoById({
		param: params?.slug,
	});
   
	const selectedEvent = Object.values(getArticle)[0];
	
	return {
	  title: selectedEvent?.title,
	  description: selectedEvent?.content.replace(/(<([^>]+)>)/ig, ''),
	  openGraph: {
			images: [selectedEvent?.img_url_detail],
		},
	};
}

const DetailEventClassesPromo = async({ params }: { params: { slug: string; }; }) => {
	
	const t = await getScopedI18n('page.promoPage');
	const newParam = decodeURIComponent(params?.slug);

	const selectedEvent = await getPromoById({
		param: `${ params?.slug }`,
	});

	if (Object.values(selectedEvent)[0].slug !== params?.slug) {
		redirect('/promo');
	};

	const eventsData = await getAllEvents();

	const eventsOther = eventsData?.data?.filter(ev => {
		return ev?.slug !== newParam;
	});
	
	const breadcrumbsPath = [{ name: t('heading'), url: '/promo' }, { url: '#', name: Object.values(selectedEvent)[0].title || '' }];

	return (
		<PanelH1 className='sm:mx-[165px] mx-0' >
			<PromoDetail
				selectedEvent = { selectedEvent?.data }
				breadcrumbsPath = { breadcrumbsPath }
				eventsOther = { eventsOther }
			/>
		</PanelH1>
	);
};

export default DetailEventClassesPromo;