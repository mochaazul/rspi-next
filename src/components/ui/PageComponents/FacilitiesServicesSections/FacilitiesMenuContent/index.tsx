import Image from 'next/image';

import { colors } from '@/constant';
import { FacilityServicesDetail } from '@/interface';

import AvailableAt from '../AvailableAt';
import CardMenu from '../CardMenu';

import Text from '../../../Text';
import CustomCarousel from '../../../Carousel';

type Props = {
	facilitiesData: FacilityServicesDetail[];
	paramsSlug: string;
};

const FacilitiesMenuContent: React.FC<Props> = ({
	facilitiesData,
	paramsSlug
}) => {
	const getContent = () => {
		return facilitiesData.find(item => item.slug === paramsSlug);
	};

	return (
		<div className='flex flex-col w-full'>
			<Text
				fontSize='24px'
				fontWeight='900'
				color={ colors.paradiso.default }
				subClassName='max-md:!text-base'
			>
				{ getContent()?.name }
			</Text>

			<div className='mt-4 md:mt-8 w-full'>
				<CustomCarousel arrowButton dotsContainerClassName='bottom-1 lg:bottom-6'>
					{ (getContent()?.image_url ?? [])?.map((image, index) => {
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
				<CardMenu paramsSlug={ paramsSlug } data={ facilitiesData } />
			</div>
			<div className='mt-[50px] md:mt-12'>
				<div
					className='innerHTML text-xs max-md:!leading-[18px] sm:text-sm md:text-base'
					dangerouslySetInnerHTML={ { __html: getContent()?.information || '' } }
				/>
			</div>
			{ /* <Text className='mt-[32px]' fontSize='20px' fontWeight='900' lineHeight='24px'>
				{ getContent()?.available_at?.[0] }
			</Text> */ }

			<div className='sm:flex gap-x-5'>
				<div className='grid grid-cols-2 gap-x-20 mt-[24px]'>
					{
						getContent()?.available_at?.map((data: any, index: number) => {
							if (index !== 0)
								return (
									<div className='flex flex-col mt-[16px]' key={ index }>
										<Text fontSize='18px' fontWeight='900' lineHeight='24px'>
											{ data?.split(':+split+:')[0] }
										</Text>
										<div className='innerHTML text-16 mt-[10px]' dangerouslySetInnerHTML={ { __html: data?.split(':+split+:')[1] } } />
									</div>
								);
						})
					}
				</div>
			</div>
			{ getContent()?.facilities_hospitals && getContent()?.facilities_hospitals?.length
				? <AvailableAt hospital={ getContent()?.facilities_hospitals ?? [] } />
				: null }
		</div>
	);
};

export default FacilitiesMenuContent;