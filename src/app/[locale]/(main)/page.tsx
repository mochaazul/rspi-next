import LandingPageStyle from './style';
import CentreOfExcellence from '@/components/PageComponents/LandingPageSections/CenterOfExcelence';
import { getBanner, getCoe } from '@/lib/api';
import CustomCarousel from '@/components/ui/Carousel';
import { getCurrentLocale } from '@/locales/server';
import ServicesTabs from '@/components/PageComponents/LandingPageSections/Services';

export default async function Home() {
  const coeRes = await getCoe();
  const banner = await getBanner();
  const currentLang = getCurrentLocale();

  return (
    <LandingPageStyle>
      <CustomCarousel>
        { banner.data.map((image: any, index: any) => {
          return <a href={ currentLang === 'id' ? image.url_link_idn : image.url_link_en || '#' } key={ `banner-${ index }` }>
            <img className='h-[85vh] max-sm:h-[360px] object-cover max-sm:hidden' src={ image.image_url } alt='slider' />
            <img className='h-[85vh] max-sm:h-[360px] object-cover lg:hidden' src={ image.img_url_mobile } alt='slider' />
          </a>;
        }) }
      </CustomCarousel>
      <ServicesTabs />
      <CentreOfExcellence data={ coeRes.data } />
    </LandingPageStyle>
  );
}
