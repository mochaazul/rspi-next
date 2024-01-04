'use client';
import { PropsWithChildren, PropsWithRef } from 'react';

import { colors } from '@/constant';

import {
	Breadcrumbs,
	CustomCarousel,
	Text
} from '@/components/ui';

import { BreadcrumbsType } from '../../Breadcrumbs';
import TextHtml from '../../TextHtml';
import { HospitalServiceStyle } from './style';

type Props = PropsWithRef<PropsWithChildren<{
	detail: any,
	breadcrumbsPath: BreadcrumbsType['datas'],
}>>;

const HospitalServices = ({
	detail,
	breadcrumbsPath,
}: Props) => {

	const renderContent = (
		<div>
			<Text fontSize='24px' fontWeight='900' subClassName='max-sm:text-[20px] leading-normal' color={ colors.paradiso.default }>
				{ detail?.name }
			</Text>

			<div className='mt-[32px] max-sm:mt-4'>
				<CustomCarousel arrowButton>
					{ (detail?.img_url ?? [])?.map((image: string, index: any) => {
						return (
							<img
								key={ `carousel-nav-${ index }` }
								src={ image }
								alt='slider'
								className='bg-white h-[220px] sm:h-[420px] sm:w-full rounded-[5px] object-cover w-full'
							/>
						);
					}) }
				</CustomCarousel>
			</div>

			<div className='mt-[48px] max-sm:mt-4'>
				<TextHtml
					className='innerHTML'
					htmlStr={ detail?.description || '' }
				/>
			</div>
		</div>
	);

	return (
		<HospitalServiceStyle>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] pb-[60px]'>
				<div>
					<div className='content-wrapper flex flex-col'>
						<div className='mb-[50px] max-sm:mb-[25px] sm:ml-[32px]'>
							<Breadcrumbs datas={ breadcrumbsPath } />
						</div>
						<div className='rightSide sm:ml-[32px]'>
							{ renderContent }
						</div>
					</div>
				</div>
			</div>
		</HospitalServiceStyle>
	);
};

export default HospitalServices;