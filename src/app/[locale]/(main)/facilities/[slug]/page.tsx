import { redirect } from 'next/navigation';
import moment from 'moment';

import { colors } from '@/constant';
import { FacilityServicesDetail, I_RelatedNews } from '@/interface';
import { MedicalSpecialities } from '@/interface/MedicalSpecialities';
import {
	getFacilityRelatedNews,
	getFacilityServices,
	getMedicalSpecialities
} from '@/lib/api/facilities';
import MedicalSpecialitiesComponent from '@/components/ui/PageComponents/FacilitiesServicesSections/MedicalSpecialities';
import FacilitiesMenuContent from '@/components/ui/PageComponents/FacilitiesServicesSections/FacilitiesMenuContent';
import CardMenu from '@/components/ui/PageComponents/FacilitiesServicesSections/CardMenu';
import Card, { CardContentWithInner, CardFooter } from '@/components/ui/Card';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { getScopedI18n } from '@/locales/server';

import { FacilitiesServiceStyle } from './style';

export default async function FacilitiesServicesPage({ params }: { params: { slug: string; }; }) {
	const paramsSlug = decodeURIComponent(params?.slug ?? '');

	const facilitiyServicesRes = await getFacilityServices();
	const facilityServices: FacilityServicesDetail[] = facilitiyServicesRes?.data;
	const facility = facilityServices.find(item => item.slug === paramsSlug);

	if (!facility && paramsSlug !== 'medical-specialities') {
		redirect(`/facilities/${ facilityServices?.[0]?.slug ?? '' }`);
	}

	let medicalSpecialities: MedicalSpecialities[] = [];
	let relatedNews: I_RelatedNews[] = [];

	if (paramsSlug === 'medical-specialities') {
		const medicalSpecialitiesRes = await getMedicalSpecialities({ query: { footer_category: 'medical-specialities', is_publish: true } });
		medicalSpecialities = medicalSpecialitiesRes?.data;
	} else {
		const relatedNewsRes = await getFacilityRelatedNews({
			param: `${ facility?.id ?? '' }`,
			pagination: { limit: 9 }
		});
		relatedNews = relatedNewsRes?.data;
	}

	const t = await getScopedI18n('page.facilities');

	const facilitiesServiceData: FacilityServicesDetail[] = [...facilityServices, {
		id: 1234567890,
		floor: '35',
		hospital_code: 'H1',
		hospital_email: 'cr.pondokindah@rspondokindah.co.id',
		hospital_name: 'RS Pondok Indah - Puri Indah',
		hospital_phone: '+62212569 5200',
		image_url: [''],
		information: 'Patient Relations at RS Pondok Indah - Puri Indah',
		is_home_page: false,
		is_publish: true,
		name: 'Medical Specialities',
		operational_hour: [],
		order_id: 2,
		short_description: 'Lorem ipsum',
		unit: 'Patient Relations RS Pondok Indah - Bintaro Jaya',
		slug: 'medical-specialities'
	}];
	const breadcrumbsPath = [
		{ name: t('heading'), url: '#' },
		{ url: '#', name: facilitiesServiceData?.find((facility: FacilityServicesDetail) => facility.slug === paramsSlug)?.name ?? '' }
	];

	const facilitiesMenu = facilitiesServiceData?.map(facility => ({
		name: facility?.name ?? '',
		slug: facility?.slug ?? ''
	}));

	const renderContent = () => {
		if (paramsSlug === 'medical-specialities') {
			return (
				<MedicalSpecialitiesComponent
					paramsSlug={ paramsSlug }
					facilityData={ facilitiesMenu }
					medicalSpecialities={ medicalSpecialities?.map(medspec => ({
						id: medspec.id,
						title: medspec.title,
						slug: medspec.slug
					})) }
				/>
			);
		}

		return (
			<FacilitiesMenuContent facilitiesData={ facilitiesServiceData } paramsSlug={ paramsSlug } />
		);
	};

	return (
		<FacilitiesServiceStyle>
			<div className='lg:w-[1110px] mx-auto max-lg:mx-4 pb-[60px]'>
				<div>
					<Breadcrumbs datas={ breadcrumbsPath } />
					<div className='content-wrapper mt-[25px] md:mt-16 flex md:gap-5 lg:gap-8'>
						<div className='leftSide hidden md:block lg:w-[349px]'>
							<CardMenu paramsSlug={ paramsSlug } data={ facilitiesMenu } />
						</div>
						<div className='rightSide w-full'>
							{ renderContent() }
						</div>
					</div>
					{
						relatedNews && relatedNews.length > 0 &&
						<div className='mt-8'>
							<Text
								text={ t('relatedNewsHeading') }
								className='related'
								fontWeight='700'
								fontSize='24px'
								lineHeight='29px'
							/>
							<div className='flex max-md:flex-no-wrap max-md:overflow-x-auto scrolling-touch scroll-smooth md:grid md:grid-cols-3 gap-4 md:gap-3'>
								{
									relatedNews.map((data, index) => (
										<Card
											key={ index }
											id={ data?.id }
											image={ data.image_url }
											imageHeight='200px'
											header={
												<div className='flex items-center'>
													<div>
														<Button theme='primary' label={ 'News' } className='btn-category !px-2 sm:px-2.5 !py-1 sm:py-[5px] !cursor-default !font-normal text-xs sm:text-sm' />
													</div>
													<div className='ml-[10px]'>
														<Text
															fontSize='14px'
															fontWeight='400'
															lineHeight='17px'
															color={ colors.grey.dark }
															subClassName='max-sm:text-xs'
															text={ moment(data?.posted_date_news).format('dddd, DD MMM YYYY') }
														/>
													</div>
												</div>
											}
											content={ <CardContentWithInner title={ data.title_news } description={ data.short_description } author={ data.author_name } /> }
											footer={ <CardFooter content={ t('readMoreLabel') } /> }
											className='mb-0 w-[304px] md:w-full'
											iconShare={ true }
											to={ `/news/${ data?.slug }` }
										/>
									))
								}
							</div>
						</div>
					}
				</div>
			</div>
		</FacilitiesServiceStyle>
	);
}