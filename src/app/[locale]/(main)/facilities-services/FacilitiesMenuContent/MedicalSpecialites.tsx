import { Text } from '@/components';
import { colors, icons } from '@/constant';
import React, { PropsWithChildren, PropsWithRef, useEffect } from 'react';
import { MedicalSpecialitiesItemContainer } from './style';
import { useAppDispatch, useTypedSelector } from '@/hooks';
import { getMedicalSpecialitiesDispatch } from '@/stores/MedicalSpecialities';
import { MedicalSpecialitiesState } from '@/interface/MedicalSpecialities';
import { useNavigate } from 'react-router-dom';
import { CenterOfExcellenceDetail } from '@/interface';
import CardMenu from '../CardMenu';
import Image from 'next/image';

type Specialities = {
	title: string,
	icon: React.ReactElement;
};
const specialities: Specialities[] = [
	{
		title: 'Akupuntur',
		icon: <Image src={icons.Specialities.Akupuntur} alt="" />
	},
	{
		title: 'Anak',
		icon: <Image src={icons.Specialities.Anak} alt="" />
	},
	{
		title: 'Gizi Klinik',
		icon: <Image src={icons.Specialities.Gizi} alt="" />
	},
	{
		title: 'Jantung & Pembuluh Darah',
		icon: <Image src={icons.Specialities.Jantung} alt="" />
	},
	{
		title: 'Rehabilitasi Medik & Fisioterapi',
		icon: <Image src={icons.Specialities.Rehabilitiasi} alt="" />
	},
	{
		title: 'THT',
		icon: <Image src={icons.Specialities.Tht} alt="" />
	},
	{
		title: 'Alergi & Imunologi',
		icon: <Image src={icons.Specialities.Alergi} alt="" />
	},
	{
		title: 'Bedah',
		icon: <Image src={icons.Specialities.Bedah} alt="" />
	},
	{
		title: 'Paru & Pernapasan',
		icon: <Image src={icons.Specialities.Paru} alt="" />
	},
	{
		title: 'Psikiatri/Kesehatan Jiwa',
		icon: <Image src={icons.Specialities.Psikiatri} alt="" />
	},
	{
		title: 'Kesehatan Mata',
		icon: <Image src={icons.Specialities.Mata} alt="" />
	},
	{
		title: 'Tumbuh Kembang & Edukasi Terpadu',
		icon: <Image src={icons.Specialities.TumbuhKembang} alt="" />
	},
	{
		title: 'Anestesi',
		icon: <Image src={icons.Specialities.Anestesi} alt="" />
	},
	{
		title: 'Kulit & Kelamin',
		icon: <Image src={icons.Specialities.Kelamin} alt="" />
	},
	{
		title: 'Penyakit Dalam',
		icon: <Image src={icons.Specialities.PenyakitDalam} alt="" />
	},
	{
		title: 'Psikologi',
		icon: <Image src={icons.Specialities.Psikologi} alt="" />
	},
	{
		title: 'Klinik Laktasi',
		icon: <Image src={icons.Specialities.Laktasi} alt="" />
	},
	{
		title: 'Klinik Saraf & Bedah Saraf',
		icon: <Image src={icons.Specialities.Saraf} alt="" />
	}
];

type Props = PropsWithRef<PropsWithChildren<{
	facilityData: CenterOfExcellenceDetail[],
	activeMenuIndex: number;
}>>;

const MedicalSpecialities = ({ facilityData, activeMenuIndex }: Props) => {
	const medicalSpecialitiesDispatch = useAppDispatch(getMedicalSpecialitiesDispatch);
	const { medicalSpecialities } = useTypedSelector<MedicalSpecialitiesState>('medicalSpecialities');
	const navigate = useNavigate();

	useEffect(() => {
		medicalSpecialitiesDispatch({
			queryParam: {
				footer_category: 'medical-specialities',
			}
		});
	}, []);

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
						<CardMenu activeMenuIndex={ activeMenuIndex } data={ facilityData } />
					</div>
					<MedicalSpecialitiesItemContainer className='mt-[24px] max-[480px]:table-cell'>
						{
							medicalSpecialities?.map((item, key) => (
								<div key={ key } className='flex justify-between specialities-item max-[480px]:mb-4' onClick={ () => navigate(`/medical-specialities/${ item.slug }`) }>
									<Text text={ item.title } fontWeight='700' />
									<div className='max-[480px]:w-16'></div>
									<img src={ (item.img_url && item.img_url[0]) ?? '' } className='w-10 max-[480px]:w-12' />
								</div>
							))
						}
					</MedicalSpecialitiesItemContainer>

				</div>
			</div >
		</div >
	);
};

export default MedicalSpecialities;