
import { ReactNode } from 'react';
import LangWrapper from '@/components/ui/LangWrapper';

type Props = {
	children: ReactNode;
};

export default function PatientPortalLayout({ children }: Props) {
	return (
		<LangWrapper>
			{ children }
		</LangWrapper>
	);
}
