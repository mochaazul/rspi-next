import ButtonStyle, { ButtonType } from './style';

const Button = ({
	children,
	label = 'Submit',
	theme = 'primary',
	themeColor,
	hoverTheme,
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
			hoverTheme={ hoverTheme }
			themeColor={ themeColor }
			className={ className }
			type={ type }
			onClick={ onClick && onClick }
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
