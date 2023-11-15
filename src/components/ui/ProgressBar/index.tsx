'use client';

import { AppProgressBar } from 'next-nprogress-bar';

const ProgressBar = () => {
	return (
		<AppProgressBar
			height='4px'
			color='#00C48F'
			options={ { showSpinner: false } }
			shallowRouting
		/>
	);
};

export default ProgressBar;