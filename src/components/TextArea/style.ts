import React from 'react';
import Styled from 'styled-components';

import { colors } from 'constant';
import { GlobalAllTransition5ms } from 'constant/globalstyle';

export interface TextAreaType extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	label?: string;
	valid?: boolean;
	errorMessage?: string;
	ref?: React.RefObject<HTMLTextAreaElement>;
}

export const StyledTextArea = Styled.textarea<TextAreaType>`
	min-width: 100%;
	padding: 12px 18px;
	border-radius: 5px;
	font-family: var(--font-family);
	outline: 1px solid ${ colors.grey.lighter };
  ${ GlobalAllTransition5ms }

	&:focus {
		outline: 1px solid ${ colors.green.toscaLight }
	}
`;