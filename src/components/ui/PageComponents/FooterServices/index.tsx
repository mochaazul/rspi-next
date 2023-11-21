'use client';
import { PropsWithChildren, PropsWithRef } from 'react';

import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import { colors } from '@/constant';

import { useGetFooterPages } from '@/lib/api/client/footer';

import {
	Breadcrumbs,
	CustomCarousel,
	Text
} from '@/components/ui';

import { BreadcrumbsType } from '../../Breadcrumbs';

import { FooterServiceStyle } from './style';

type Props = PropsWithRef<PropsWithChildren<{
	slug: string,
	breadcrumbsPath: BreadcrumbsType['datas'],
    isMedSpec: boolean
}>>;

const FooterServices = ({
	slug,
	breadcrumbsPath,
	isMedSpec
}: Props) => {
    
	const param = {
		query: {
			slug: slug
		}
	};

	const {
		data: FooterState,
	} = useGetFooterPages(param);

	const detail = Object.values(FooterState?.data || []);
	
	const renderContent = (
		<div>
			<Text fontSize='24px' fontWeight='900' color={ colors.paradiso.default }>
				{ detail?.[0]?.title }
			</Text>

			<div className='mt-[32px]'>
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
			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] md:pt-[60px] pb-[60px]'>
				<div>
					<Breadcrumbs datas={ breadcrumbsPath } />
					<div className='content-wrapper mt-[64px]'>
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