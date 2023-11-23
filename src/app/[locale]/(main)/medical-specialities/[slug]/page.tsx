import Image from 'next/image';

import { colors } from '@/constant';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Text from '@/components/ui/Text';

import { getFooterSlug } from '@/lib/api';

import { FooterServiceStyle } from './style';

const MedicalSpecialitiesPage = async ({ params }: { params: { slug: string; }; }) => {
	const footerSlugRes = await getFooterSlug({
		query: {
			slug: params.slug,
		}
	});
	const detail = footerSlugRes?.data;
	const breadcrumbsPath = [
		{ name: 'Facilities & Services', url: '/facilities/medical-specialities' },
		{ name: detail?.[0]?.title ?? '', url: '#' },
	];

	const renderContent = (
		<div>
			<Text fontSize='24px' fontWeight='900' color={ colors.paradiso.default }>
				{ detail?.[0]?.title }
			</Text>

			<div className='mt-[32px]'>
				{ detail?.[0]?.img_url?.[0] && (
					<div className='bg-white h-[220px] sm:h-[420px] w-full rounded-[5px] relative overflow-hidden'>
						<Image
							src={ detail?.[0]?.img_url?.[0] }
							alt='slider'
							className='object-cover'
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw'
							fill
						/>
					</div>
				) }
				{/* {
					isMedSpec ?
						<Image
							key={ 'carousel-nav' }
							src={ detail?.[0]?.img_url?.[0] }
							alt='slider'
							className='bg-white h-[220px] sm:h-[420px] sm:w-[729px] rounded-[5px] object-cover'
						/> :
						<CustomCarousel arrowButton={ true }>
							{ detail?.[0]?.img_url?.map((image, index) => {
								return <img
									key={ `carousel-nav-${ index }` }
									src={ image }
									alt='slider'
									className='bg-white h-[220px] sm:h-[420px] sm:w-[729px] rounded-[5px] object-cover'
								/>;
							}) ?? [] }
						</CustomCarousel>
				} */}
			</div>
			<div className='mt-[48px]'>
				<div
					style={ { lineHeight: '24px', fontSize: '16px' } }
					className='innerHTML'
					dangerouslySetInnerHTML={ { __html: detail?.[0]?.content || '' } }
				/>
			</div>
		</div>
	);

	return (
		<FooterServiceStyle>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-4 pb-[60px]'>
				<div>
					<Breadcrumbs datas={ breadcrumbsPath } />
					<div className='content-wrapper mt-[64px] w-full'>
						{ renderContent }
					</div>
				</div>
			</div>
		</FooterServiceStyle>
	);
};

export default MedicalSpecialitiesPage;