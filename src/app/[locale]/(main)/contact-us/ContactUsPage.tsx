'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { BreadcrumbsType } from '@/components/ui/Breadcrumbs';

import {
	Accordion,
	Breadcrumbs,
	Button,
	CustomCarousel,
	Text
} from '@/components/ui';
import { colors } from '@/constant';
import images from '@/constant/images';
import { HospitalDetail, HospitalState } from '@/interface';
import { useScopedI18n } from '@/locales/client';

import { ContactUsPanel } from './style';
import SelectRSLocation from './SelectRSLocation';
import FAQDatas from './FAQDatas';
import ContactUsForm from './ContactUsForm';
import { PanelH2, PanelV1 } from '../style';

const ContactUsPage = ({
	hospitalSelector,
	breadcrumbsPath,
}: {
	breadcrumbsPath: BreadcrumbsType['datas'],
	hospitalSelector: HospitalDetail[],
}) => {
	const t = useScopedI18n('page.contactUs');

	const navigate = useRouter();
	// const hospitalSelector = useTypedSelector<HospitalState>('hospital');

	const handleRSLocationChange = (id: number) => {
		setSelectedMapIndex(id);
	};

	const handleRSCarouselChange = (index: number) => {
		handleRSLocationChange(Object.values(hospitalSelector || [])[index]?.id ?? 0);
	};

	const [selectedMapIndex, setSelectedMapIndex] = useState<number>(0);

	useEffect(() => {
		if (Object.values(hospitalSelector || []).length > 0) {
			setSelectedMapIndex(Object.values(hospitalSelector || [])[0]?.id ?? 0);
		}
	}, [hospitalSelector]);

	const handleOpenMapLink = (link: string) => () => {
		if (typeof window !== 'undefined') {
			window.open(link, '_blank');
		}
	};

	const renderTooltip = (data: HospitalDetail[]) => {
		return (
			<div className='flex flex-col gap-y-4 absolute block max-w-sm p-4 m-2 bg-white rounded-lg shadow'>
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
					<Button theme='outline' $hoverTheme='outline' label={ 'See Direction' } onClick={ handleOpenMapLink(data?.[0]?.share_link ?? '') } />
					<Button theme='primary' $hoverTheme='primary' label={ 'Find Doctor' } onClick={ () => navigate.push(`/find-a-doctor?hospital_code=${ data[0].hospital_code }`) } />
				</div>

			</div>
		);
	};

	const getEmbedLink = () => {
		const embedLink = Object.values(hospitalSelector || [])?.find(data => selectedMapIndex === data.id)?.embed_link;
		if (!embedLink) {
			return Object.values(hospitalSelector || [])[0]?.embed_link ?? '';
		}
		return embedLink;
	};

	return (
		<ContactUsPanel>
			<PanelV1>
				<PanelH2>
					<Breadcrumbs datas={ breadcrumbsPath } />
					<div className='sm:mt-12 mt-4'>
						<Text
							fontType='h1'
							fontSize='24px'
							fontWeight='900'
							lineHeight='29px'
							color={ colors.grey.darker }
							text={ t('heading') }
							subClassName='text-[24px]'
						/>
						<Text
							fontSize='16px'
							fontWeight='400'
							lineHeight='19px'
							color={ colors.grey.dark }
							text={ t('subHeading') }
							className='mt-[10px]'
						/>
					</div>
				</PanelH2>

				<div className='mt-[25px]'>
					<img src={ images.ContactUsBg.src }
						alt='Contact Us hero image'
						className='w-full' />
				</div>

				<PanelH2>
					<div className='flex sm:flex-row flex-col sm:gap-20 gap-8 sm:mt-[50px] mt-[44px]'>
						<div className='flex-1'>
							<Text
								fontSize='24px'
								fontWeight='900'
								lineHeight='29px'
								textAlign='center'
								color={ colors.grey.darker }
								text={ t('contactForm.heading') }
								className='sm:block hidden'
							/>
							<Text
								fontSize='16px'
								fontWeight='400'
								lineHeight='23px'
								textAlign='center'
								color={ colors.grey.dark }
								text={ t('contactForm.subHeading') }
								className='mt-3'
								subClassName='max-sm:text-left'
							/>
							<ContactUsForm
								hospitalSelector={ hospitalSelector }
							/>
						</div>
						<div className='sm:border-r-[1px] border-b-[1px]' />
						<div className='flex-1'>
							<Text
								fontSize='24px'
								fontType='h3'
								fontWeight='900'
								lineHeight='29px'
								textAlign='center'
								color={ colors.grey.darker }
								text={ t('faq.heading') }
							/>
							<Text
								fontSize='16px'
								fontWeight='400'
								lineHeight='23px'
								textAlign='center'
								color={ colors.grey.dark }
								text={ t('faq.subHeading') }
								className='mt-3'
							/>
							<div className='mt-10'>
								<Accordion
									itemTheme={ props => <Accordion.ItemFAQ { ...props } readMore={ true } /> }
									datas={ FAQDatas().filter((_faq, index) => index < 5) }
								/>
							</div>
							<Button
								className='mt-5 py-4'
								theme='outline'
								$hoverTheme='primary'
								label={ t('faq.allFaqBtnLabel') }
								onClick={ () => navigate.push('/contact-us/faq') }
							/>
						</div>
					</div>
				</PanelH2>

				<PanelH2>
					<div className='sm:mt-28 mt-12'>
						<Text
							fontSize='24px'
							fontType='h3'
							fontWeight='900'
							lineHeight='29px'
							textAlign='center'
							color={ colors.grey.darker }
							text={ t('location.heading') }
							className='text-center'
						/>
						<Text
							fontSize='16px'
							fontWeight='400'
							lineHeight='23px'
							textAlign='center'
							color={ colors.grey.dark }
							text={ t('location.subHeading') }
							className='mt-3 mx-auto text-center sm:w-[630px] w-full'
						/>
					</div>
				</PanelH2>

				<div className={ 'sm:mt-20 sm:pb-5 pb-10 mt-8 flex sm:flex-row flex-col' }>
					<div className='max-sm:hidden'>
						{
							Object.values(hospitalSelector || [])?.map((data, index) => (
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
							renderTooltip(Object.values(hospitalSelector || [])?.filter(data => data.id === selectedMapIndex))
						}
						<iframe
							src={ getEmbedLink() }
							className='border-0 w-full h-full max-sm:min-h-[500px]'
							allowFullScreen={ false }
							loading='lazy'
							referrerPolicy='no-referrer-when-downgrade' />
					</div>
					<div className='sm:hidden relative mt-[-50px] mx-4'>
						<div className='global-shadow relative'>
							<CustomCarousel autoplay={ false } onChangeIndex={ handleRSCarouselChange }>
								{
									Object.values(hospitalSelector || [])?.map((data, index) => (
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
			</PanelV1>
		</ContactUsPanel>
	);
};

export default ContactUsPage;