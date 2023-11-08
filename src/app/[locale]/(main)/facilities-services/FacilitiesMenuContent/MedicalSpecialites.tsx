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