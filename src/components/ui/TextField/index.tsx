import * as FeatherIcons from 'react-feather';

import { icons } from '../../../constant';
import withInputLabel from '../withInputLabel';

import {
	IconWrapper,
	Input,
	InputMaskedStyled,
	InputType,
	TextFieldWrapper
} from './style';

const TextField = ({
	onIconClick,
	isNumber,
	mask,
	iconName,
	iconPosition,
	$iconColor,
	featherIcon,
	wrapperClassName,
	...props
}: InputType) => {
	const { ref, ...restProps } = props;
	const Icons = iconName ? icons[iconName] : null;
	const FeatherIconsJSX = featherIcon ? FeatherIcons[featherIcon] : null;
	return (
		<TextFieldWrapper
			$iconPosition={ iconPosition }
			$iconName={ iconName }
			$featherIcon={ featherIcon }
			$isNumber={ isNumber }
			className={ `w-full ${ wrapperClassName }` }
		>
			{
				iconName ?
					<IconWrapper className={ `iconWrapper ${ onIconClick && 'cursor-pointer' }` } onClick={ onIconClick }>
						<Icons />
					</IconWrapper> :
					null
			}
			{
				featherIcon && FeatherIconsJSX !== null ?
					<IconWrapper className={ `iconWrapper ${ onIconClick && 'cursor-pointer' }` } onClick={ onIconClick }>
						<FeatherIconsJSX color={ $iconColor } />
					</IconWrapper> :
					null
			}
			{
				!isNumber
					? <Input { ...props } />
					: <InputMaskedStyled mask={ mask ?? '999999999999999' } maskChar={ '' } { ...restProps } />
			}
		</TextFieldWrapper>
	);
};

export default withInputLabel(TextField);