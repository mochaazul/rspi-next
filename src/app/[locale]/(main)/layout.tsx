'use server';

import PageWrapper from './page-wrapper';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode,
}) {
	return (
		<PageWrapper>
			{ children }
		</PageWrapper>
	);
}
