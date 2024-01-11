'use server';
import parse from 'html-react-parser';

import { Text } from '@/components/ui';
import { colors } from '@/constant';
import { getScopedI18n } from '@/locales/server';

const FAQDatas = async() => {
	const t = await getScopedI18n('page.contactUs');
	return [
		{
			title: t('faq.questions.doctorSchedule'),
			desc_jsx:
			<div
				className='text-[14px] font-Lato text-gray-1 leading-[22px] mt-[15px]'
				dangerouslySetInnerHTML={ { __html: t('faq.answers.doctorSchedule') } }
			/>,
			desc: t('faq.answers.doctorSchedule'),
		},
		{
			title: t('faq.questions.assurance'),
			desc_jsx:
			<div
				className='text-[14px] font-Lato text-gray-1 leading-[22px] mt-[15px]'
				dangerouslySetInnerHTML={ { __html: t('faq.answers.assurance') } }
			/>,
			desc: t('faq.answers.assurance'),
		},
		{
			title: t('faq.questions.visitHours'),
			desc_jsx:
			<div
				className='text-[14px] font-Lato text-gray-1 leading-[22px] mt-[15px]'
				dangerouslySetInnerHTML={ { __html: t('faq.answers.visitHours') } }
			/>,
			desc: t('faq.answers.visitHours').slice(1, 153),
		},
		{
			title: t('faq.questions.checkUp'),
			desc_jsx:
			<div
				className='text-[14px] font-Lato text-gray-1 leading-[22px] mt-[15px]'
				dangerouslySetInnerHTML={ { __html: t('faq.answers.checkUp') } }
			/>,
			// For text search and short description
			desc: t('faq.answers.checkUp'),
		},
		{
			title: t('faq.questions.travelVaccine'),
			desc_jsx:
			<div
				className='text-[14px] font-Lato text-gray-1 leading-[22px] mt-[15px]'
				dangerouslySetInnerHTML={ { __html: t('faq.answers.travelVaccine') } }
			/>,
			// For text search and short description
			desc: t('faq.answers.travelVaccine').slice(1, 100),
		},
		{
			title: t('faq.questions.telemedicine'),
			desc_jsx:
			<div
				className='text-[14px] font-Lato text-gray-1 leading-[22px] mt-[15px]'
				dangerouslySetInnerHTML={ { __html: t('faq.answers.telemedicine') } }
			/>,
			// For text search and short description
			desc: t('faq.answers.telemedicine').slice(1, 100),
		},
		{
			title: t('faq.questions.maternity'),
			desc_jsx:
			<div
				className='text-[14px] font-Lato text-gray-1 leading-[22px] mt-[15px]'
				dangerouslySetInnerHTML={ { __html: t('faq.answers.maternity') } }
			/>,
			// For text search and short description
			desc: t('faq.answers.maternity'),
		},
		{
			title: t('faq.questions.homeVisit'),
			desc_jsx:
			<div
				className='text-[14px] font-Lato text-gray-1 leading-[22px] mt-[15px]'
				dangerouslySetInnerHTML={ { __html: t('faq.answers.homeVisit') } }
			/>,
			// For text search and short description
			desc: t('faq.answers.homeVisit'),
		}
	];
};

export default FAQDatas;
