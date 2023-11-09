import { useState, useEffect } from 'react';
import moment from 'moment';
import { useRouter } from 'next/navigation';

import { Breadcrumbs, Text, Button } from '@/components';
import Card, { CardContentWithInner, CardFooter } from '@/components/Card';
import { Languages, colors } from '@/constant';
import { FacilityServicesDetail, FacilityServicesState } from '@/interface';
import {
	getFacilityServices,
	getFacilityHospital,
	getFacilityRelatedNews,
} from '@/stores/FacilityServices';
import { useAppDispatch, useTypedSelector } from '@/hooks';
import { navigation } from '@/helpers';

import FacilitiesMenuContent from './FacilitiesMenuContent';
import { FacilitiesServiceStyle } from './style';
import { facilitiesPageEvent } from '@/utils/metaPixelTrack';
import CardMenu from './CardMenu';

const { relatedNewsHeading, readMoreLabel } = Languages.page.facilities;

const FacilitiesServicesPage = () => {
	const [activeMenuIndex, setActiveMenuIndex] = useState(0);

	const navigate = useRouter();
	const { params } = navigation();
	const { facilityServices, relatedNews, hospital, error } = useTypedSelector<FacilityServicesState>('facilityServices');
	const facilityServicesDispatch = useAppDispatch(getFacilityServices);
	const facilityHospitalDispatch = useAppDispatch(getFacilityHospital);
	const facilityServicesNewsDispatch = useAppDispatch(getFacilityRelatedNews);

	const breadcrumbsPath = [
		{ name: 'Facilities & Services', url: '/facilities' },
		{ url: '#', name: facilityServices?.find(facility => facility.id === activeMenuIndex)?.name ?? '' }
	];

	useEffect(() => {
		facilitiesPageEvent();
		facilityServicesDispatch({
			queryParam: {
				is_publish: true,
			}
		});
	}, []);

	const redirectIfNoFacilities = () => {
		const facility = facilityServices.find(item => item.id == params.id);
		if (!facility) {
			navigate.push(`/facilities/${ facilityServices[0].id ?? 0 }`);
		}
	};

	useEffect(() => {
		if (params && params.id) {
			facilityServicesNewsDispatch({
				id: params?.id,
				queryParam: {
					limit: 9,
				}
			});
		} else {
			navigate.push(`/facilities/${ facilityServices[0].id ?? 0 }`);
		}
	}, [params?.id]);

	useEffect(() => {
		redirectIfNoFacilities();
		if (activeMenuIndex === 0) {
			setActiveMenuIndex(facilityServices[0]?.id ?? 0);
		}
	}, [facilityServices]);

	useEffect(() => {
		if (+ (params?.id ?? 0) !== activeMenuIndex) {
			setActiveMenuIndex(+ (params?.id ?? 0));
			facilityHospitalDispatch({
				id: facilityServices.find(facility => facility.id === + (params?.id ?? 0))?.id,
			});
		}
	}, [params]);

	const facilitiesServiceData = (): FacilityServicesDetail[] => [...facilityServices, {
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

	return (
		<FacilitiesServiceStyle>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] md:pt-[60px] pb-[60px]'>
				<div>
					<Breadcrumbs datas={ breadcrumbsPath } />
					<div className='content-wrapper mt-[64px]'>
						<div className='leftSide hidden sm:block md:w-[349px]'>
							<CardMenu activeMenuIndex={ activeMenuIndex } data={ facilitiesServiceData() } />
						</div>
						<div className='rightSide sm:ml-[32px]'>
							<FacilitiesMenuContent facilitiesData={ facilitiesServiceData() } activeMenuIndex={ activeMenuIndex } />
						</div>
					</div>
					{
						relatedNews && relatedNews.length > 0 &&
						<div className='mt-[100px]'>
							<Text
								text={ relatedNewsHeading }
								className='related'
								fontWeight='700'
								fontSize='24px'
								lineheight='29px'
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
															lineheight='17px'
															color={ colors.grey.dark }
															text={ moment(data?.posted_date_news).format('dddd, DD MMM YYYY') }
														/>
													</div>
												</div>
											}
											content={ <CardContentWithInner title={ data.title_news } description={ data.short_description } author={ data.author } /> }
											footer={ <CardFooter content={ readMoreLabel } /> }
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
};

export default FacilitiesServicesPage;