'use client';
import { PropsWithChildren, PropsWithRef } from 'react';

import Image from 'next/image';

import { colors } from '@/constant';

import {
	Breadcrumbs,
	CustomCarousel,
	Text
} from '@/components/ui';

import { BreadcrumbsType } from '../../Breadcrumbs';

import { HospitalServiceStyle } from './style';
import { useGetHospitalDetail } from '@/lib/api/client/hospital';

type Props = PropsWithRef<PropsWithChildren<{
	id: string,
	breadcrumbsPath: BreadcrumbsType['datas'],
}>>;

const HospitalServices = ({
	id,
	breadcrumbsPath,
}: Props) => {
	const param = {
		param: id,
	};

	const {
		data: HospitalDetail,
	} = useGetHospitalDetail(param);

	const detail = Object.values(HospitalDetail || []);

	const renderContent = (
		<div className='mt-10'>
			<Breadcrumbs datas={ breadcrumbsPath } />

			<Text fontSize='24px' fontWeight='900' className='mt-6' color={ colors.paradiso.default }>
				{ detail?.[0]?.name }
			</Text>

			<div className='mt-4 md:mt-8 w-full'>
				<CustomCarousel arrowButton>
					{ (detail?.[0]?.img_url ?? [])?.map((image: string, index: any) => {
						return (
							<div key={ index } className='relative overflow-hidden bg-white rounded-[5px] h-[220px] sm:h-[420px] sm:w-full'>
								{ image && (
									<Image
										key={ `carousel-nav-${ index }` }
										src={ image }
										alt='slider'
										className='object-cover'
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
										fill
									/>
								) }
							</div>
						);
					}) }
				</CustomCarousel>
			</div>

			<div className='mt-[48px]'>
				<div
					style={ { lineHeight: '24px', fontSize: '16px' } }
					className='innerHTML'
					dangerouslySetInnerHTML={ { __html: detail?.[0]?.description || '' } }
				/>
			</div>
		</div>
	);

	return (
		<HospitalServiceStyle>
			<div className='lg:w-[1110px] mx-auto max-sm:mx-[15px] md:pt-[60px] pb-[60px]'>
				<div className='content-wrapper mt-[64px]'>
					<div className='rightSide sm:ml-[32px]'>
						{ renderContent }
					</div>
				</div>
			</div>
		</HospitalServiceStyle>
	);
};

export default HospitalServices;