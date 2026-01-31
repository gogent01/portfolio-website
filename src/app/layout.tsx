import { ReactNode } from 'react';
import type { Metadata } from 'next';

import { Red_Hat_Text } from 'next/font/google';
import './globals.css';

const mainFont = Red_Hat_Text({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://mishurovsky.com'),
  title: 'George Mishurovsky | Product Engineer & Software Architect',
  description:
    'Purpose-driven Senior Software Engineer based in Montenegro, building performant, user-friendly web applications with a strong focus on UX, product development, and system architecture.',
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
