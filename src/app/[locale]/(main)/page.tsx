import LandingPageStyle from './style';
import CentreOfExcellence from '@/components/PageComponents/LandingPageSections/CenterOfExcelence';
import { getBanner, getCoe } from '@/lib/api';
import CustomCarousel from '@/components/ui/Carousel';
import { getCurrentLocale } from '@/locales/server';
import ServicesTabs from '@/components/PageComponents/LandingPageSections/Services';
import LangWrapper from '@/components/ui/LangWrapper';
import { getHospital } from '@/lib/api/hospital';
import { getClinics, getFacilitiesAndServices } from '@/lib/api/clinics';
import FacilitiesServices from '@/components/PageComponents/LandingPageSections/FacilitiesServices';
import PromoPackages from '@/components/PageComponents/LandingPageSections/PromoPackages';
import { getEvents } from '@/lib/api/events';
import NewsHealthArticles from '@/components/PageComponents/LandingPageSections/NewsHealthArticles';
import { getNews } from '@/lib/api/news';
import CustomerReview from '@/components/PageComponents/LandingPageSections/CustomerReview';
import AccreditationAwards from '@/components/PageComponents/LandingPageSections/AccreditationsAwards';
import { getAwards } from '@/lib/api/awards';
import MobileAppBanner from '@/components/PageComponents/LandingPageSections/MobileAppBanner';

import { isMobile } from 'react-device-detect';

export default async function Home() {
	const coeRes = await getCoe();
	const banner = await getBanner({ is_publish: true });
	const hospitals = await getHospital();
	const clinics = await getClinics();
	const facilitiesServices = await getFacilitiesAndServices({ is_publish: true, is_home_page: true }, { page: 1, limit: 7 });
	const events = await getEvents({ is_publish: true });
	const articles = await getNews({ is_publish: true }, { page: 1 });
	const awards = await getAwards({ is_publish: true }, { page: 1, limit: 8 });

	const currentLang = getCurrentLocale();

	const arrayBanner = () => {
		if (currentLang === 'id') {
			if (isMobile) {
				return banner.data.filter(img => img.img_url_mobile_idn !== '').map((image: any, index: any) => {
					return <>
						<a href={ image.url_link_idn } >
							<img className='h-[85vh] max-sm:h-[360px] object-cover' key={ index } src={ image.img_url_mobile_idn } alt='slider' />
						</a>;
					</>;
				});
			} else {
				return banner.data.filter(img => img.img_url_idn !== '').map((image: any, index: any) => {
					return <>
						<a href={ image.url_link_idn } >
							<img className='h-[85vh] max-sm:h-[360px] object-cover' key={ index } src={ image.img_url_idn } alt='slider' />
						</a>;
					</>;
				});
			}
		} else {
			if (isMobile) {
				return banner.data.filter(img => img.img_url_mobile_en !== '').map((image: any, index: any) => {
					return <>
						<a href={ image.url_link_en } >
							<img className='h-[85vh] max-sm:h-[360px] object-cover' key={ index } src={ image.img_url_mobile_en } alt='slider' />
						</a>;
					</>;
				});
			} else {
				return banner.data.filter(img => img.img_url_en !== '').map((image: any, index: any) => {
					return <>
						<a href={ image.url_link_en } >
							<img className='h-[85vh] max-sm:h-[360px] object-cover' key={ index } src={ image.img_url_en } alt='slider' />
						</a>;
					</>;
				});
			}
		}
	};

	return (
		<LandingPageStyle>
			<CustomCarousel>
				{ arrayBanner() }
			</CustomCarousel>
			<LangWrapper>
				<ServicesTabs hospitals={ hospitals.data } clinics={ clinics.data } />
				<CentreOfExcellence data={ coeRes.data } />
				<FacilitiesServices facilityServices={ facilitiesServices.data } />
				<PromoPackages events={ events.data } />
				<NewsHealthArticles articles={ articles.data } />
				<CustomerReview />
				<AccreditationAwards datas={ awards.data } />
				<MobileAppBanner />
			</LangWrapper>
		</LandingPageStyle>
	);
}
