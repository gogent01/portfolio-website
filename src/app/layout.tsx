import { ReactNode } from 'react';
import type { Metadata } from 'next';

import { Red_Hat_Text } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

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

        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="7fad4d27-0c46-40f7-b4f5-645b781b7142"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MJV84TY2L9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MJV84TY2L9');
          `}
        </Script>
      </body>
    </html>
  );
}
