import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { appStage, config } from '@/config';
import { Images, colors } from '@/constant';
import {
	Text,
	Socmed,
} from '@/components/ui';

import { FooterDetail } from '@/interface/footer';
import { HospitalDetail } from '@/interface/Hospital';
import { appStoreMobileUrl, playStoreMobileUrl } from '@/constant/config';

import FooterStyled, { FooterContainer } from './style';
import _ from 'lodash';
import NewsLetter from './Newsletter';
import LangWrapper from '@/components/ui/LangWrapper';
import { getScopedI18n } from '@/locales/server';

const FooterLayout = async({ footerData, hospitalData }: { footerData: FooterDetail[]; hospitalData: HospitalDetail[]; }) => {
	const footers = _.groupBy(footerData, 'footer_category');

	const t = await getScopedI18n('page.footer');

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
									subClassName='max-sm:text-sm hover:text-[#667085] cursor-pointer capitalize'
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
									subClassName='max-sm:text-sm hover:text-[#667085] cursor-pointer capitalize'
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
				className='mb-4'
				subClassName='max-sm:text-sm text-[14px] uppercase font-normal leading-normal'
			>{ text }</Text>
		);
	};

	const renderFooterHospital = (data: HospitalDetail[], title: string) => {
	
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

	const mapLabel = (key: string) => {
		if (key === 'visitor-and-patient-info') {
			return t('visitorPatientLabel');
		}
		if (key === 'our-company') {
			return t('ourCompanyLabel');
		}
		return '';
	};

	const renderFooterCategories = () => {
		return Object.keys(footers).reverse()
			.map(key => {
				const label = mapLabel(key);
				return  (
					<div key={ key }>
						{ renderCategoryTitle(label) }
						{ renderCategoryItems(footers[key]) }
					</div>
				);
			});
	};

	return (
		<FooterStyled className='container-page py-8 sm:py-16'>
			<FooterContainer>
				{ renderFooterHospital(hospitalData ?? [], t('ourHospitalsLabel')) }
				
				{ renderFooterCategories() }

				<div className='follow-section flex flex-col max-sm:flex-row-reverse gap-4 sm:gap-8'>
					<div className='follow-icon-section'>
						{ renderCategoryTitle(t('followUsLabel')) }
						<div className='max-sm:-mt-[10px]'>
							<Socmed />
						</div>
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
					<Text fontSize='14px' className='sub-text' subClassName='leading-[21px] max-sm:text-[12px] max-sm:leading-[18px] font-normal'>{ t('subscribeDescription') }</Text>
					<LangWrapper>
						<NewsLetter/>
					</LangWrapper>
				</div>
			</FooterContainer>
			<div className='flex flex-col items-center max-sm:pb-8 pt-8 sm:pt-16'>
				<Text
					textAlign='center'
					fontSize='16px'
					fontWeight='400'
					subClassName='leading-normal max-sm:leading-[18px] max-sm:text-[14px] text-gray-2'
				>Copyright © { date.getFullYear() } RS Pondok Indah Group.
					<span className='sm:hidden'><br /></span> All Rights Reserved.
				</Text>
				{
					appStage !== 'production' &&
					<div className='flex justify-center'>
						<Text
							textAlign='center'
							fontSize='16px'
							fontWeight='400'
							subClassName='leading-normal  max-sm:text-[14px] text-gray-2'
							color={ colors.grey.dark }> Version { config?.version } </Text>
					</div>
				}
			</div>
			
		</FooterStyled>
	);

};

export default React.memo(FooterLayout);