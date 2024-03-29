import ButtonStyle, { ButtonType } from './style';
import { colors } from '@/constant';

const Button = ({
	children,
	label = 'Submit',
	theme = 'primary',
	themeColor = colors.paradiso.default,
	$hoverTheme: hoverTheme = theme,
	type = 'button',
	width,
	className,
	disabled = false,
	noPadding,
	onClick
}: ButtonType) => {
	return (
		<ButtonStyle
			theme={ theme }
			$hoverTheme={ hoverTheme }
			$themeColor={ themeColor }
			className={ className }
			type={ type }
			onClick={ onClick }
			width={ width }
			disabled={ disabled }
			noPadding={ noPadding }
		>
			<div className='bg-overlay' />
			<div className='children-wrapper'>
				{ children || label }
			</div>
		</ButtonStyle>
	);
};

export default Button;
