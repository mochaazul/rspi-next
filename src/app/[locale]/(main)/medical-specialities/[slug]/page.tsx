import Image from 'next/image';

import { colors } from '@/constant';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Text from '@/components/ui/Text';
import CustomCarousel from '@/components/ui/Carousel';
import { getMedicalSpecialityDetail } from '@/lib/api/facilities';
import { getScopedI18n } from '@/locales/server';

import { FooterServiceStyle } from './style';

const MedicalSpecialitiesPage = async ({ params }: { params: { slug: string; }; }) => {
	const footerSlugRes = await getMedicalSpecialityDetail({
		param: decodeURIComponent(params?.slug)
	});
	const detail = footerSlugRes?.data;
	const t = await getScopedI18n('page.facilities');

	const breadcrumbsPath = [
		{ name: t('heading'), url: '/facilities/medical-specialities' },
		{ name: detail?.title ?? '', url: '#' },
	];

	const renderImage = (image?: string) => {
		if (image) {
			return (
				<div className='relative overflow-hidden bg-white rounded-[5px] h-[220px] sm:h-[420px] w-full'>
					<Image
						src={ image }
						alt=''
						className='object-cover'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						fill
					/>
				</div>
			);
		}

		return null;
	};

	const renderContent = (
		<div className='w-full'>
			<Text fontSize='24px' fontWeight='900' color={ colors.paradiso.default }>
				{ detail?.title }
			</Text>

			<div className='mt-4 md:mt-8 w-full'>
				{ detail?.img_url && detail?.img_url?.length > 1
					? (
						<CustomCarousel arrowButton>
							{ detail?.img_url?.map((image, index) => {
								return (
									<div key={ index }>
										{ renderImage(image) }
									</div>
								);
							}) }
						</CustomCarousel>
					)
					: (
						<>
							{ renderImage(detail?.img_url?.[0]) }
						</>
					) }
			</div>
			<div className='mt-8 md:mt-12'>
				<div
					style={ { lineHeight: '24px', fontSize: '16px' } }
					className='innerHTML'
					dangerouslySetInnerHTML={ { __html: detail?.content || '' } }
				/>
			</div>
		</div>
	);

	return (
		<FooterServiceStyle>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-4 pb-[60px]'>
				<div>
					<Breadcrumbs datas={ breadcrumbsPath } />
					<div className='content-wrapper mt-[25px] md:mt-[50px] w-full'>
						{ renderContent }
					</div>
				</div>
			</div>
		</FooterServiceStyle>
	);
};

export default MedicalSpecialitiesPage;