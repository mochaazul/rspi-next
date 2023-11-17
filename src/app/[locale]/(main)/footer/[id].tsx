import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { Breadcrumbs, CustomCarousel, Spinner, Text } from '@/components/ui';
import { Languages, colors } from '@/constant';
import { FooterState } from '@/interface';
import { useAppDispatch, useTypedSelector } from '@/hooks';

import { FooterServiceStyle } from './style';
import { getFooterDetail } from '@/stores/Footer';

const FooterServicesPage = () => {
	const params = useParams();
	const { loading, detail } = useTypedSelector<FooterState>('footerSlice');
	const fetchFooterDetail = useAppDispatch(getFooterDetail);

	const breadcrumbsPath = [
		{ name: 'Facilities & Services', url: '/facilities' },
	];

	const isMedSpec = location.pathname.includes('medical-specialities');

	useEffect(() => {
		fetchFooterDetail({
			queryParam: {
				slug: params.id,
			}
		});
	}, [params?.id]);

	const renderContent = (
		<div>
			<Text
				fontSize='24px'
				fontWeight='900'
				color={ colors.paradiso.default }
				subClassName='max-sm:text-base'
			>
				{ detail?.[0]?.title }
			</Text>

			<div className='mt-4 sm:mt-8'>
				{
					isMedSpec ?
						<img
							src={ detail?.[0]?.img_url?.[0] }
							alt='slider'
							className='bg-white h-[220px] sm:h-[420px] sm:w-full rounded-[5px] object-cover'
						/> :
						<CustomCarousel arrowButton={ true } dotsContainerClassName='!bottom-1 sm:!bottom-2'>
							{ detail?.[0]?.img_url?.map((image, index) => {
								return <img
									key={ `carousel-nav-${ index }` }
									src={ image }
									alt='slider'
									className='bg-white h-[220px] sm:h-[420px] sm:w-full rounded-[5px] object-cover'
								/>;
							}) ?? [] }
						</CustomCarousel>
				}
			</div>
			<div className='mt-12'>
				<div
					className='innerHTML max-sm:!leading-[18px] text-xs sm:text-base'
					dangerouslySetInnerHTML={ { __html: detail?.[0]?.content || '' } }
				/>
			</div>
		</div>
	);

	return (
		<FooterServiceStyle>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] md:pt-[60px] pb-[60px]'>
				<div>
					<Breadcrumbs datas={ breadcrumbsPath } />
					<div className='content-wrapper mt-[25px] sm:mt-16'>
						<div className='rightSide w-full'>
							{
								loading ?
									<div className='min-h-screen py-32 w-full'>
										<Spinner />
									</div> :
									renderContent
							}
						</div>
					</div>
				</div>
			</div>
		</FooterServiceStyle>
	);
};

export default FooterServicesPage;