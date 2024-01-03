import React from 'react';
import { sanitize } from 'isomorphic-dompurify';
import parse from 'html-react-parser';
import { TextContainer } from './style';

export type TextHtmlProps = React.HTMLAttributes<HTMLDivElement> & {
	htmlStr?: string;
};

const TextHtml: React.FC<TextHtmlProps> = ({
	htmlStr,
	className = '',
	...props
}) => {
	return (
		<TextContainer className={ `ql-editor !p-0 ${ className }` } { ...props }>{ parse(sanitize(htmlStr || '')) }</TextContainer>
	);
};

export default TextHtml;
