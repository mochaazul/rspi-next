import * as FeatherIcons from 'react-feather';

import {
	IconWrapper, Input, InputMaskedStyled, InputType, TextFieldWrapper
} from './style';
import withInputLabel from '../withInputLabel';

const TextField = ({ onIconClick, isNumber, mask, ...props }: InputType) => {
	const { ref, ...restProps } = props;
	// const Icons = props.iconName ? icons[props.iconName] : null;
	const FeatherIconsJSX = props.featherIcon ? FeatherIcons[props.featherIcon] : null;
	return (
		<TextFieldWrapper
			iconPosition={ props.iconPosition }
			iconName={ props.iconName }
			featherIcon={ props.featherIcon }
			className='w-full'
		>
			{
				props.iconName ?
					<IconWrapper className={ `iconWrapper ${ onIconClick && 'cursor-pointer' }` } onClick={ onIconClick }>
						{ /* <Icons /> TODO: IMPLEMENT NEXTJS ICON HANDLER */ }
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
					: <InputMaskedStyled mask={ mask ?? '' } maskChar={ '' } { ...restProps }/>
			}
		</TextFieldWrapper>
	);
};

export default withInputLabel(TextField);