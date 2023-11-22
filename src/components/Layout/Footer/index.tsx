'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { appStage, config } from '@/config';
import { Images, colors } from '@/constant';
import {
	TextField,
	Button,
	Text,
	Socmed
} from '@/components/ui';
import {
	FooterDetail
} from '@/interface/footer';
import { useScopedI18n } from '@/locales/client';

import FooterStyled, { FooterContainer } from './style';
import { HospitalDetail, HospitalState } from '@/interface/Hospital';

const FooterLayout = ({ footerData, hospitalData }: { footerData: FooterDetail[]; hospitalData: HospitalState; }) => {
	const navigate = useRouter();

	const t = useScopedI18n('page.footer');

	// const { loading, footerList } = useTypedSelector<FooterState>('footerSlice'); // TODO: migrate
	// const fetchFooter = useAppDispatch(getFooterSlug); // TODO: migrate

	const [loading, setLoading] = useState<boolean>(false);
	const [ourHospital, setOurHospital] = useState<HospitalDetail[]>([]);
	const [ourCompany, setOurCompany] = useState<FooterDetail[]>([]);
	const [privacyPolicy, setPrivacyPolicy] = useState<FooterDetail[]>([]);
	const [pages, setPages] = useState<FooterDetail[]>([]);

	useEffect(() => {
		setOurHospital([]);
		setOurCompany([]);
		setPrivacyPolicy([]);
		setPages([]);
		setLoading(true);
		Object.values(footerData || [])?.forEach(item => {
			switch (item?.footer_category) {
				case 'our-company':
					setOurCompany(ourCompany => [...ourCompany, item]);
					setLoading(false);
					break;
				case 'pages':
					setPages(pages => [...pages, item]);
					setLoading(false);
					break;
				default:
					setLoading(false);
					break;
			}
		});
		setOurHospital(Object.values(hospitalData || []));
	}, []);

	// End migrate

	const renderItems = (items: FooterDetail[]) => {
		return (
			<div className='flex flex-col gap-y-3 sm:gap-y-4'>
				{
					items.map((item, index) => {
						return (
							<Text
								key={ index }
								fontSize='14px'
								fontWeight='700'
								className='flex'
								subClassName='max-sm:text-xs hover:text-[#667085] cursor-pointer'
								onClick={ () => navigate.push(`/footer/${ item.slug }`) }
							>{ item.title }</Text>
						);
					})
				}
			</div>
		);
	};

	const renderItemsHospital = (items: HospitalDetail[]) => {
		return (
			<div className='flex flex-col gap-y-3 sm:gap-y-4'>
				{
					items.map((item, index) => {
						return (
							<Text
								key={ index }
								fontSize='14px'
								fontWeight='700'
								className='flex'
								subClassName='max-sm:text-xs hover:text-[#667085] cursor-pointer'
								onClick={ () => navigate.push(`/hospital/${ item.id }`) }
							>{ item.name }</Text>
						);
					})
				}
			</div>
		);
	};

	const date = new Date();

	const renderCategoryItems = (items: FooterDetail[]) => {
		if (items.length > 4) {
			const leftItems = items.slice(0, Math.ceil(items.length / 2));
			const rightItems = items.slice(Math.ceil(items.length / 2));

			return (
				<div className='grid md:grid-cols-2 md:gap-x-4 gap-y-3 sm:gap-y-4'>
					{ renderItems(leftItems) }
					{ renderItems(rightItems) }
				</div>
			);
		}

		return renderItems(items);
	};

	const renderHospitalItems = (items: HospitalDetail[]) => {
		if (items.length > 4) {
			const leftItems = items.slice(0, Math.ceil(items.length / 2));
			const rightItems = items.slice(Math.ceil(items.length / 2));

			return (
				<div className='grid md:grid-cols-2 md:gap-x-4 gap-y-3 sm:gap-y-4'>
					{ renderItemsHospital(leftItems) }
					{ renderItemsHospital(rightItems) }
				</div>
			);
		}

		return renderItemsHospital(items);
	};

	const renderCategoryTitle = (text: string) => {
		return (
			<Text
				fontSize='14px'
				color={ colors.paradiso.default }
				className='mb-4 max-sm:text-xs font-bold sm:font-normal'
			>{ text }</Text>
		);
	};

	const renderFooterHospital = (data: HospitalDetail[], title: string) => {
		if (loading && !data?.length) {
			return (
				<div className='w-2/5 sm:w-[200px] lg:w-1/6'>
					<div className='animate-pulse flex w-full'>
						<div className='flex-1 space-y-6 py-1'>
							<div className='h-2 bg-slate-200 rounded' />
							<div className='space-y-3'>
								{ Array.from(Array(4).keys()).map(idx => (
									<div key={ idx } className='h-2 bg-slate-200 rounded' />
								)) }
							</div>
						</div>
					</div>
				</div>
			);
		}

		if (data?.length) {
			return (
				<div>
					{ renderCategoryTitle(title) }
					{ renderHospitalItems(data) }
				</div>
			);
		}

		return null;
	};

	const renderFooterCategory = (data: FooterDetail[], title: string) => {
		if (loading && !data?.length) {
			return (
				<div className='w-2/5 sm:w-[200px] lg:w-1/6'>
					<div className='animate-pulse flex w-full'>
						<div className='flex-1 space-y-6 py-1'>
							<div className='h-2 bg-slate-200 rounded' />
							<div className='space-y-3'>
								{ Array.from(Array(4).keys()).map(idx => (
									<div key={ idx } className='h-2 bg-slate-200 rounded' />
								)) }
							</div>
						</div>
					</div>
				</div>
			);
		}

		if (data?.length) {
			return (
				<div>
					{ renderCategoryTitle(title) }
					{ renderCategoryItems(data) }
				</div>
			);
		}

		return null;
	};

	return (
		<FooterStyled className='px-4 xl:px-10 py-8 sm:py-16'>
			<FooterContainer>
				{ renderFooterHospital(ourHospital ?? [], t('ourHospitalsLabel')) }
				{ renderFooterCategory(ourCompany ?? [], t('ourCompanyLabel')) }
				{ renderFooterCategory(pages ?? [], t('visitorPatientLabel')) }

				<div className='follow-section flex flex-col max-sm:flex-row-reverse gap-4 sm:gap-8'>
					<div className='follow-icon-section'>
						{ renderCategoryTitle(t('followUsLabel')) }
						<Socmed />
					</div>
					<div>
						{ renderCategoryTitle(t('getRSPIMobileLabel')) }
						<div className='store-images-container'>
							<a href='https://play.google.com/store/apps/details?id=id.co.rspondokindah&hl=id' target='blank' rel='norel norefferer'><img src={ Images.GooglePlay.src } alt='google play icon' className='store-images' /></a>
							<a href='https://apps.apple.com/id/app/rspi-mobile/id1181707029?l=id' target='blank' rel='norel norefferer'><img src={ Images.AppStore.src } alt='app store icon' className='store-images' /></a>
						</div>
					</div>
				</div>
				<div className='email-sub-container'>
					{ renderCategoryTitle(t('subscribeLabel')) }
					<Text fontSize='14px' className='sub-text'>{ t('subscribeDescription') }</Text>
					<div className='email-sub-form-container mt-4 lg:mt-6'>
						<TextField
							width='100%'
							placeholder='Enter your email address'
							className='text-sm sm:text-base'
						/>
						<Button
							className='sub-button color-default text-sm sm:text-base font-black sm:font-bold'
							theme='secondary'
							label='Subscribe'
						/>
					</div>
				</div>
			</FooterContainer>
			<div className='flex flex-col items-center max-sm:pb-8 pt-8 sm:pt-16'>
				<Text textAlign='center' fontSize='14px' color={ colors.grey.dark }>Copyright © { date.getFullYear() } RS Pondok Indah Group. <span className='sm:hidden'><br /></span>All Rights Reserved.</Text>
				{
					appStage !== 'prod' &&
					<div className='flex justify-center'>
						<Text textAlign='center' fontSize='14px' color={ colors.grey.dark }> Version { config.version } - { appStage.toUpperCase() }</Text>
					</div>
				}
			</div>
		</FooterStyled>
	);

};

export default React.memo(FooterLayout);