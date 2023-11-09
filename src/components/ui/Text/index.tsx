import React from 'react';
import TextStyle from './style';

type FontType = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'pre' | null;
type TextAlign = 'left' | 'center' | 'right';
type FontStyle = 'italic' | 'normal';
type FontDecoration = 'underline';
type FontWeight = 'bold' | 'bolder' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

interface TextProps {
	// eslint-disable-next-line no-undef
	children?: any;
	fontType?: FontType;
	fontFamily?: string;
	className?: string;
	subClassName?: string;
	text?: string | number | React.ReactNode;
	fontSize?: string;
	textAlign?: TextAlign;
	fontStyle?: FontStyle;
	fontDecoration?: FontDecoration;
	fontWeight?: FontWeight;
	color?: string;
	lineheight?: string;
	onClick?: () => void;
	id?: any;
}

const Text: React.FC<TextProps> = ({
	fontType = 'p',
	fontFamily = 'Lato',
	children,
	className,
	subClassName,
	text,
	fontSize,
	textAlign,
	fontStyle,
	fontDecoration,
	fontWeight,
	color,
	lineheight,
	onClick,
	id = 'custom-text'
}) => {
	let content: JSX.Element = <p className={ subClassName }>{ text || children }</p>;
	if (fontType === 'h1') content = <h1 className={ subClassName }>{ text || children }</h1>;
	else if (fontType === 'h2') content = <h2 className={ subClassName }>{ text || children }</h2>;
	else if (fontType === 'h3') content = <h3 className={ subClassName }>{ text || children }</h3>;
	else if (fontType === 'h4') content = <h4 className={ subClassName }>{ text || children }</h4>;
	else if (fontType === 'pre') content = <pre className={ subClassName }>{ text || children }</pre>;
	else if (fontType === null) content = text || children;

	return (
		<TextStyle
			className={ className }
			fontFamily={ fontFamily }
			fontSize={ fontSize }
			textAlign={ textAlign }
			fontStyle={ fontStyle }
			fontDecoration={ fontDecoration }
			fontWeight={ fontWeight }
			color={ color }
			lineheight={ lineheight }
			onClick={ onClick }
			id={ id }
		>
			{ content }
		</TextStyle>
	);
};

export default Text;