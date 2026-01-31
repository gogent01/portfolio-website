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
    'Purpose-driven Senior Software Engineer based in Montenegro, building performant, user-friendly web applications with a strong focus on UX, product development, and system architecture.',
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
