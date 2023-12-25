import type { Metadata } from 'next';
import { Red_Hat_Text } from 'next/font/google';
import './globals.css';
import React from 'react';
import Grid from '@/components/Grid';

const mainFont = Red_Hat_Text({ subsets: ['latin'] });

const yoe =
  new Date(
    new Date().getTime() - new Date('2018-10-01').getTime()
  ).getFullYear() - new Date(0).getFullYear();
export const metadata: Metadata = {
  title: 'Georgy Mishurovsky | Full Stack Developer',
  description: `Georgy Mishurovsky is a Full Stack Developer with ${yoe} years of experience, passionate about building web applications that improve peoples' experience, while achieving business goals.`,
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
      </body>
    </html>
  );
}
