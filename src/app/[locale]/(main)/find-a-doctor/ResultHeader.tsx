'use client';
import Form from '@/components/ui/Form';
import Text from '@/components/ui/Text';
import { colors } from '@/constant';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useScopedI18n } from '@/locales/client';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import LoadingSkeleton from '@/components/Layout/LoadingSkeleton';

type Props = {
	doctorCount: number;
	setter: (value: string) => void,
	getter: () => string | null,
	reset: boolean,
	loading: boolean
};
const ResultHeader = ({ doctorCount, setter, getter, reset, loading }: Props) => {

	const [keywordValue, setKeywordValue] = useState<string>();

	const t = useScopedI18n('page.findDoctor');
	const d = useScopedI18n('dayName.full');

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

	const Days = [
		{ key: '1', label: d('sunday'), value: 'Sunday' },
		{ key: '2', label: d('monday'), value: 'Monday' },
		{ key: '3', label: d('tuesday'), value: 'Tuesday' },
		{ key: '4', label: d('wednesday'), value: 'Wednesday' },
		{ key: '5', label: d('thursday'), value: 'Thursday' },
		{ key: '6', label: d('friday'), value: 'Friday' },
		{ key: '7', label: d('saturday'), value: 'Saturday' },
	];

	const searchParams = useSearchParams();
	const router = useRouter();
	const pathName = usePathname();

	const onChangePreferedDay = (value: string) => {
		const params = new URLSearchParams(searchParams);
		params.set('day', value);
		router.push(`${ pathName }?${ params.toString() }`, {});
	};
		 
	if (loading) return <LoadingSkeleton type='line'/>;

	return (
		<div>
			{ /* Doctor found counter */ }
			<Text
				fontSize='20px'
				fontWeight='700'
				lineHeight='24px'
				className='mb-6 max-sm:hidden'
				text={ `${ doctorCount } ${ t('label.doctorFound') }` }
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
			{
				isMobile ?
					<div className='flex flex-row gap-x-2'>
						<Form.TextField
							placeholder={ t('label.doctorName') }
							featherIcon='Search'
							iconPosition='right'
							onChange={ ({ target }) => onSearchDoctorByName(target.value) }
							$iconColor={ colors.grey.light }
							value={ keywordValue }
							className='w-[130px]'
						/>
						<Form.Dropdown
							placeholder='Select Day'
							multiple
							menuItems={ Days }
							onChangeValueDropdown={ onChangePreferedDay }
							allOptionLabel={ d('all') }
							className='w-[150px]'
						/>
					</div> :
					<Form.TextField
						placeholder={ t('label.doctorName') }
						featherIcon='Search'
						iconPosition='right'
						onChange={ ({ target }) => onSearchDoctorByName(target.value) }
						$iconColor={ colors.grey.light }
						value={ keywordValue }
					/>
			}

		</div>
	);
};

export default ResultHeader;