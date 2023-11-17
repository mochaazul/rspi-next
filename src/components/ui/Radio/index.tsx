import { PropsWithChildren, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { RadioGroupContainer, RadioOptionContainer, RadioPill } from './style';
import Text from '@/components/ui/Text';

type RadioProps = {
	groupLabel?: string,
	value: string,
	onChange: (value: string) => void;
	groupContainerClassname?: string;
};

const Radio: React.FC<PropsWithChildren<RadioProps>> = ({
	groupLabel,
	children,
	onChange,
	value,
	groupContainerClassname
}) => {

	return (
		<RadioGroup value={ value } onChange={ onChange }>
			{ groupLabel && <RadioGroup.Label>{ groupLabel }</RadioGroup.Label> }
			<RadioGroupContainer className={ groupContainerClassname }>
				{
					children
				}
			</RadioGroupContainer>
		</RadioGroup>
	);
};

type OptionProps = {
	label: string;
	value: string;
};
export const Option: React.FC<OptionProps> = ({
	label,
	value
}) => {

	return <RadioGroup.Option value={ value }>
		{ ({ checked }) => (
			<div>
				<RadioOptionContainer>
					<RadioPill checked={ checked } />
					{ /* <span className={ checked ? 'bg-blue-200' : '' }>{ label }</span> */ }
					<Text text={ label } fontSize='14px' lineHeight='20px' fontWeight='500' />
				</RadioOptionContainer>
			</div>
		) }
	</RadioGroup.Option>;
};

export default Object.assign(Radio, { Option });