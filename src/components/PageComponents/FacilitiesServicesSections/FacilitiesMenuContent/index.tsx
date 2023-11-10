import Image from 'next/image';

import { colors } from '@/constant';
import { FacilityServicesDetail } from '@/interface';

import AvailableAt from '../AvailableAt';
// import MedicalSpecialities from '../MedicalSpecialities';
import CardMenu from '../CardMenu';
import Text from '../../../Text';
import CustomCarousel from '../../../Carousel';

type Props = {
	facilitiesData: FacilityServicesDetail[];
	paramsId: number;
	hospital: FacilityServicesDetail[];
};

const FacilitiesMenuContent: React.FC<Props> = ({
	facilitiesData,
	paramsId,
	hospital
}) => {
	const getContent = () => {
		return facilitiesData.find(item => item.id === Number(paramsId));
	};

	// if (!getContent()) return <MedicalSpecialities activeMenuIndex={ activeMenuIndex } facilityData={ facilitiesData } />;

	return (
		<div>
			<Text fontSize='24px' fontWeight='900' color={ colors.paradiso.default }>
				{ getContent()?.name }
			</Text>

			<div className='mt-[32px]'>
				<CustomCarousel arrowButton={ true }>
					{ (getContent()?.image_url ?? [])?.map((image, index) => {
						return (
							<div key={ index } className='relative overflow-hidden rounded-[5px] h-[220px] sm:h-[420px] sm:w-[729px]'>
								<Image
									key={ `carousel-nav-${ index }` }
									src={ image }
									alt='slider'
									className='bg-white object-cover'
									fill
								/>
							</div>
						);
					}) }
				</CustomCarousel>
			</div>
			<div className='mt-[16px] md:hidden'>
				<CardMenu activeMenuIndex={ paramsId } data={ facilitiesData } />
			</div>
			<div className='mt-[48px]'>
				<div
					style={ { lineHeight: '24px', fontSize: '16px' } }
					className='innerHTML'
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
			{ hospital && hospital?.length
				? <AvailableAt hospital={ hospital } />
				: null }
		</div>
	);
};

export default FacilitiesMenuContent;