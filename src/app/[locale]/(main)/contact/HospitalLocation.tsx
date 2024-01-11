'use client';
import { Button, CustomCarousel, Text } from '@/components/ui';
import { HospitalDetail } from '@/interface';
import Link from 'next/link';
import { PropsWithChildren, PropsWithRef, useEffect, useState } from 'react';
import { PanelH2 } from '../style';
import { colors } from '@/constant';
import SelectRSLocation from './SelectRSLocation';
import { useScopedI18n } from '@/locales/client';

type Props = PropsWithRef<PropsWithChildren<{
	hospitals: HospitalDetail[];
}>>;

const HospitalLocation = ({ hospitals }: Props) => {
	const t = useScopedI18n('page.contactUs');

	const handleRSLocationChange = (id: number) => {
		setSelectedMapIndex(id);
	};

	const handleRSCarouselChange = (index: number) => {
		handleRSLocationChange(Object.values(hospitals || [])[index]?.id ?? 0);
	};

	const [selectedMapIndex, setSelectedMapIndex] = useState<number>(0);

	useEffect(() => {
		if (Object.values(hospitals || []).length > 0) {
			setSelectedMapIndex(Object.values(hospitals || [])[0]?.id ?? 0);
		}
	}, [hospitals]);

	const handleOpenMapLink = (link: string) => () => {
		if (typeof window !== 'undefined') {
			window.open(link, '_blank');
		}
	};

	const renderTooltip = (data: HospitalDetail[]) => {
		return (
			<div className='max-sm:hidden flex flex-col gap-y-4 absolute block max-w-sm p-4 m-2 bg-white rounded-lg shadow'>
				<div className='flex flex-row gap-x-5'>
					<img src={ data?.[0]?.img_url?.[0] ?? '' } alt={ data?.[0]?.name ?? '' } className='w-[80px] h-[80px] rounded-md object-cover' />
					<div className='flex flex-col'>
						<p
							className='text-base font-black'>
							{ data?.[0]?.name }
						</p>
						<p
							className='text-sm font-normal'>
							{ data?.[0]?.address }
						</p>
					</div>
				</div>
				<div className='flex flex-row gap-x-2'>
					<a target='_blank' href={ data?.[0]?.share_link } rel='noopener noreferrer'>
						<Button theme='outline' $hoverTheme='primary' label={ 'See Direction' } className='px-[40px] py-[12px] text-[16px]' />
					</a>
					<Link href={ `/find-a-doctor?hospital_code=${ data[0]?.hospital_code }` }>
						<Button theme='primary' $hoverTheme='primary' label={ 'Find Doctor' } className='px-[40px] py-[12px] text-[16px]' />
					</Link>
				</div>

			</div>
		);
	};

	const getEmbedLink = () => {
		const embedLink = Object.values(hospitals || [])?.find(data => selectedMapIndex === data.id)?.embed_link;
		if (!embedLink) {
			return Object.values(hospitals || [])[0]?.embed_link ?? '';
		}
		return embedLink.replace(/['"]+/g, '');
	};
	return (
		<section>
			<PanelH2>
				<div className='sm:mt-28 mt-12'>
					<h3 className='text-[24px] max-sm:text-[22px] font-black text-center text-gray-1'>
						{ t('location.heading') }
					</h3>
					<p className='font-normal text-[16px] max-sm:text-[14px] leading-[23px] mt-3 mx-auto text-center sm:w-[630px] w-full text-gray-2'>
						{ t('location.subHeading') }
					</p>
				</div>
			</PanelH2>

			<div className={ 'sm:mt-20 sm:pb-5 pb-10 mt-8 flex sm:flex-row flex-col' }>
				<div className='max-sm:hidden'>
					{
						Object.values(hospitals || [])?.map((data, index) => (
							<SelectRSLocation
								key={ index }
								id={ data.id ?? 0 }
								title={ data.name ?? '' }
								mapString={ data.embed_link ?? '' }
								imgThumb={ data.img_url?.[0] ?? '' }
								address={ data.address ?? '' }
								phone={ data.phone ?? '' }
								isActive={ selectedMapIndex === data.id }
								onClick={ handleRSLocationChange }
							/>
						))
					}
				</div>
				<div className='flex-1 max-sm:mx-4 max-sm:rounded-[10px] max-sm:bg-white overflow-hidden min-h-[600px]'>
					{
						renderTooltip(Object.values(hospitals || [])?.filter(data => data.id === selectedMapIndex))
					}
					<iframe
						src={ getEmbedLink() }
						className='border-0 w-full h-full max-sm:min-h-[500px]'
						allowFullScreen={ false }
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade' />
				</div>
				<div className='sm:hidden relative mt-[-250px] mx-4 card-hospital-swap'>
					<div className='global-shadow relative'>
						<CustomCarousel
							containerClassName='rounded-[10px]'
							autoplay={ false }
							arrowButton={ true }
							onChangeIndex={ handleRSCarouselChange }>
							{
								Object.values(hospitals || [])?.map((data, index) => (
									<div key={ index } className='rounded-[10px] bg-white overflow-hidden'>
										<SelectRSLocation
											id={ data.id ?? 0 }
											title={ data.name ?? '' }
											mapString={ data.embed_link ?? '' }
											mapURL={ data.share_link ?? '' }
											imgThumb={ data.img_url?.[0] ?? '' }
											address={ data.address ?? '' }
											phone={ data.phone ?? '' }
											isActive={ selectedMapIndex === data.id }
											onClick={ handleRSLocationChange }
										/>
									</div>
								))
							}
						</CustomCarousel>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HospitalLocation;