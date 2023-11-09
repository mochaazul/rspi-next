import { Text } from '@/components';
import { colors, Languages as lang } from '@/constant';
import parse from 'html-react-parser';

const language = lang.page.contactUs.faq;

export default [
	{
		title: language.questions.doctorSchedule,
		desc_jsx:
			<Text
				fontSize='14px'
				lineheight='22px'
				fontType={ null }
				fontWeight='400'
				color={ colors.grey.darker }
				className='mt-[15px]'
				subClassName='text-justify'
			>
				{ language.answers.doctorSchedule }
			</Text>,
		// For text search and short description
		desc: language.answers.doctorSchedule,
	},
	{
		title: language.questions.assurance,
		desc_jsx:
			<Text
				fontSize='14px'
				lineheight='22px'
				fontType={ null }
				fontWeight='400'
				color={ colors.grey.darker }
				className='mt-[15px]'
				subClassName='text-justify'
			>
				{ language.answers.assurance }
			</Text>,
		// For text search and short description
		desc: language.answers.assurance,
	},
	{
		title: language.questions.visitHours,
		desc_jsx:
			<div>
				<Text
					fontSize='14px'
					lineheight='22px'
					fontType={ null }
					fontWeight='400'
					color={ colors.grey.darker }
					className='mt-[15px]'
					subClassName='text-justify'
				>
					{ parse(language.answers.visitHours) }
				</Text>
			</div>,
		// For text search and short description
		desc: language.answers.visitHours.slice(1, 153),
	},
	{
		title: language.questions.checkUp,
		desc_jsx:
			<div>
				<Text
					fontSize='14px'
					lineheight='22px'
					fontType={ null }
					fontWeight='400'
					color={ colors.grey.darker }
					className='mt-[15px]'
					subClassName='text-justify'
				>
					{ parse(language.answers.checkUp) }
				</Text>
			</div>,
		// For text search and short description
		desc: language.answers.checkUp,
	},
	{
		title: language.questions.travelVaccine,
		desc_jsx:
			<div>
				<Text
					fontSize='14px'
					lineheight='22px'
					fontType={ null }
					fontWeight='400'
					color={ colors.grey.darker }
					className='mt-[15px]'
					subClassName='text-justify'
				>
					{ parse(language.answers.travelVaccine) }
				</Text>
			</div>,
		// For text search and short description
		desc: language.answers.travelVaccine.slice(1, 100),
	},
	{
		title: language.questions.telemedicine,
		desc_jsx:
			<div>
				<Text
					fontSize='14px'
					lineheight='22px'
					fontType={ null }
					fontWeight='400'
					color={ colors.grey.darker }
					className='mt-[15px]'
					subClassName='text-justify'
				>
					{ parse(language.answers.telemedicine) }
				</Text>
			</div>,
		// For text search and short description
		desc: language.answers.telemedicine.slice(1, 100),
	},
	{
		title: language.questions.maternity,
		desc_jsx:
			<div>
				<Text
					fontSize='14px'
					lineheight='22px'
					fontType={ null }
					fontWeight='400'
					color={ colors.grey.darker }
					className='mt-[15px]'
					subClassName='text-justify'
				>
					{ parse(language.answers.maternity) }
				</Text>
			</div>,
		// For text search and short description
		desc: language.answers.maternity,
	}
];