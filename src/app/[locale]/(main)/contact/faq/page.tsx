'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import {
	Accordion,
	Breadcrumbs,
	Form,
	Text
} from '@/components/ui';
import { colors } from '@/constant';
import { useScopedI18n } from '@/locales/client';

import FAQDatas from '../FAQDatas';
import { FAQStyle } from './style';
import { PanelH1, PanelH4 } from '../../style';

const FAQPage = () => {
	const params = useParams();

	const t = useScopedI18n('page.contactUs.faq');

	const breadCrumbsPath = [
		{ name: t('contactUsLabel'), url: '/contact' },
		{ name: t('heading'), url: '/contact/faq' }
	];

	if (params.id) {
		breadCrumbsPath.push({ name: FAQDatas()[parseInt(params.id as string)].title, url: '#' });
	}

	const [searchValue, setSearchValue] = useState<string>('');

	const handleSearchFAQ = () => FAQDatas().filter(faq => {
		const regex = new RegExp(`(.*?(${ searchValue })[^$]*)`, 'gim');
		return [
			regex.test(faq.title),
			regex.test(faq.desc)
		].indexOf(true) >= 0;
	});

	return (
		<FAQStyle>
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
						text={ t('heading') }
						subClassName='max-sm:text-left text-[24px]'
					/>
					<Text
						fontSize='16px'
						lineHeight='20px'
						fontWeight='400'
						textAlign='center'
						color={ colors.grey.dark }
						text={ t('subHeading') }
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
						openedIndex={ parseInt(params.id as string ?? '0') }
						itemTheme={ props => <Accordion.ItemFAQ isJSXDesc={ true } { ...props } /> }
						datas={ searchValue !== '' ? handleSearchFAQ() : FAQDatas() }
					/>
				</div>
			</PanelH4>
		</FAQStyle>
	);
};

export default FAQPage;