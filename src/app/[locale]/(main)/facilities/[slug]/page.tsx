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
import Card, { CardFooter } from '@/components/ui/Card';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Text from '@/components/ui/Text';
import TextHtml from '@/components/ui/TextHtml';
import { getScopedI18n } from '@/locales/server';

export default async function FacilitiesServicesPage({ params }: { params: { slug: string; }; }) {
	const paramsSlug = decodeURIComponent(params?.slug ?? '');

	const facilitiyServicesRes = await getFacilityServices();
	const facilityServices: FacilityServicesDetail[] = facilitiyServicesRes?.data;
	const facility = facilityServices.find(item => item.slug === paramsSlug);

	if (!facility && paramsSlug !== 'medical-specialties') {
		redirect(`/facilities-service/${ facilityServices?.[0]?.slug ?? '' }`);
	}

	let medicalSpecialities: MedicalSpecialities[] = [];
	let relatedNews: I_RelatedNews[] = [];

	if (paramsSlug === 'medical-specialties') {
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
		name: 'Medical Specialties',
		operational_hour: [],
		order_id: 2,
		short_description: 'Lorem ipsum',
		unit: 'Patient Relations RS Pondok Indah - Bintaro Jaya',
		slug: 'medical-specialties'
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
		if (paramsSlug === 'medical-specialties') {
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
		<div className='w-full lg:max-w-[1110px] mx-auto max-xl:px-4 pb-8 sm:pb-[60px]'>
			<div>
				<Breadcrumbs datas={ breadcrumbsPath } />
				<div className='mt-[25px] md:mt-16 flex md:gap-5 lg:gap-8'>
					<div className='hidden md:block'>
						<CardMenu paramsSlug={ paramsSlug } data={ facilitiesMenu } />
					</div>
					<div className='w-full'>
						{ renderContent() }
					</div>
				</div>
				{
					relatedNews && relatedNews.length > 0 &&
					<div className='mt-8 sm:mt-20'>
						<Text
							text={ t('relatedNewsHeading') }
							className='border-b-2 md:border-b-4 border-[#358888] w-fit pb-1'
							fontWeight='700'
							fontSize='24px'
							lineHeight='29px'
							subClassName='max-sm:!text-base'
						/>
						<div className='flex max-md:flex-no-wrap max-md:overflow-x-auto scrolling-touch scroll-smooth md:grid md:grid-cols-3 gap-4 xl2:gap-[30px]'>
							{
								relatedNews.map((data, index) => (
									<Card
										key={ index }
										id={ data?.id }
										image={ data.image_url }
										imageHeight='200px'
										header={
											<div className='flex items-center gap-2 sm:gap-2.5'>
												<div>
													<span className='rounded-[5px] px-2 sm:px-2.5 py-1 sm:py-[5px] cursor-default font-normal text-xs sm:text-sm bg-[#358888] text-white flex items-center justify-center'>News</span>
												</div>
												<Text
													fontSize='14px'
													fontWeight='400'
													lineHeight='17px'
													color={ colors.grey.dark }
													subClassName='max-sm:text-xs'
													text={ moment(data?.posted_date_news).format('dddd, DD MMM YYYY') }
												/>
											</div>
										}
										content={
											<div className='mt-1 sm:mt-[5px]'>
												<Text
													fontSize='20px'
													fontType='h3'
													fontWeight='900'
													color={ colors.grey.darker }
													text={ data?.title_news }
													lineHeight='28px'
													subClassName='max-sm:text-base' />

												<Text
													fontSize='14px'
													fontWeight='400'
													color={ colors.grey.dark }
													text={ data?.author_name }
													className='mt-1 sm:mt-[5px]'
													subClassName='max-sm:!text-xs'
													lineHeight='24px'
												/>

												<TextHtml
													className='innerHTML text-xs max-sm:leading-[18px] sm:text-sm md:text-base md:leading-[23px] mt-2 sm:mt-3 line-clamp-3'
													style={ { color: colors.grey.dark } }
													htmlStr={ data?.short_description ?? '' } />
											</div>
										}
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
	);
}