'use client';
import Form from '@/components/ui/Form';
import Text from '@/components/ui/Text';
import { colors } from '@/constant';
import { I_MasterDoctor, ResponseType } from '@/interface';
import { useScopedI18n } from '@/locales/client';
import { debounce } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { PropsWithChildren, PropsWithRef, useCallback } from 'react';

type Props = {
  doctorCount:number
	setter: (value: string) => void,
	getter: () => string | null,
}
const ResultHeader = ({ doctorCount, setter, getter }:Props) => {
  
	const t = useScopedI18n('page.findDoctor');

	const onSearchDoctorByName = (value: string) => {
		setter(value);
	};
	const debounceFilter = debounce(onSearchDoctorByName, 500);

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
				onChange={ ({ target }) => debounceFilter(target.value) }
				$iconColor={ colors.grey.light }
			/>
      
		</>
	);
};

export default ResultHeader;