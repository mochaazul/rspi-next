import { PropsWithChildren } from 'react';
import { RadioGroup } from '@headlessui/react';
import { RadioGroupContainer, RadioOptionContainer, RadioPill } from './style';
import Text from '@/components/ui/Text';

type RadioProps = {
	groupLabel?: string,
	value: string,
	onChange: (value: string) => void;
	groupContainerClassname?: string;
	labelClassName?: string;
};

const Radio: React.FC<PropsWithChildren<RadioProps>> = ({
	groupLabel,
	children,
	onChange,
	value,
	groupContainerClassname,
	labelClassName = 'text-sm font-medium leading-5'
}) => {

	return (
		<RadioGroup value={ value } onChange={ onChange }>
			{ groupLabel && <RadioGroup.Label className={ labelClassName }>{ groupLabel }</RadioGroup.Label> }
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
	className?: string;
	textClassName?: string;
};
export const Option: React.FC<OptionProps> = ({
	label,
	value,
	className,
	textClassName
}) => {

	return <RadioGroup.Option value={ value }>
		{ ({ checked }) => (
			<div>
				<RadioOptionContainer className={ className }>
					<RadioPill checked={ checked } />
					{ /* <span className={ checked ? 'bg-blue-200' : '' }>{ label }</span> */ }
					<Text text={ label } fontSize='14px' lineHeight='20px' fontWeight='500' subClassName={ textClassName } />
				</RadioOptionContainer>
			</div>
		) }
	</RadioGroup.Option>;
};

export default Object.assign(Radio, { Option });