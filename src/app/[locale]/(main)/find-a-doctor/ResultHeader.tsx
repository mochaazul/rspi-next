'use client';
import Form from '@/components/ui/Form';
import Text from '@/components/ui/Text';
import { colors } from '@/constant';
import { useScopedI18n } from '@/locales/client';
import { useEffect, useState } from 'react';

type Props = {
  doctorCount:number
	setter: (value: string) => void,
	getter: () => string | null,
	reset: boolean,
}
const ResultHeader = ({ doctorCount, setter, getter, reset }:Props) => {

	const [keywordValue, setKeywordValue] = useState<string>();

	const t = useScopedI18n('page.findDoctor');
	
	useEffect(() => {
		
		if (reset) {
			setKeywordValue('');
		} else {
			setKeywordValue(getter() ?? '');
		}
			
	}, [reset]);

	const onSearchDoctorByName = (value: string) => {
		setKeywordValue(value);
		setter(value);
	};

	return (
		<>
			{ /* Doctor found counter */ }
			<Text
				fontSize='20px'
				fontWeight='700'
				lineHeight='24px'
				className='mb-6 max-sm:hidden'
				text={ `${doctorCount} ${t('label.doctorFound')}` }
			/>
			{ /* Cari Dokter - title - Mobile */ }
			<Text
				fontType='h2'
				fontSize='20px'
				lineHeight='24px'
				fontWeight='700'
				className='mb-6 sm:hidden'
				color={ colors.grey.darker }
				text={ t('heading') }
			/>
			{ /* Input nama  dokter */ }
			<Form.TextField
				placeholder={ t('label.doctorName') }
				featherIcon='Search'
				iconPosition='right'
				onChange={ ({ target }) => onSearchDoctorByName(target.value) }
				$iconColor={ colors.grey.light }
				value={ keywordValue }
			/>
      
		</>
	);
};

export default ResultHeader;