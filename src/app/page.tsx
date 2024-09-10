import CurrentViewProvider from '../components/landing/CurrentViewProvider';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Portfolio from '../components/landing/Portfolio';
import Skills from '../components/landing/Skills';
import Contacts from '../components/landing/Contacts';

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
