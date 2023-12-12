'use client';

import React, { PropsWithChildren, PropsWithRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { colors, icons } from '@/constant';
import { MedicalSpecialities } from '@/interface/MedicalSpecialities';
import { FacilityServicesDetail } from '@/interface';
import { useScopedI18n } from '@/locales/client';

import { MedicalSpecialitiesItemContainer } from './style';

import CardMenu from '../CardMenu';
import Text from '../../../Text';

type Specialities = {
	title: string,
	icon: React.ReactElement;
};
const specialities: Specialities[] = [
	{
		title: 'Akupuntur',
		icon: <icons.Specialities.Akupuntur />
	},
	{
		title: 'Anak',
		icon: <icons.Specialities.Anak />
	},
	{
		title: 'Gizi Klinik',
		icon: <icons.Specialities.Gizi />
	},
	{
		title: 'Jantung & Pembuluh Darah',
		icon: <icons.Specialities.Jantung />
	},
	{
		title: 'Rehabilitasi Medik & Fisioterapi',
		icon: <icons.Specialities.Rehabilitiasi />
	},
	{
		title: 'THT',
		icon: <icons.Specialities.Tht />
	},
	{
		title: 'Alergi & Imunologi',
		icon: <icons.Specialities.Alergi />
	},
	{
		title: 'Bedah',
		icon: <icons.Specialities.Bedah />
	},
	{
		title: 'Paru & Pernapasan',
		icon: <icons.Specialities.Paru />
	},
	{
		title: 'Psikiatri/Kesehatan Jiwa',
		icon: <icons.Specialities.Psikiatri />
	},
	{
		title: 'Kesehatan Mata',
		icon: <icons.Specialities.Mata />
	},
	{
		title: 'Tumbuh Kembang & Edukasi Terpadu',
		icon: <icons.Specialities.TumbuhKembang />
	},
	{
		title: 'Anestesi',
		icon: <icons.Specialities.Anestesi />
	},
	{
		title: 'Kulit & Kelamin',
		icon: <icons.Specialities.Kelamin />
	},
	{
		title: 'Penyakit Dalam',
		icon: <icons.Specialities.PenyakitDalam />
	},
	{
		title: 'Psikologi',
		icon: <icons.Specialities.Psikologi />
	},
	{
		title: 'Klinik Laktasi',
		icon: <icons.Specialities.Laktasi />
	},
	{
		title: 'Klinik Saraf & Bedah Saraf',
		icon: <icons.Specialities.Saraf />
	}
];

type Props = PropsWithRef<PropsWithChildren<{
	facilityData: FacilityServicesDetail[],
	paramsSlug: string;
	medicalSpecialities?: MedicalSpecialities[];
}>>;

const MedicalSpecialitiesComponent = ({
	facilityData,
	paramsSlug,
	medicalSpecialities
}: Props) => {
	const t = useScopedI18n('page.facilities.medicalSpecialities');

	return (
		<div>
			<Text fontSize='24px' fontWeight='900' color={ colors.paradiso.default }>
				{ t('heading') }
			</Text>

			<div className='mt-4 md:mt-8'>
				<div>
					<Text
						fontSize='16px'
						lineHeight='24px'
						className='max-md:text-sm'
					>
						{ t('content') }
					</Text>
					<div className='mt-4 mb-4 md:hidden'>
						<CardMenu paramsSlug={ paramsSlug } data={ facilityData } />
					</div>
					<MedicalSpecialitiesItemContainer className='mt-[24px] w-full flex max-md:flex-col md:grid md:grid-cols-3 gap-4 md:gap-8'>
						{
							medicalSpecialities?.map((item, key) => {
								return (
									<Link key={ key } href={ `/medical-specialities/${ item.slug }` }>
										<div className='bg-white p-3 md:p-5 flex justify-between gap-2 w-full h-full specialities-item-container md:min-h-[96px]'>
											<Text
												text={ item.title }
												fontSize='16px'
												fontWeight='900'
												lineHeight='28px'
												subClassName='max-md:text-sm'
											/>

											{/* { imageSrc && (
												<div className='relative overflow-hidden w-6 h-6 md:w-10 md:h-10 flex-shrink-0'>
													<Image
														src={ imageSrc }
														alt={ item.title ?? '' }
														sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
														className='object-cover'
														fill
													/>
												</div>
											) } */}
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