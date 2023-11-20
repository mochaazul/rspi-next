import InputMask from 'react-input-mask';

import withInputLabel from '@/components/ui/withInputLabel';

import { CountrySelector, PhoneInputType, PhoneNumberInputWrapper } from './style';

const PhoneNumberInput = ({ onIconClick, ...props }: PhoneInputType) => {
	const { ref, featherIcon, ...restProps } = props;
	return (
		<PhoneNumberInputWrapper
			$iconPosition={ props.iconPosition }
			$iconName={ props.iconName }
			featherIcon={ featherIcon }
			className='w-full'
		>
			<CountrySelector >
				<option>+62</option>
			</CountrySelector>
			<InputMask mask={ '999999999999' } value={ props.value } onChange={ props.onChange } { ...restProps } maskChar={ '' } />
		</PhoneNumberInputWrapper>
	);
};

export default withInputLabel(PhoneNumberInput);