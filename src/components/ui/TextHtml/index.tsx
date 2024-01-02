import React from 'react';
import { sanitize } from 'isomorphic-dompurify';
import parse from 'html-react-parser';
import { TextContainer } from './style';

export type TextHtmlProps = React.HTMLAttributes<HTMLDivElement> & {
	htmlStr?: string;
};

const TextHtml: React.FC<TextHtmlProps> = ({
	htmlStr,
	...props
}) => {
	return (
		<TextContainer { ...props }>{ parse(sanitize(htmlStr || '')) }</TextContainer>
	);
};

export default TextHtml;
