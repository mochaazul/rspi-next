'use server';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { colors, icons } from '@/constant';
import { MedicalSpecialities } from '@/interface/MedicalSpecialities';
import { FacilityServicesDetail } from '@/interface';

import { MedicalSpecialitiesItemContainer } from './style';

import CardMenu from '../CardMenu';
import Text from '../../../Text';
import { getScopedI18n } from '@/locales/server';

type Props ={
	facilityData: FacilityServicesDetail[],
	paramsSlug: string;
	medicalSpecialities?: MedicalSpecialities[];
}

const MedicalSpecialitiesComponent = async({
	facilityData,
	paramsSlug,
	medicalSpecialities
}: Props) => {
	
	const t = await getScopedI18n('page.facilities.medicalSpecialities');

	return (
		<div>
			<Text
				fontSize='24px'
				fontWeight='900'
				color={ colors.paradiso.default }
				subClassName='max-md:!text-base'
				fontType='h1'
			>
				{ t('heading') }
			</Text>

			<div className='mt-4 md:mt-8'>
				<div>
					<div className='w-full mb-4 md:mb-8'>
						<Image
							src='/images/specialities/background.png'
							alt='medicalSpecialties'
							className='object-cover object-top w-full rounded-[5px] '
							width={ 1600 }
							height={ 350 }
						/>
					</div>
					<Text
						fontSize='16px'
						lineHeight='24px'
						className='max-md:text-sm'
					>
						{ t('content') }
					</Text>
					<div className='mt-4 md:hidden'>
						<CardMenu paramsSlug={ paramsSlug } data={ facilityData } />
					</div>
					<MedicalSpecialitiesItemContainer className='mt-[50px] md:mt-8 w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
						{
							medicalSpecialities?.map((item, key) => {
								return (
									<Link key={ key } href={ `/medical-specialties/${ item.slug }` }>
										<div className='bg-white p-3 md:p-4 flex justify-between gap-2 w-full h-full specialities-item-container min-h-[64px] md:min-h-[88px]'>
											<Text
												text={ item.title }
												fontSize='16px'
												fontWeight='900'
												lineHeight='28px'
												subClassName='max-md:text-sm'
											/>

											{ /* { imageSrc && (
												<div className='relative overflow-hidden w-6 h-6 md:w-10 md:h-10 flex-shrink-0'>
													<Image
														src={ imageSrc }
														alt={ item.title ?? '' }
														sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
														className='object-cover'
														fill
													/>
												</div>
											) } */ }
										</div>
									</Link>
								);
							})
						}
					</MedicalSpecialitiesItemContainer>

				</div>
			</div >
		</div >
	);
};

export default MedicalSpecialitiesComponent;