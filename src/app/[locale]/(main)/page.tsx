import LandingPageStyle from './style';
import CentreOfExcellence from '@/components/PageComponents/LandingPageSections/CenterOfExcelence';
import { getBanner, getCoe } from '@/lib/api';
import CustomCarousel from '@/components/ui/Carousel';
import { getCurrentLocale } from '@/locales/server';
import ServicesTabs from '@/components/PageComponents/LandingPageSections/Services';
import { isMobile } from 'react-device-detect';

export default async function Home() {

	const coeRes = await getCoe();
	const banner = await getBanner();
	const currentLang = getCurrentLocale();

	const arrayBanner = () => {
		const langSuffix = currentLang === 'id' ? '_idn' : '_en';
		const urlPrefix = isMobile ? 'img_url_mobile' : 'img_url';

		return banner?.data
			?.filter((img) => img[`${ urlPrefix }${ langSuffix }`] !== '')
			.map((image: any, index: any) => (
				<a href={ image[`url_link${ langSuffix }`] } key={ index }>
					<img
						className='h-[85vh] max-sm:h-[360px] object-cover'
						src={ image[`${ urlPrefix }${ langSuffix }`] }
						alt='slider'
					/>
				</a>
			));
	};


	return (
		<LandingPageStyle>
			<CustomCarousel>
				{ arrayBanner() }
			</CustomCarousel>
			<ServicesTabs />
			<CentreOfExcellence data={ coeRes.data } />
		</LandingPageStyle>
	);
}
