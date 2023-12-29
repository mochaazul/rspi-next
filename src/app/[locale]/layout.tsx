
import { ReactElement } from 'react';
import RootWrapper from './rootWrapper';

export default function SubLayout({ params: { locale }, children }: { params: { locale: string; }, children: ReactElement; }) {
	return (
		// <RootWrapper params={ { locale } } >
		<>
			{ children }
		</>
		// </RootWrapper>
	);
}