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
				<Text
					fontSize='14px'
					lineHeight='22px'
					fontType={ null }
					fontWeight='400'
					color={ colors.grey.darker }
					className='mt-[15px]'
					subClassName='text-justify'
				>
					{ t('faq.answers.doctorSchedule') }
				</Text>,
			// For text search and short description
			desc: t('faq.answers.doctorSchedule'),
		},
		{
			title: t('faq.questions.assurance'),
			desc_jsx:
				<Text
					fontSize='14px'
					lineHeight='22px'
					fontType={ null }
					fontWeight='400'
					color={ colors.grey.darker }
					className='mt-[15px]'
					subClassName='text-justify'
				>
					{ t('faq.answers.assurance') }
				</Text>,
			// For text search and short description
			desc: t('faq.answers.assurance'),
		},
		{
			title: t('faq.questions.visitHours'),
			desc_jsx:
				<div>
					<Text
						fontSize='14px'
						lineHeight='22px'
						fontType={ null }
						fontWeight='400'
						color={ colors.grey.darker }
						className='mt-[15px]'
						subClassName='text-justify'
					>
						{ parse(t('faq.answers.visitHours')) }
					</Text>
				</div>,
			// For text search and short description
			desc: t('faq.answers.visitHours').slice(1, 153),
		},
		{
			title: t('faq.questions.checkUp'),
			desc_jsx:
				<div>
					<Text
						fontSize='14px'
						lineHeight='22px'
						fontType={ null }
						fontWeight='400'
						color={ colors.grey.darker }
						className='mt-[15px]'
						subClassName='text-justify'
					>
						{ parse(t('faq.answers.checkUp')) }
					</Text>
				</div>,
			// For text search and short description
			desc: t('faq.answers.checkUp'),
		},
		{
			title: t('faq.questions.travelVaccine'),
			desc_jsx:
				<div>
					<Text
						fontSize='14px'
						lineHeight='22px'
						fontType={ null }
						fontWeight='400'
						color={ colors.grey.darker }
						className='mt-[15px]'
						subClassName='text-justify'
					>
						{ parse(t('faq.answers.travelVaccine')) }
					</Text>
				</div>,
			// For text search and short description
			desc: t('faq.answers.travelVaccine').slice(1, 100),
		},
		{
			title: t('faq.questions.telemedicine'),
			desc_jsx:
				<div>
					<Text
						fontSize='14px'
						lineHeight='22px'
						fontType={ null }
						fontWeight='400'
						color={ colors.grey.darker }
						className='mt-[15px]'
						subClassName='text-justify'
					>
						{ parse(t('faq.answers.telemedicine')) }
					</Text>
				</div>,
			// For text search and short description
			desc: t('faq.answers.telemedicine').slice(1, 100),
		},
		{
			title: t('faq.questions.maternity'),
			desc_jsx:
				<div>
					<Text
						fontSize='14px'
						lineHeight='22px'
						fontType={ null }
						fontWeight='400'
						color={ colors.grey.darker }
						className='mt-[15px]'
						subClassName='text-justify'
					>
						{ parse(t('faq.answers.maternity')) }
					</Text>
				</div>,
			// For text search and short description
			desc: t('faq.answers.maternity'),
		}
	];
};

export default FAQDatas;
