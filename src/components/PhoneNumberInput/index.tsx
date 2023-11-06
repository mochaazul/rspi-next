import * as FeatherIcons from 'react-feather';

import { icons } from 'constant';
import withInputLabel from 'components/withInputLabel';

import {
	CountrySelector, IconWrapper, Input, PhoneInputType, PhoneNumberInputWrapper
} from './style';

const PhoneNumberInput = ({ onIconClick, ...props }: PhoneInputType) => {

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
		
			<Input { ...props } />
		</PhoneNumberInputWrapper>
	);
};

export default withInputLabel(PhoneNumberInput);