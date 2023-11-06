import * as FeatherIcons from 'react-feather';

import { icons } from 'constant';
import withInputLabel from 'components/withInputLabel';

import { IconWrapper, Input, InputType, TextFieldWrapper } from './style';

const TextField = ({ onIconClick, ...props }: InputType) => {
	const Icons = props.iconName ? icons[props.iconName] : null;
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
						<Icons />
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
			<Input { ...props } />
		</TextFieldWrapper>
	);
};

export default withInputLabel(TextField);