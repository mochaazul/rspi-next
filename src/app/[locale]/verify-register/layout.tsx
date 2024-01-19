import LangWrapper from '@/components/ui/LangWrapper';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode,
}) {
	return (
		<LangWrapper>
			{ children }
		</LangWrapper>
	);
}
