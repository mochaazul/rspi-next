import React from 'react';

import withInputLabel from '@/components/withInputLabel';

import { StyledTextArea, TextAreaType } from './style';

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