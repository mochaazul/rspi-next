import * as FeatherIcons from 'react-feather';
import InputMask from 'react-input-mask';

import { icons } from 'constant';
import withInputLabel from 'components/withInputLabel';

import {
	CountrySelector, IconWrapper, Input, PhoneInputType, PhoneNumberInputWrapper
} from './style';
import React, { ReactNode } from 'react';

const PhoneNumberInput = ({ onIconClick, ...props }: PhoneInputType) => {
	const { ref, ...restProps } = props;
	return (
		<PhoneNumberInputWrapper
			iconPosition={ props.iconPosition }
			iconName={ props.iconName }
			featherIcon={ props.featherIcon }
			className='w-full'
		>
			<CountrySelector >
				<option>+62</option>
			</CountrySelector>
			<InputMask mask={ '999999999999' } value={ props.value } onChange={ props.onChange } { ...restProps } maskChar={ '' }/>
		</PhoneNumberInputWrapper>
	);
};

export default withInputLabel(PhoneNumberInput);