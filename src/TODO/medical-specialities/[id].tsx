// import { useEffect } from 'react';
// import { useParams } from 'next/navigation';

// import { Breadcrumbs, CustomCarousel, Text } from '@/components/ui';
// import { colors } from '@/constant';
// import { FooterState } from '@/interface';
// import { useAppDispatch, useTypedSelector } from '@/hooks';

// import { FooterServiceStyle } from './style';
// import { getFooterDetail } from '@/stores/Footer';

// const FooterServicesPage = () => {
// 	const params = useParams();
// 	const { detail } = useTypedSelector<FooterState>('footerSlice');
// 	const isMedSpec = location.pathname.includes('medical-specialities');
// 	const fetchFooterDetail = useAppDispatch(getFooterDetail);
// 	const breadcrumbsPath = [
// 		{ name: 'Facilities & Services', url: '/facilities' },
// 	];

// 	useEffect(() => {
// 		fetchFooterDetail({
// 			queryParam: {
// 				slug: params.id,
// 			}
// 		});
// 	}, []);

// 	const renderContent = (
// 		<div>
// 			<Text fontSize='24px' fontWeight='900' color={ colors.paradiso.default }>
// 				{ detail?.[0]?.title }
// 			</Text>

// 			<div className='mt-[32px]'>
// 				{
// 					isMedSpec ?
// 						<img
// 							key={ 'carousel-nav' }
// 							src={ detail?.[0]?.img_url?.[0] }
// 							alt='slider'
// 							className='bg-white h-[220px] sm:h-[420px] sm:w-[729px] rounded-[5px] object-cover'
// 						/> :
// 						<CustomCarousel arrowButton={ true }>
// 							{ detail?.[0]?.img_url?.map((image, index) => {
// 								return <img
// 									key={ `carousel-nav-${ index }` }
// 									src={ image }
// 									alt='slider'
// 									className='bg-white h-[220px] sm:h-[420px] sm:w-[729px] rounded-[5px] object-cover'
// 								/>;
// 							}) ?? [] }
// 						</CustomCarousel>
// 				}
// 			</div>
// 			<div className='mt-[48px]'>
// 				<div
// 					style={ { lineHeight: '24px', fontSize: '16px' } }
// 					className='innerHTML'
// 					dangerouslySetInnerHTML={ { __html: detail?.[0]?.content || '' } }
// 				/>
// 			</div>
// 		</div>
// 	);

// 	return (
// 		<FooterServiceStyle>
// 			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] md:pt-[60px] pb-[60px]'>
// 				<div>
// 					<Breadcrumbs datas={ breadcrumbsPath } />
// 					<div className='content-wrapper mt-[64px]'>
// 						<div className='rightSide sm:ml-[32px]'>
// 							{ renderContent }
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</FooterServiceStyle>
// 	);
// };

// export default FooterServicesPage;