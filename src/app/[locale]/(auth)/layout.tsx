import LangWrapper from '@/components/ui/LangWrapper';
import { PropsWithChildren } from 'react';

export default function Layout({ children }:PropsWithChildren) {

	return (
		<LangWrapper>
			{ children }
		</LangWrapper>
	);
};