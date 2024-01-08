import Image from 'next/image';

import { colors } from '@/constant';
import { FacilityServicesDetail } from '@/interface';

import AvailableAt from '../AvailableAt';
import CardMenu from '../CardMenu';

import Text from '../../../Text';
import CustomCarousel from '../../../Carousel';
import TextHtml from '../../../TextHtml';

type Props = {
	facilitiesData: FacilityServicesDetail[];
	paramsSlug: string;
};

const FacilitiesMenuContent: React.FC<Props> = ({
	facilitiesData,
	paramsSlug
}) => {
	const facilityDetail = facilitiesData.find(item => item.slug === paramsSlug);

	return (
		<div className='flex flex-col w-full'>
			<Text
				fontSize='24px'
				fontWeight='900'
				color={ colors.paradiso.default }
				subClassName='max-md:!text-base'
				fontType='h1'
			>
				{ facilityDetail?.name }
			</Text>

			<div className='mt-4 md:mt-8 w-full'>
				<CustomCarousel arrowButton>
					{ (facilityDetail?.image_url ?? [])?.map((image, index) => {
						return (
							<div key={ index } className='relative overflow-hidden bg-white rounded-[5px] h-[220px] sm:h-[420px] sm:w-full'>
								{ image && (
									<Image
										key={ `carousel-nav-${ index }` }
										src={ image }
										alt='slider'
										className='object-cover'
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
										fill
									/>
								) }
							</div>
						);
					}) }
				</CustomCarousel>
			</div>
			<div className='mt-4 md:hidden w-full'>
				<CardMenu
					paramsSlug={ paramsSlug }
					data={ facilitiesData?.map(facility => ({
						name: facility?.name ?? '',
						slug: facility?.slug ?? ''
					})) }
				/>
			</div>
			<div className='mt-[50px] md:mt-12'>
				<TextHtml
					htmlStr={ facilityDetail?.information || '' }
					className='innerHTML'
				/>
			</div>

			{/* notes: dihide karena seharusnya pakai dari yg field facilities_hospitals saja */ }
			{/* { facilityDetail?.available_at?.filter(data => !!data)?.length ? (
				<div className='sm:flex gap-x-5'>
					<div className='grid grid-cols-2 gap-4 sm:gap-10 mt-6 w-full'>
						{
							facilityDetail?.available_at?.map((data: string, index: number) => {
								if (index !== 0)
									return (
										<div className='flex flex-col' key={ index }>
											<Text
												fontSize='18px'
												fontWeight='900'
												lineHeight='24px'
												subClassName='max-md:text-base'
												className='mb-2.5'
											>
												{ data?.split(':+split+:')?.[0] }
											</Text>
											<TextHtml
												htmlStr={ (data?.split(':+split+:')?.[1] || '')?.trim() }
												className='text-sm md:text-base'
											/>
										</div>
									);
							})
						}
					</div>
				</div>
			) : null } */}
			{ facilityDetail?.facilities_hospitals && facilityDetail?.facilities_hospitals?.length
				? <AvailableAt hospital={ facilityDetail?.facilities_hospitals } />
				: null }
		</div>
	);
};

export default FacilitiesMenuContent;