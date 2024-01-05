'use server';

import Link from 'next/link';

import Breadcrumbs, { BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import {
	Accordion,
	Button,
	Text
} from '@/components/ui';
import { colors } from '@/constant';
import images from '@/constant/images';
import { HospitalDetail } from '@/interface';

import { ContactUsPanel } from './style';
import FAQDatas from './FAQDatas';
import ContactUsForm from './ContactUsForm';
import { PanelH2, PanelV1 } from '../style';
import { getScopedI18n } from '@/locales/server';
import LangWrapper from '@/components/ui/LangWrapper';
import HospitalLocation from './HospitalLocation';

const ContactUsPage = async({
	hospitalSelector,
	breadcrumbsPath,
}: {
	breadcrumbsPath: BreadcrumbsType['datas'],
	hospitalSelector: HospitalDetail[],
}) => {
	const t = await getScopedI18n('page.contactUs');

	const faqDatas = await FAQDatas();

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
							<LangWrapper>
								<ContactUsForm
									hospitalSelector={ hospitalSelector }
								/>
							</LangWrapper>
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
									faq
									datas={ faqDatas.filter((_faq, index) => index < 5) }
								/>
							</div>
							<Link href={ '/contact/faq' }>
								<Button
									className='mt-5 py-4'
									theme='outline'
									$hoverTheme='primary'
									label={ t('faq.allFaqBtnLabel') }
								/>
							</Link>
						</div>
					</div>
				</PanelH2>

				<LangWrapper>
					<HospitalLocation hospitals={ hospitalSelector }/>
				</LangWrapper>
				
			</PanelV1>
		</ContactUsPanel>
	);
};

export default ContactUsPage;