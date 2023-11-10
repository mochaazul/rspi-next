import moment from 'moment';
import { redirect } from 'next/navigation';

import { colors } from '@/constant';
import { FacilityServicesDetail, I_RelatedNews } from '@/interface';
import { MedicalSpecialities } from '@/interface/MedicalSpecialities';
import {
	getFacilityHospital,
	getFacilityRelatedNews,
	getFacilityServices,
	getMedicalSpecialities
} from '@/lib/api/facilities';
import MedicalSpecialitiesComponent from '@/components/PageComponents/FacilitiesServicesSections/MedicalSpecialities';
import FacilitiesMenuContent from '@/components/PageComponents/FacilitiesServicesSections/FacilitiesMenuContent';
import CardMenu from '@/components/PageComponents/FacilitiesServicesSections/CardMenu';
import Card, { CardContentWithInner, CardFooter } from '@/components/ui/Card';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { getScopedI18n } from '@/locales/server';

import { FacilitiesServiceStyle } from './style';

export default async function FacilitiesServicesPage({ params }: { params: { id: string; }; }) {
	const paramsId = +(params?.id ?? 0);

	const languages = await getScopedI18n('page.facilities');

	const facilitiyServicesRes = await getFacilityServices({ query: 'is_publish=true' });
	const facilityServices: FacilityServicesDetail[] = facilitiyServicesRes?.data;
	const facility = facilityServices.find(item => item.id === paramsId);

	if (!facility) {
		redirect(`/facilities-services/${ facilityServices[0].id ?? 0 }`);
	}

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
		unit: 'Patient Relations RS Pondok Indah - Bintaro Jaya'
	}];

	const relatedNewsRes = await getFacilityRelatedNews({
		id: paramsId,
		query: 'limit=9'
	});

	const hospitalRes = await getFacilityHospital({
		id: facilityServices.find(facility => facility.id === paramsId)?.id,
	});

	const hospital: FacilityServicesDetail[] = hospitalRes?.data;
	const relatedNews: I_RelatedNews[] = relatedNewsRes?.data;

	const getContent = () => {
		return facilitiesServiceData.find(item => item.id === paramsId);
	};

	let medicalSpecialities: MedicalSpecialities[] = [];
	if (!getContent()) {
		const medicalSpecialitiesRes = await getMedicalSpecialities({ query: 'footer_category=medical-specialities' });
		medicalSpecialities = medicalSpecialitiesRes?.data;
	}

	const breadcrumbsPath = [
		{ name: 'Facilities & Services', url: '/facilities' },
		{ url: '#', name: facilityServices?.find((facility: FacilityServicesDetail) => facility.id === paramsId)?.name ?? '' }
	];

	const renderContent = () => {
		if (!getContent()) {
			return (
				<MedicalSpecialitiesComponent
					activeMenuIndex={ paramsId }
					facilityData={ facilitiesServiceData }
					medicalSpecialities={ medicalSpecialities }
				/>
			);
		}

		return (
			<FacilitiesMenuContent
				facilitiesData={ facilitiesServiceData }
				paramsId={ paramsId }
				hospital={ hospital }
			/>
		);
	};

	return (
		<FacilitiesServiceStyle>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] md:pt-[60px] pb-[60px]'>
				<div>
					<Breadcrumbs datas={ breadcrumbsPath } />
					<div className='content-wrapper mt-[64px]'>
						<div className='leftSide hidden sm:block md:w-[349px]'>
							<CardMenu activeMenuIndex={ paramsId } data={ facilitiesServiceData } />
						</div>
						<div className='rightSide sm:ml-[32px]'>
							{ renderContent() }
						</div>
					</div>
					{
						relatedNews && relatedNews.length > 0 &&
						<div className='mt-[100px]'>
							<Text
								text={ languages('relatedNewsHeading') }
								className='related'
								fontWeight='700'
								fontSize='24px'
								lineHeight='29px'
							/>
							<div className='grid grid-cols-3 gap-3'>
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
														<Button theme='primary' label={ 'News' } className='btn-category' />
													</div>
													<div className='ml-[10px]'>
														<Text
															fontSize='14px'
															fontWeight='400'
															lineHeight='17px'
															color={ colors.grey.dark }
															text={ moment(data?.posted_date_news).format('dddd, DD MMM YYYY') }
														/>
													</div>
												</div>
											}
											content={ <CardContentWithInner title={ data.title_news } description={ data.short_description } author={ data.author } /> }
											footer={ <CardFooter content={ languages('readMoreLabel') } /> }
											className='mb-0'
											iconShare={ true }
											to={ `/news/${ data.news_id }` }
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