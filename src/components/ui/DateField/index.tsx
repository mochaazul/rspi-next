import Datepicker from 'react-tailwindcss-datepicker';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';

import { IconWrapper, InputType, DateFieldWrapper } from './style';
import withInputLabel from '../withInputLabel';
import { icons } from '@/constant';
import Image from 'next/image';

/**
 * @desc Untuk sekarang baru mengakomodir pemilihan single date, untuk range belum bisa
 * @param param0 Inputype
 * @returns JSX
 */
const DateField = ({ onIconClick, ...props }: InputType) => {
	const Icons = props.iconName ? icons[props.iconName] : null;

	const onChange = (value: DateValueType) => {
		props.onChangeValue?.({ name: props.name, value: value?.startDate?.toString() });
	};

	return (
		<DateFieldWrapper $iconPosition={ props.iconPosition } $iconName={ props.iconName } className='w-full'>
			{
				props.iconName ?
					<IconWrapper className={ `relative w-16 h-5  iconWrapper ${ onIconClick && 'cursor-pointer' }` } onClick={ onIconClick }>
						<Image src={ Icons } alt='date-field-icon' fill/>
					</IconWrapper> :
					null
			}
			<Datepicker
				{ ...props }
				inputClassName='rounded-[5px] w-full tracking-normal focus:ring-0 focus:border-0 text-[16px]'
				asSingle={ true }
				useRange={ false }
				primaryColor='green'
				displayFormat={ props.dateFormat }
				value={ { startDate: new Date(props.value ?? ''), endDate: new Date(props.value ?? '') } }
				onChange={ onChange }
				placeholder={ props?.placeholder ?? 'Choose Preferred Day' }
			/>
		</DateFieldWrapper>
	);
};

export default withInputLabel(DateField);