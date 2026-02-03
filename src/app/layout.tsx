import { ReactNode } from 'react';
import type { Metadata } from 'next';

import { Red_Hat_Text } from 'next/font/google';
import './globals.css';

const mainFont = Red_Hat_Text({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://mishurovsky.com'),
  title: 'George Mishurovsky | Product Engineer & Software Architect',
  description:
    'Senior Product Engineer with a medical background. Helping companies build performant user-focused applications with .NET, TypeScript, React, and AWS/Azure.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={mainFont.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
