import React from 'react';
import CurrentViewProvider from '@/components/CurrentViewProvider';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Skills from '@/components/Skills';

export default function Home() {
  return (
    <>
      <CurrentViewProvider>
        <Hero />
        <About />
        <Portfolio />
        <Skills />
      </CurrentViewProvider>
    </>
  );
}
