'use client';
import { useRef } from 'react';

import { CustomerReviewStyle } from './CustomerReviewStyle';
import BalloonSlider from './BalloonSlider';
import images from '@/constant/images';
import Text from '@/components/ui/Text';
import { colors, icons } from '@/constant';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';

const CustomerReview = () => {
	const CardReviewRef = useRef<HTMLDivElement>(null);
	const t = useScopedI18n('page.landingPage.customerReview');
	const currentLang = useCurrentLocale();

	const sampleDatasIdn = [
		{
			short_description: 'Saat itu kaki dan tangan saya tidak dapat digerakkan. Berkat penanganan yang sigap dan perawatan intensif di bawah pengawasan dokter spesialis saraf saya, yaitu dr. Rubiana, perlahan tangan saya sudah bisa kembali bergerak.',
			customer_avatar: images.CustomerReviewCustAvatar,
			customer_name: 'Purwanto',
			customer_illness: 'Pasien Stroke'
		},
		{
			short_description: 'Menemukan dokter spesialis anak yang cocok itu bagaikan mencari jodoh. Makanya begitu klik, Darella tidak mau pindah ke dokter lain. Selalu pilih Prof. Hinky yang sangat ramah dengan anak-anak',
			customer_avatar: images.CustomerReviewCustAvatar,
			customer_name: 'Triyanawanti, ibu dari Darella',
			customer_illness: 'Pasien DBD',
		},
		{
			short_description: 'Siapa yang mengira saya akan mengalami serangan jantung di usia semuda ini. Bersyukur saya bertemu dengan dr. Sari, dokter spesialis jantung yang sangat komunikatif. Penanganan tim medis RS Pondok Indah juga sangat baik, perawatnya ramah, dan cepat tanggap.',
			customer_avatar: images.CustomerReviewCustAvatar,
			customer_name: 'Fajar',
			customer_illness: 'Pasien Serangan Jantung'
		},
		{
			short_description: 'Kami awalnya berniat melahirkan normal. Namun, di usia kehamilan 32 minggu, ternyata baby Zane posisinya sungsang. Akhirnya, dr. Eric sebagai dokter obgyn kami sigap melakukan tindakan untuk memutar posisi bayi, dan ternyata berhasil!',
			customer_avatar: images.CustomerReviewCustAvatar,
			customer_name: 'Fifi Cendrawati',
			customer_illness: 'Pasien Persalinan'
		}
	];

	const sampleDatasEn = [
		{
			short_description: 'At that time, I couldn`t move my legs and arms.Thanks to prompt handling and intensive care under the supervision of my neurology specialist, Dr.Rubiana, my hands have gradually regained movement.',
			customer_avatar: images.CustomerReviewCustAvatar,
			customer_name: 'Purwanto',
			customer_illness: 'Stroke Patient'
		},
		{
			short_description: 'Finding the right pediatric specialist is like finding a soulmate. That`s why once Darella found the right fit, she didn`t want to switch to another doctor. She always chose Prof. Hinky, who is very friendly with children.',
			customer_avatar: images.CustomerReviewCustAvatar,
			customer_name: 'Triyanawanti, Darella`s mother',
			customer_illness: 'Patient with Dengue Fever (DBD)',
		},
		{
			short_description: 'Who would have thought I would have a heart attack at such a young age. I am grateful to have met Dr. Sari, a very communicative cardiac specialist. The medical team at Pondok Indah Hospital provided excellent care, the nurses were friendly, and responsive.',
			customer_avatar: images.CustomerReviewCustAvatar,
			customer_name: 'Fajar',
			customer_illness: 'Heart attack patient.'
		},
		{
			short_description: 'Initially, we intended to have a normal delivery. However, at 32 weeks of pregnancy, it turned out that baby Zane was in a breech position. Eventually, Dr. Eric, our obstetrician, promptly performed a procedure to rotate the baby`s position, and it was successful!',
			customer_avatar: images.CustomerReviewCustAvatar,
			customer_name: 'Fifi Cendrawati',
			customer_illness: 'Maternity patient'
		}
	];

	const handleArrowClick = (direction: 'left' | 'right') => () => {
		CardReviewRef.current?.scrollBy({
			left: direction === 'left' ? -384 : 384,
			behavior: 'smooth'
		});
	};

	return (
		<CustomerReviewStyle>
			<div className='opacity-10 top-0 left-5 sm:left-[5%] absolute'>
				<img src={ images.CustomerQuoteImg.src } alt='Quote' />
			</div>
			<div className='sm:mx-32 mx-3 flex flex-row space-between items-center max-sm:px-5'>
				<Text
					className='flex-1'
					fontType='h1'
					fontSize='44px'
					fontWeight='900'
					lineHeight='57px'
					color={ colors.white.default }
					text={ t('heading') }
					subClassName='max-sm:text-[20px] max-sm:leading-[30px]'
				/>
				<div className='indicator-cont flex flex-row space-between gap-8 ml-6'>
					<div className='btn-indicator left rounded-full flex items-center justify-center' onClick={ handleArrowClick('left') }>
						<icons.LongArrowRight className='svg-white rotate-180' />
					</div>
					<div className='btn-indicator right rounded-full flex items-center justify-center' onClick={ handleArrowClick('right') }>
						<icons.LongArrowRight className='svg-white' />
					</div>
				</div>
			</div>
			<div ref={ CardReviewRef } className='balloon-container sm:mt-[48px] mt-6 w-full flex flex-1 flex-row flex-nowrap gap-8 relative overflow-x-auto px-[5vw]'>
				{
					(currentLang === 'id' ? sampleDatasIdn : sampleDatasEn).map((data, index) => (
						<div className='relative perspective-[100px] sm:w-[540px] w-full shrink-0' key={ index }>
							<BalloonSlider
								short_description={ data.short_description }
								customer_avatar={ data.customer_avatar.src }
								customer_name={ data.customer_name }
								customer_illness={ data.customer_illness }
							/>
						</div>
					))
				}
			</div>
		</CustomerReviewStyle>
	);
};

export default CustomerReview;