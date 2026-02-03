import CurrentViewProvider from '../components/landing/CurrentViewProvider';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Portfolio from '../components/landing/Portfolio';
import Skills from '../components/landing/Skills';
import Contacts from '../components/landing/Contacts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  title: 'George Mishurovsky | Product Engineer & Software Architect',
  description:
    'Senior Product Engineer with a medical background. Helping companies build performant user-focused applications with .NET, TypeScript, React, and AWS/Azure.',

  openGraph: {
    title: 'George Mishurovsky | Product Engineer & Software Architect',
    description:
      'Senior Product Engineer with a medical background. Helping companies build performant user-focused applications with .NET, TypeScript, React, and AWS/Azure.',
    url: 'https://mishurovsky.com',
    siteName: 'George Mishurovsky',
    images: [
      {
        url: 'https://mishurovsky.com/opengraph-image.jpg',
        width: 1600,
        height: 1600,
        alt: 'George Mishurovsky | Product Engineer & Software Architect',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'George Mishurovsky | Product Engineer & Software Architect',
    description:
      'Senior Product Engineer with a medical background. Helping companies build performant user-focused applications with .NET, TypeScript, React, and AWS/Azure.',
    images: ['https://mishurovsky.com/twitter-image.jpg'],
  },
};

export default function Home() {
  return (
    <>
      <CurrentViewProvider>
        <Hero />
        <About />
        <Portfolio />
        <Skills />
        <Contacts />
      </CurrentViewProvider>
    </>
  );
}
