import { PropsWithChildren } from 'react';

import LangWrapper from '@/components/ui/LangWrapper';

export default function Layout({ children }: PropsWithChildren) {
	return (
		<LangWrapper>
			{ children }
		</LangWrapper>
	);
};