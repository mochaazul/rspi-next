import { ReactNode } from 'react';
import LangWrapper from '@/components/ui/LangWrapper';

type Props = {
  children: ReactNode;
};

export default async function UnSubscribeLayout({ children }: Props) {
	return (
		<LangWrapper>
			{ children }
		</LangWrapper>
	);
}