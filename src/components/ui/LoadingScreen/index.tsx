'use client';

import Spinner from '../Spinner';

type LoadingScreenProps = {
	show?: boolean;
	className?: string;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ show, className = '' }) => {
	const renderLoadingScreen = () => {
		if (show) {
			return (
				<div className={ `absolute z-[1] inset-0 bg-white/70 h-full w-full flex items-center justify-center ${ className }` }>
					<Spinner size='m' />
				</div>
			);
		}

		return null;
	};

	return renderLoadingScreen();
};

export default LoadingScreen;
