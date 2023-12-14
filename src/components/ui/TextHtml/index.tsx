import React from 'react';
import { sanitize } from 'isomorphic-dompurify';
import parse from 'html-react-parser';

export type TextHtmlProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
	htmlStr?: string;
};

const TextHtml: React.FC<TextHtmlProps> = ({
	htmlStr,
	...props
}) => {
	return (
		<div { ...props }>{ parse(sanitize(htmlStr || '')) }</div>
	);
};

export default TextHtml;
