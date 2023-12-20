'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { appStage, config } from '@/config';
import { Images, colors, icons } from '@/constant';
import {
	TextField,
	Button,
	Text,
	Socmed,
	Modal
} from '@/components/ui';

import { FooterDetail } from '@/interface/footer';
import { HospitalDetail } from '@/interface/Hospital';
import { useScopedI18n } from '@/locales/client';
import { appStoreMobileUrl, playStoreMobileUrl } from '@/constant/config';

import { useSubscribe } from '@/lib/api/client/newsletter';
import { NewsletterPayload } from '@/interface';

import FooterStyled, { FooterContainer } from './style';

const FooterLayout = ({ footerData, hospitalData }: { footerData: FooterDetail[]; hospitalData: HospitalDetail[]; }) => {
	const navigate = useRouter();

	const { trigger: subscribe } = useSubscribe();

	const t = useScopedI18n('page.footer');

	const [loading, setLoading] = useState<boolean>(false);
	const [loadingSubs, setLoadingSubs] = useState<boolean>(false);
	const [modalNewsletter, setModalNewsletter] = useState<boolean>(false);
	const [emailNewsletter, setEmailNewsletter] = useState<string>('');
	const [msgNewsletter, setMsgNewsletter] = useState<string>('');
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

	const subscribeNewsletter = () => {
		if (emailNewsletter !== '') {
			setLoadingSubs(true);
			const subscribePayload: NewsletterPayload = {
				email: decodeURIComponent(emailNewsletter),
			};
			subscribe(subscribePayload).then(res => {
				setModalNewsletter(true);
				setMsgNewsletter(res?.stat_msg ?? '');
				setEmailNewsletter('');
				setLoadingSubs(false);
			});
		} else {
			setModalNewsletter(true);
			setMsgNewsletter('error');
		}

	};

	const renderItems = (items: FooterDetail[]) => {
		return (
			<div className='flex flex-col gap-y-3 sm:gap-y-4'>
				{
					items.map((item, index) => {
						return (
							<Link key={ index } href={ `/${ item.slug }` }>
								<Text
									fontSize='14px'
									fontWeight='700'
									className='flex'
									subClassName='max-sm:text-xs hover:text-[#667085] cursor-pointer capitalize'
								>{ item.title }</Text>
							</Link>
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
							<Link key={ index } href={ `/hospital/${ item.slug }` }>
								<Text
									fontSize='14px'
									fontWeight='700'
									className='flex'
									subClassName='max-sm:text-xs hover:text-[#667085] cursor-pointer capitalize'
								>{ item.name }</Text>
							</Link>
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
				className='mb-4 max-sm:text-xs font-bold sm:font-normal max-sm:uppercase'
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
		<FooterStyled className='container-page py-8 sm:py-16'>
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
							<Link
								href={ playStoreMobileUrl }
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image src={ Images.GooglePlay.src } alt='google play icon' width={ 120 } height={ 37 } className='store-images' />
							</Link>
							<Link
								href={ appStoreMobileUrl }
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image src={ Images.AppStore.src } alt='app store icon' width={ 120 } height={ 37 } className='store-images' />
							</Link>
						</div>
					</div>
				</div>
				<div className='email-sub-container'>
					{ renderCategoryTitle(t('subscribeLabel')) }
					<Text fontSize='14px' className='sub-text'>{ t('subscribeDescription') }</Text>
					<div className='flex items-center mt-4 lg:mt-6'>
						<div className='w-full -mr-2 flex'>
							<TextField
								width='100%'
								placeholder={ t('subscribePlaceholder') }
								className='text-sm sm:text-base !h-11 !w-full'
								value={ emailNewsletter }
								onChange={ e => setEmailNewsletter(e.target.value) }
							/>
						</div>
						<Button
							className={ ` ${ loadingSubs ? '!bg-gray-50 !text-gray-300 cursor-not-allowed' : '' } sub-button color-default !text-base !font-bold !h-[48px]` }
							theme='secondary'
							label={ t('subscribeSubmit') }
							onClick={ subscribeNewsletter }
							disabled={ loadingSubs }
						/>
					</div>
				</div>
			</FooterContainer>
			<div className='flex flex-col items-center max-sm:pb-8 pt-8 sm:pt-16'>
				<Text textAlign='center' fontSize='14px' color={ colors.grey.dark }>Copyright © { date.getFullYear() } RS Pondok Indah Group. <span className='sm:hidden'><br /></span>All Rights Reserved.</Text>
				{
					appStage !== 'prod' &&
					<div className='flex justify-center'>
						<Text textAlign='center' fontSize='14px' color={ colors.grey.dark }> Version { config?.version } </Text>
					</div>
				}
			</div>
			<Modal
				visible={ modalNewsletter }
				onClose={ () => setModalNewsletter(false) }
				width='560px'
			>
				<div className='relative flex flex-col items-center'>
					{ msgNewsletter === 'Success' ? <icons.Confirmed /> : <div className='p-4 bg-gray-200 rounded-full'><icons.Close /></div> }
					<Text
						fontSize='23px'
						lineHeight='19px'
						fontType='h4'
						fontWeight='900'
						color={ colors.grey.darker }
						text={ msgNewsletter === 'Success' ? t('successSubs') : t('errorSubs') }
						className='mt-5'
					/>
					<Button type='submit' label={ t('handleButtonModalSubmit') } className='mt-[32px]' onClick={ () => setModalNewsletter(false) } />
				</div>
			</Modal>
		</FooterStyled>
	);

};

export default React.memo(FooterLayout);