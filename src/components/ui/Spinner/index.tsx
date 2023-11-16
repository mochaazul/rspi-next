import { SpinnerStyle } from './style';

export interface SpinnerTypes {
	size?: keyof typeof SpinnerSize;
	className?: HTMLDivElement['className'];
}

const SpinnerSize = {
	s: {
		size: 15,
		$borderWidth: 3
	},
	m: {
		size: 35,
		$borderWidth: 5
	},
	l: {
		size: 70,
		$borderWidth: 10
	},
	xl: {
		size: 140,
		$borderWidth: 20
	},
};

const Spinner = (props: SpinnerTypes) => {
	return (
		<SpinnerStyle className={ props.className } { ...SpinnerSize[props.size ?? 's'] } />
	);
};

export default Spinner;