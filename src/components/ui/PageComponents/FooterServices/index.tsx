'use client';
import { PropsWithChildren, PropsWithRef } from 'react';

import { colors } from '@/constant';

import {
	Breadcrumbs,
	CustomCarousel,
	Text
} from '@/components/ui';

import TextHtml from '@/components/ui/TextHtml';

import { FooterServiceStyle } from './style';

type Props = PropsWithRef<PropsWithChildren<{
	detail: any,
	isMedSpec: boolean;
}>>;

const FooterServices = ({
	detail,
	isMedSpec
}: Props) => {
	const isImgEmpty = detail?.[0]?.img_url !== null;
	const renderContent = (
		<div>
			<Text fontSize='24px' fontWeight='900' subClassName='max-sm:text-[20px] font-black' color={ colors.paradiso.default }>
				{ detail?.[0]?.title }
			</Text>

			<div className={ isImgEmpty ? 'mt-[32px]' : 'mt-[10px]' }>
				{
					isMedSpec ?
						<img
							key={ 'carousel-nav' }
							src={ detail?.[0]?.img_url?.[0] }
							alt='slider'
							className='bg-white h-[220px] sm:h-[420px] sm:w-full rounded-[5px] object-cover w-full'
						/> :
						<CustomCarousel arrowButton={ true }>
							{ detail?.[0]?.img_url?.map((image: string, index: any) => {
								return <img
									key={ `carousel-nav-${ index }` }
									src={ image }
									alt='slider'
									className='bg-white h-[220px] sm:h-[420px] sm:w-full rounded-[5px] object-cover w-full'
								/>;
							}) ?? [] }
						</CustomCarousel>
				}
			</div>
			<div className={ isImgEmpty ? 'mt-[48px]' : 'mt-[10px]' }>
				<TextHtml
					className='innerHTML'
					htmlStr={ detail?.[0]?.content ?? '' }
				/>
			</div>
		</div>
	);

	const breadcrumbsPath = [
		{ name: detail?.[0]?.title, url: `/${ detail?.[0]?.slug }` },
	];

	return (
		<FooterServiceStyle>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] pb-[60px]'>
				<div>
					<div className='content-wrapper flex flex-col'>
						<div className='mb-[20px] sm:ml-[32px]'>
							<Breadcrumbs datas={ breadcrumbsPath } />
						</div>
						<div className='rightSide sm:ml-[32px]'>
							{ renderContent }
						</div>
					</div>
				</div>
			</div>
		</FooterServiceStyle>
	);
};

export default FooterServices;