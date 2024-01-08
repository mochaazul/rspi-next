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
			short_description: 'Saat itu kaki dan tangan kanan saya tidak bisa digerakkan. Berkat penanganan yang sigap dan perawatan intensif di bawah pengawasan dr. Rubiana, kini sedikit-sedikit tangan saya sudah bisa digerakkan.',
			customer_avatar: images.purwantoReview,
			customer_name: 'Purwanto',
			customer_illness: 'Pasien Stroke'
		},
		{
			short_description: 'Siapa sangka, saya mengalami serangan jantung di usia semuda ini. Untunglah bertemu dr. Sari yang sangat komunikatif. Penanganan tim medis RSPI juga sangat baik, perawatnya ramah dan cepat tanggap.',
			customer_avatar: images.FajarReview,
			customer_name: 'Fajar',
			customer_illness: 'Pasien Serangan Jantung'
		},
		{
			short_description: 'Menemukan dokter spesialis anak yang cocok itu bagaikan mencari jodoh. Makanya begitu klik, Darella tidak mau pindah ke dokter lain. Selalu pilih Prof. Hinky yang sangat ramah dengan anak-anak',
			customer_avatar: images.TriyanawantiReview,
			customer_name: 'Triyanawanti, ibu dari Darella',
			customer_illness: 'Pasien DBD',
		},
		{
			short_description: 'Saya mengenal dr. Rochsismandoko sejak RS Pondok Indah - Bintaro Jaya pertama kali dibuka. Dengan arahan beliau, saya menjaga agar kadar gula darah saya tetap normal.',
			customer_avatar: images.AyudhiariniReview,
			customer_name: 'Ayudhiarini',
			customer_illness: 'Pasien Diabetes'
		},
		{
			short_description: 'Berat badan saya sempat turun drastis hingga tinggal 34 kilogram. Padahal waktu itu saya masih menyusui. Dari pemeriksaan MRI dan pengambilan sampel sumsum tulang belakang, ternyata saya meningitis.',
			customer_avatar: images.ApriyolaReview,
			customer_name: 'Apriyola',
			customer_illness: 'Pasien Meningitis'
		},
		{
			short_description: 'Di usia kehamilan 32 minggu, ternyata baby Zane posisinya sungsang, padahal dari awal saya berniat melahirkan normal. Akhirnya, dr. Eric melakukan tindakan untuk memutar posisi bayi, dan berhasil!',
			customer_avatar: images.CendrawatiReview,
			customer_name: 'Fifi Cendrawati',
			customer_illness: 'Pasien Persalinan'
		},
		{
			short_description: 'Suami saya orang Perancis, dan di Perancis ada tradisi ayah sang bayi yang memotong tali pusat. Saya coba mengajukan ini ke dr. Calvin dan beliau setuju. Senang sekali rasanya!',
			customer_avatar: images.SarwonoReview,
			customer_name: 'Wenly Sarwono',
			customer_illness: 'Pasien Persalinan'
		},
		{
			short_description: 'Tadinya saya cukup khawatir karena harus melahirkan di tengah pandemi. Syukurlah prosedur dan protokol kesehatan selalu dijaga ketat di RS Pondok Indah sehingga saya merasa tenang dan nyaman.',
			customer_avatar: images.AugustiniReview,
			customer_name: 'Dini Ayu Augustini',
			customer_illness: 'Pasien Persalinan'
		},
	];

	const sampleDatasEn = [
		{
			short_description: 'At that time, I could not move my leg and my right hand. Thanked to the quick handling and intensive treatment under the supervision of dr. Rubiana, now I can move my hand gradually.',
			customer_avatar: images.purwantoReview,
			customer_name: 'Purwanto',
			customer_illness: 'Stroke Patient'
		},
		{
			short_description: 'I never imagined suffering from a heart attack at a young age. Thanks to proper handling by dr. Sari Sri Mumpuni, discipline in medication, and tight eating pattern, a heart valve ring is unnecessary.',
			customer_avatar: images.FajarReview,
			customer_name: 'Fajar',
			customer_illness: 'Heart Attack Patient.'
		},
		{
			short_description: 'Finding the right pediatric specialist is like finding a soulmate. That`s why once Darella found the right fit, she didn`t want to switch to another doctor. She always chose Prof. Hinky, who is very friendly with children.',
			customer_avatar: images.TriyanawantiReview,
			customer_name: 'Triyanawanti, Darella`s mother',
			customer_illness: 'Patient with Dengue Fever (DBD)',
		},
		{
			short_description: 'Initially, we intended to have a normal delivery. However, at 32 weeks of pregnancy, it turned out that baby Zane was in a breech position. Eventually, Dr. Eric, our obstetrician, promptly performed a procedure to rotate the baby`s position, and it was successful!',
			customer_avatar: images.CendrawatiReview,
			customer_name: 'Fifi Cendrawati',
			customer_illness: 'Maternity Patient'
		},
		{
			short_description: 'With medical direction from dr. Rochsismandoko, I keep my blood glucose level normal.',
			customer_avatar: images.AyudhiariniReview,
			customer_name: 'Ayudhiarini',
			customer_illness: 'Diabetes Patient'
		},
		{
			short_description: 'My weight dropped dramatically to just 34 kg. Even though I was still breastfeeding. From the MRI examination and spinal cord sampling, it turned out that I had meningitis.',
			customer_avatar: images.ApriyolaReview,
			customer_name: 'Apriyola',
			customer_illness: 'Meningitis Patient'
		},
		{
			short_description: 'On my 32 weeks of pregnancy, it turned out that my baby Zane was in a breech position. Fortunately, dr Eric took the action to turn the baby into a headfirst, and it worked!',
			customer_avatar: images.CendrawatiReview,
			customer_name: 'Fifi Cendrawati',
			customer_illness: 'Maternity Patient'
		},
		{
			short_description: 'My husband is French, and in France, there is a tradition that a father should cut the babys umbilical cord. I told dr. Calvin about this and he agreed to the idea. We were so happy!',
			customer_avatar: images.SarwonoReview,
			customer_name: 'Wenly Sarwono',
			customer_illness: 'Maternity Patient'
		},
		{
			short_description: 'At first, I was quite worried because I had to give birth amid the pandemic. Thankfully the health procedures and protocols are very strict at RS Pondok Indah, so that I feel calm and comfortable.',
			customer_avatar: images.AugustiniReview,
			customer_name: 'Dini Ayu Augustini',
			customer_illness: 'Maternity Patient'
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
			<div className='sm:px-32 px-4 flex flex-row space-between items-center'>
				<Text
					className='flex-1'
					fontType='h2'
					fontSize='44px'
					fontWeight='900'
					lineHeight='57px'
					color={ colors.white.default }
					text={ t('heading') }
					subClassName='max-sm:!text-base heading-section'
				/>
				<div className='indicator-cont flex flex-row space-between gap-4 md:gap-[30px] ml-6'>
					<div className='btn-indicator left rounded-full flex items-center justify-center' onClick={ handleArrowClick('left') }>
						<icons.LongArrowRight className='svg-white rotate-180 w-[17px] h-[17px] sm:w-6 sm:h-6' />
					</div>
					<div className='btn-indicator right rounded-full flex items-center justify-center' onClick={ handleArrowClick('right') }>
						<icons.LongArrowRight className='svg-white w-[17px] h-[17px] sm:w-6 sm:h-6' />
					</div>
				</div>
			</div>
			<div ref={ CardReviewRef } className='balloon-container sm:mt-[48px] mt-6 w-full flex flex-1 flex-row flex-nowrap gap-4 md:gap-[30px] relative overflow-x-auto px-4 md:px-[5vw]'>
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