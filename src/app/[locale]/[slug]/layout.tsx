'use server';

import PageWrapper from '../(main)/page-wrapper';

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
