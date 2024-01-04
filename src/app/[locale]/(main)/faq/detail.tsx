'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import {
	Accordion,
	Form,
	Text
} from '@/components/ui';
import { colors } from '@/constant';
import { useScopedI18n } from '@/locales/client';

import { FAQStyle } from './style';
import { PanelH1, PanelH4, PanelV1 } from '../style';
import LangWrapper from '@/components/ui/LangWrapper';

type Props ={
  faqDatas: {
    title: string;
    desc_jsx: JSX.Element;
    desc: string;
  }[],
   breadCrumbPath: 	{ name: string, url: string }[],
   subHeading: string
}
const FaqDetail = ({ faqDatas, breadCrumbPath, subHeading }:Props) => {
	const params = useParams();

	const [searchValue, setSearchValue] = useState<string>('');

	const handleSearchFAQ = () => faqDatas.filter(faq => {
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
					{ /* <LangWrapper>
					  <BreadcrumbsClient datas={ breadCrumbsPath } />
					</LangWrapper> */ }
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
						<LangWrapper>
							<Accordion
								openedIndex={ parseInt(params.id as string ?? '0') }
								itemTheme={ props => <Accordion.ItemFAQ isJSXDesc={ true } { ...props } /> }
								datas={ searchValue !== '' ? handleSearchFAQ() : faqDatas }
							/>
						</LangWrapper>
					</div>
				</PanelH4>
			</PanelV1>
		</FAQStyle>
	);
};

export default FaqDetail;