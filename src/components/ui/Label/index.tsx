import React from 'react';

// use this interface if you want to add more props (extending)
// interface LabelType extends React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> { }

const Label:React.FC<React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>> = ({ children, ...props }) => {
	return (
		<label { ...props }>{ children }</label>
	);
};

export default Label;