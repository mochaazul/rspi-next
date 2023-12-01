'use client';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';

import { icons } from '@/constant';
import { useCurrentLocale } from '@/locales/client';

import { IconWrapper, InputType, DateFieldWrapper } from './style';

import 'moment/locale/id';

import withInputLabel from '../withInputLabel';

/**
 * @desc Untuk sekarang baru mengakomodir pemilihan single date, untuk range belum bisa
 * @param param0 Inputype
 * @returns JSX
 */
const DateField = ({ onIconClick, iconClassName, ...props }: InputType) => {
	const currentLang = useCurrentLocale();

	const Icons = props.iconName ? icons[props.iconName] : null;

	const onChange = (value: DateValueType) => {
		props.onChangeValue?.({ name: props.name, value: value?.startDate?.toString() });
	};

	return (
		<DateFieldWrapper $iconPosition={ props.iconPosition } $iconName={ props.iconName } className='w-full'>
			{
				props.iconName ?
					<IconWrapper className={ `iconWrapper ${ onIconClick && 'cursor-pointer' }` } onClick={ onIconClick }>
						<Icons className={ iconClassName } />
					</IconWrapper> :
					null
			}
			<Datepicker
				{ ...props }
				inputClassName='rounded-[5px] w-full tracking-normal focus:ring-0 focus:border-0 text-[16px]'
				asSingle={ true }
				useRange={ false }
				i18n={ currentLang }
				primaryColor='green'
				displayFormat={ props.dateFormat }
				maxDate={ props.applyMaxDateForDoB ? new Date() : null }
				minDate = { props.enableMinDateNow ? new Date() : null }
				value={ { startDate: props.value ? new Date(props.value ?? '') : null, endDate: props.value ? new Date(props.value ?? '') : null } }
				onChange={ onChange }
				placeholder={ props?.placeholder ?? 'Choose Preferred Day' }
				readOnly
			/>
		</DateFieldWrapper>
	);
};

export default withInputLabel(DateField);