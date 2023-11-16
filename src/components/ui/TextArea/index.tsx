import React from 'react';

import { StyledTextArea, TextAreaType } from './style';
import withInputLabel from '../withInputLabel';

const TextArea: React.FC = ({
	errorMessage, ...props
}: TextAreaType) => {
	return (
		<>
			<StyledTextArea { ...props } />
			{ errorMessage }
		</>

	);
};

export default withInputLabel(TextArea);