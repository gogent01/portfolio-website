import type { Metadata } from 'next';
import { Red_Hat_Text } from 'next/font/google';
import './globals.css';
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const mainFont = Red_Hat_Text({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Georgy Mishurovsky | Full Stack Developer',
  description:
    'Experienced Full Stack Developer in TypeScript, React, Vue, and Node. I build performant web apps with great UX and clearly communicate technical concepts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mainFont.className}>
        {/*<Grid />*/}
        <main>{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
