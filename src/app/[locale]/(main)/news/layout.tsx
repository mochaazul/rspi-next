
import { ReactNode } from 'react';
import LangWrapper from '@/components/ui/LangWrapper';

type Props = {
	children: ReactNode;
};

export default function NewsLayout({ children }: Props) {
	return (
		<LangWrapper>
			{ children }
		</LangWrapper>
	);
}
