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
		<div>
			<Text fontSize='24px' fontWeight='900' color={ colors.paradiso.default }>
				{ detail?.[0]?.name }
			</Text>

			<div className='mt-[32px]'>
				<CustomCarousel arrowButton>
					{ (detail?.[0]?.img_url ?? [])?.map((image: string, index: any) => {
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
		</HospitalServiceStyle>
	);
};

export default HospitalServices;