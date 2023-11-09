import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

import StyledComponentsRegistry from '@/lib/registry';
import '@/styles/globals.css';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'RS Pondok Indah',
  description: 'Generated by create next app',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body className={ inter.className } suppressHydrationWarning>
        <StyledComponentsRegistry>{ children }</StyledComponentsRegistry>
      </body>
    </html>
  );
}
