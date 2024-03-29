import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Lato } from 'next/font/google';

import StyledComponentsRegistry from '@/lib/registry';
import FacebookPixel from '@/components/ui/FacebookPixel';
import ProgressBar from '@/components/ui/ProgressBar';

import '@/styles/globals.css';

type Props = {
	children: ReactNode;
};

export const metadata: Metadata = {
	title: 'RS Pondok Indah',
	description: 'Rumah Sakit Pondok Indah adalah salah satu Rumah Sakit Umum terbaik di Jakarta dengan tenaga medis berkualitas, teknologi terkini & sistem digital terintegrasi.',
	robots: {
		follow: false,
		index: false
	}
};

const lato = Lato({
	subsets: ['latin'],
	fallback: ['Arial', 'sans-serif'],
	weight: ['100', '300', '400', '700', '900'],
	variable: '--font-Lato'
});

export default async function RootLayout({ children }: Props) {
	return (
		<html lang='en'>

			<body className={ lato.variable } suppressHydrationWarning>
				<StyledComponentsRegistry>
					<div className='font-Lato'>
						{ children }
					</div>
					<ProgressBar />
				</StyledComponentsRegistry>

				<FacebookPixel />
				<div id='modal-base' />
			</body>
		</html>
	);
}
