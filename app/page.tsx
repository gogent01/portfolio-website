import React from 'react';
import CurrentViewProvider from '@/components/CurrentViewProvider';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';

export default function Home() {
  return (
    <>
      <CurrentViewProvider>
        <Hero />
        <About />
        <Portfolio />
      </CurrentViewProvider>
    </>
  );
}
