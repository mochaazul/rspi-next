'use client';
import { useState } from 'react';

import { FacilityServicesDetail } from '@/interface';

import { WrapperFacilitiesServices } from './style';
import { useScopedI18n } from '@/locales/client';
import { colors, icons } from '@/constant';
import Text from '@/components/ui/Text';
import Link from 'next/link';
import { Accordion } from '@/components/ui';
import Image from 'next/image';

const FacilitiesServices = ({ facilityServices }: { facilityServices: FacilityServicesDetail[]; }) => {
	const t = useScopedI18n('page.landingPage.facilitiesServices');
	const [accordionOpenIndex, setAccordionOpenIndex] = useState(0);

	return (
		<WrapperFacilitiesServices className='w-full px-3 md:px-40 sm:mt-16 mt-12'>
			<div>
				<Text fontSize='44px' fontType='h1' fontWeight='900' color={ colors.grey.darker } lineHeight='57px'>
					{ t('heading') }
				</Text>
				<div className='desc flex row justify-between items-center mt-3'>
					<Text fontSize='20px' lineHeight='30px' fontType='p' fontWeight='400' color={ colors.grey.dark } className='flex-1 md:pr-32'>
						{ t('subHeading') }
					</Text>
					<Link href='/facilities' className='max-sm:hidden'>
						<div className='see-all flex row items-center'>
							<Text fontSize='16px' fontType='p' fontWeight='900' color={ colors.paradiso.default }>
								{ t('allItemlabel') }
							</Text>
							<icons.LongArrowRight className='svg-green ml-2' />
						</div>
					</Link>
				</div>
			</div>
			<div className='accordion-img flex sm:flex-row flex-col-reverse mt-[24px]'>
				<div className='sm:flex-1 sm:pr-11 py-4 max-sm:pt-6 max-sm:pl-4 max-sm:pr-4'>
					<Accordion
						onlyOpenOne={ true }
						onOpenIndex={ index => setAccordionOpenIndex(index) }
						datas={ facilityServices?.map(data => ({ title: data.name ?? '', desc: data.short_description ?? '' })) }
					/>
				</div>
				<div className='sm:grow-0'>
					<div className='relative sm:w-[350px] w-[450px] h-[450px] max-h-[450px] img-shadow sm:border-[10px] overflow-hidden sm:border-white sm:border-solid'>
						<Image
							src={ facilityServices[accordionOpenIndex]?.image_url?.[0] ?? '' }
							alt={ facilityServices[accordionOpenIndex]?.short_description ?? 'placeholder image' }
							className='object-cover'
							fill
						/>
					</div>
				</div>
			</div>
			<div className='sm:hidden flex mt-[26px]'>
				<Link href='/facilities' className='m-auto'>
					<div className='see-all flex row items-center'>
						<Text fontSize='16px' fontType='p' fontWeight='900' color={ colors.paradiso.default }>
							{ t('allItemlabel') }
						</Text>
						<icons.LongArrowRight className='svg-green ml-2' />
					</div>
				</Link>
			</div>
		</WrapperFacilitiesServices>
	);
};

export default FacilitiesServices;