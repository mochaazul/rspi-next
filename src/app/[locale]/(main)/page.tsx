'use server';

import Image from 'next/image';
import Link from 'next/link';

import { getNews } from '@/lib/api/news';
import { getEvents } from '@/lib/api/events';
import { getAwards } from '@/lib/api/awards';
import { getBanner, getCoe } from '@/lib/api';
import { getDoctors } from '@/lib/api/doctors';
import { getHospital } from '@/lib/api/hospital';
import { getCurrentLocale } from '@/locales/server';
import { getFacilitiesAndServices } from '@/lib/api/clinics';
import { getSpecialtyDropdown } from '@/lib/api/specialty';
import CustomCarousel from '@/components/ui/Carousel';
import LangWrapper from '@/components/ui/LangWrapper';
import CentreOfExcellence from '@/components/ui/PageComponents/LandingPageSections/CenterOfExcelence';
import ServicesTabs from '@/components/ui/PageComponents/LandingPageSections/Services';
import FacilitiesServices from '@/components/ui/PageComponents/LandingPageSections/FacilitiesServices';
import PromoPackages from '@/components/ui/PageComponents/LandingPageSections/PromoPackages';
import NewsHealthArticles from '@/components/ui/PageComponents/LandingPageSections/NewsHealthArticles';
import CustomerReview from '@/components/ui/PageComponents/LandingPageSections/CustomerReview';
import AccreditationAwards from '@/components/ui/PageComponents/LandingPageSections/AccreditationsAwards';
import MobileAppBanner from '@/components/ui/PageComponents/LandingPageSections/MobileAppBanner';

import LandingPageStyle from './style';

export default async function Page() {
	const coeRes = await getCoe();
	const banner = await getBanner({ is_publish: true });
	const hospitals = await getHospital();
	const specialtyDropdown = await getSpecialtyDropdown();
	const masterDoctor = await getDoctors();
	const facilitiesServices = await getFacilitiesAndServices({ is_home_page: true }, { page: 1, limit: 7 });
	const events = await getEvents();
	const articles = await getNews({}, { page: 1 });
	const awards = await getAwards({}, { page: 1, limit: 8 });
	const currentLang = getCurrentLocale();

	const arrayBanner = () => {
		if (currentLang === 'id') {
			return banner.data.map((image: any, index: any) => {
				return <div key={ `banner-${ index }` } style={ { width: '100%', height: 450 } }>
					<Link href={ image.url_link_idn ?? '#' }>
						<Image width={ 450 } height={ 450 } style={ { objectFit: "contain" } } className='md:hidden' src={ image.img_url_mobile_idn || image.img_url_mobile_en } alt='slider' />
						<Image width={ 1600 } height={ 450 } style={ { objectFit: "contain" } } className='max-sm:hidden' src={ image.img_url_idn || image.img_url_en } alt='slider' />
					</Link>
				</div>;
			});
		} else {
			return banner.data.map((image: any, index: any) => {
				return <div key={ `banner-${ index }` } style={ { width: '100%', height: 450 } }>
					<Link href={ image.url_link_en ?? '#' }>
						<Image width={ 450 } height={ 450 } style={ { objectFit: "contain" } } className='md:hidden' src={ image.img_url_mobile_en || image.img_url_mobile_idn } alt='slider' />
						<Image width={ 1600 } height={ 450 } style={ { objectFit: "contain" } } className='max-sm:hidden' src={ image.img_url_en || image.img_url_idn } alt='slider' />
					</Link>
				</div>;
			});
		}
	};

	return (
		<LandingPageStyle>
			<CustomCarousel>
				{ arrayBanner() }
			</CustomCarousel>
			<LangWrapper>
				<ServicesTabs
					hospitals={ hospitals.data }
					specialtys={ specialtyDropdown.data }
					doctors={ masterDoctor.data }
				/>
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
