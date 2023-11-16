'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
	PanelH1,
	PanelH2,
	PanelH3,
	PanelH4,
	PanelV1
} from '@/app/[locale]/(main)/layout';
import {
	Accordion,
	Breadcrumbs,
	Form,
	Layout,
	Text
} from '@/components/ui';

import { colors } from '@/constant';
import FAQDatas from '../FAQDatas';

import { FAQStyle } from './style';
import languages from '@/constant/languages';

const { heading, subHeading } = languages.page.contactUs.faq;

const FAQPage = () => {
	const params = useParams();
	const breadCrumbsPath = [
		{ name: 'Contact Us', url: '/contact-us' },
		{ name: 'Frequently Asked Questions', url: '/contact-us/faq' }
	];

	if (params.id) {
		breadCrumbsPath.push({ name: FAQDatas[parseInt(params.id)].title, url: '#' });
	}

	const [searchValue, setSearchValue] = useState<string>('');

	const handleSearchFAQ = () => FAQDatas.filter(faq => {
		const regex = new RegExp(`(.*?(${ searchValue })[^$]*)`, 'gim');
		return [
			regex.test(faq.title),
			regex.test(faq.desc)
		].indexOf(true) >= 0;
	});

	return (
		<FAQStyle>
			<PanelV1>
				<PanelH1>
					<Breadcrumbs datas={ breadCrumbsPath } />
				</PanelH1>
				<PanelH4>
					<div className='sm:mt-[50px] mt-[25px]'>
						<Text
							fontType='h1'
							fontSize='24px'
							lineHeight='29px'
							fontWeight='900'
							textAlign='center'
							color={ colors.grey.darker }
							text='Frequently Asked Questions'
							subClassName='max-sm:text-left text-[24px]'
						/>
						<Text
							fontSize='16px'
							lineHeight='20px'
							fontWeight='400'
							textAlign='center'
							color={ colors.grey.dark }
							text={ subHeading }
							className='mt-2'
							subClassName='max-sm:text-left'
						/>
					</div>
					<div className='mt-6 mx-auto md:w-[600px] w-full'>
						<Form.TextField
							placeholder='Search'
							featherIcon='Search'
							iconPosition='left'
							className='sm:py-4 py-3'
							onChange={ ev => setSearchValue(ev.target.value) }
						/>
					</div>
					<div className='sm:pt-[50px] pt-7 pb-[84px] sm:gap-[32px] gap-6'>
						<Accordion
							openedIndex={ parseInt(params.id ?? '0') }
							itemTheme={ props => <Accordion.ItemFAQ isJSXDesc={ true } { ...props } /> }
							datas={ searchValue !== '' ? handleSearchFAQ() : FAQDatas }
						/>
					</div>
				</PanelH4>
			</PanelV1>
		</FAQStyle>
	);
};

export default FAQPage;