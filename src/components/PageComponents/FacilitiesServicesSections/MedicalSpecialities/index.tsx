'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, PropsWithRef } from 'react';

import { colors, icons } from '@/constant';
import { MedicalSpecialities } from '@/interface/MedicalSpecialities';
import { FacilityServicesDetail } from '@/interface';

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
		icon: <Image src={ icons.Specialities.Akupuntur } alt="" />
	},
	{
		title: 'Anak',
		icon: <Image src={ icons.Specialities.Anak } alt="" />
	},
	{
		title: 'Gizi Klinik',
		icon: <Image src={ icons.Specialities.Gizi } alt="" />
	},
	{
		title: 'Jantung & Pembuluh Darah',
		icon: <Image src={ icons.Specialities.Jantung } alt="" />
	},
	{
		title: 'Rehabilitasi Medik & Fisioterapi',
		icon: <Image src={ icons.Specialities.Rehabilitiasi } alt="" />
	},
	{
		title: 'THT',
		icon: <Image src={ icons.Specialities.Tht } alt="" />
	},
	{
		title: 'Alergi & Imunologi',
		icon: <Image src={ icons.Specialities.Alergi } alt="" />
	},
	{
		title: 'Bedah',
		icon: <Image src={ icons.Specialities.Bedah } alt="" />
	},
	{
		title: 'Paru & Pernapasan',
		icon: <Image src={ icons.Specialities.Paru } alt="" />
	},
	{
		title: 'Psikiatri/Kesehatan Jiwa',
		icon: <Image src={ icons.Specialities.Psikiatri } alt="" />
	},
	{
		title: 'Kesehatan Mata',
		icon: <Image src={ icons.Specialities.Mata } alt="" />
	},
	{
		title: 'Tumbuh Kembang & Edukasi Terpadu',
		icon: <Image src={ icons.Specialities.TumbuhKembang } alt="" />
	},
	{
		title: 'Anestesi',
		icon: <Image src={ icons.Specialities.Anestesi } alt="" />
	},
	{
		title: 'Kulit & Kelamin',
		icon: <Image src={ icons.Specialities.Kelamin } alt="" />
	},
	{
		title: 'Penyakit Dalam',
		icon: <Image src={ icons.Specialities.PenyakitDalam } alt="" />
	},
	{
		title: 'Psikologi',
		icon: <Image src={ icons.Specialities.Psikologi } alt="" />
	},
	{
		title: 'Klinik Laktasi',
		icon: <Image src={ icons.Specialities.Laktasi } alt="" />
	},
	{
		title: 'Klinik Saraf & Bedah Saraf',
		icon: <Image src={ icons.Specialities.Saraf } alt="" />
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
	const navigate = useRouter();

	return (
		<div>
			<Text fontSize='24px' className='mt-[24px]' fontWeight='900' color={ colors.paradiso.default }>
				Medical Specialities
			</Text>

			<div className='mt-[32px]'>
				<div
					style={ { lineHeight: '24px', fontSize: '16px' } }
					className='innerHTML'
				>

					<p className='max-[480px]:mb-4'>
						Kebutuhan kesehatan yang spesifik membutuhkan penanganan yang spesifik pula sesuai dengan kondisi yang Anda alami. Layanan klinik rawat jalan kami didukung oleh dokter dari berbagai spesialisasi dan subspesialisasi serta tenaga medis profesional dalam menjamin pelayanan terbaik untuk Anda.
					</p>
					<div className='mt-[16px] mb-4 md:hidden'>
						<CardMenu paramsSlug={ paramsSlug } data={ facilityData } />
					</div>
					<MedicalSpecialitiesItemContainer className='mt-[24px] max-[480px]:table-cell'>
						{
							medicalSpecialities?.map((item, key) => {
								const imageSrc = item.img_url?.length
									? item.img_url[0]
									: '';
								return (
									<div key={ key } className='flex justify-between specialities-item max-[480px]:mb-4' onClick={ () => navigate.push(`/medical-specialities/${ item.slug }`) }>
										<Text text={ item.title } fontWeight='700' />
										<div className='max-[480px]:w-16'></div>
										{ imageSrc && (
											<div className='relative overflow-hidden w-10 max-[480px]:w-12'>
												<Image
													src={ imageSrc }
													alt={ item.title ?? '' }
													sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
													fill
												/>
											</div>
										) }
									</div>
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