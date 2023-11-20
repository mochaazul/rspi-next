
import { ReactNode } from 'react';
import LangWrapper from '@/components/ui/LangWrapper';

type Props = {
	children: ReactNode;
};

export default function FindADoctorLayout({ children }: Props) {
	return (
		<LangWrapper>
			{ children }
		</LangWrapper>
	);
}
