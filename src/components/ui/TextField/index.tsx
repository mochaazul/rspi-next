import * as FeatherIcons from 'react-feather';

import { icons } from '../../../constant';
import withInputLabel from '../../../components/ui/withInputLabel';

import {
	IconWrapper,
	Input,
	InputMaskedStyled,
	InputType,
	TextFieldWrapper
} from './style';

const TextField = ({ onIconClick, isNumber, mask, iconName, iconPosition, ...props }: InputType) => {
	const { ref, ...restProps } = props;
	const Icons = iconName ? icons[iconName] : null;
	const FeatherIconsJSX = props.featherIcon ? FeatherIcons[props.featherIcon] : null;
	return (
		<TextFieldWrapper
			$iconPosition={ iconPosition }
			$iconName={ iconName }
			featherIcon={ props.featherIcon }
			className='w-full'
		>
			{
				iconName ?
					<IconWrapper className={ `iconWrapper ${ onIconClick && 'cursor-pointer' }` } onClick={ onIconClick }>
						{/* <Icons /> TODO: ganti */ }
					</IconWrapper> :
					null
			}
			{
				props.featherIcon && FeatherIconsJSX !== null ?
					<IconWrapper className={ `iconWrapper ${ onIconClick && 'cursor-pointer' }` } onClick={ onIconClick }>
						<FeatherIconsJSX color={ props.iconColor } />
					</IconWrapper> :
					null
			}
			{
				!isNumber
					? <Input { ...props } />
					: <InputMaskedStyled mask={ mask ?? '' } maskChar={ '' } { ...restProps } />
			}
		</TextFieldWrapper>
	);
};

export default withInputLabel(TextField);