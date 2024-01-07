'use client';

import * as React from 'react';
import classNames from 'classnames';
import { motion, useInView } from 'framer-motion';
import SlidingTitle from '@/components/SlidingTitle';
import GridContainer from '@/components/GridContainer';
import { CurrentViewContext } from '@/components/CurrentViewProvider';

function Title({ children }: { children: React.ReactNode }) {
  return (
    <SlidingTitle
      level={'h1'}
      topTarget={0.5}
      offsetTop={0.95}
      pause={0.5}
      origin={'left'}
      stop={false}
      className={classNames(
        'text-gray-900',
        'text-4xl col-start-1 col-span-4',
        'md:text-5xl md:col-start-2 md:col-span-6',
        'lg:text-6xl lg:col-start-2 lg:col-span-8',
        '2xl:text-7xl 2xl:col-start-2 2xl:col-span-7'
      )}
    >
      {children}
    </SlidingTitle>
  );
}

function Bio({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0.25, transform: 'translateY(1.5rem)' }}
      animate={{ opacity: 1, transform: 'translateY(0rem)' }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      className={classNames(
        'text-gray-900',
        'mt-4 text-lg leading-9 col-start-1 col-span-4',
        'md:mt-8 md:text-2xl md:leading-10 md:col-start-2 md:col-span-6',
        'lg:mt-12 lg:text-2xl lg:leading-10 lg:tracking-wide lg:col-start-3 lg:col-span-8',
        'xl:mt-16 xl:text-3xl xl:leading-12 xl:tracking-wide xl:col-start-3 xl:col-span-7'
      )}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.p>
  );
}

function About() {
  const { setCurrentView } = React.useContext(CurrentViewContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 1, once: true });

  React.useEffect(() => {
    if (isInView) setCurrentView('about');
  }, [isInView]);

  return (
    <GridContainer
      ref={ref}
      className={classNames(
        'overflow-hidden',
        'pt-64 pb-16',
        'sm:pt-72 sm:pb-28',
        'md:pt-80 md:pb-32',
        'lg:pt-88 lg:pb-40',
        'xl:pt-88 xl:pb-48'
      )}
    >
      <Title>About Me</Title>
      {isInView && (
        <Bio>
          Full Stack Developer with&nbsp;medical background, based
          in&nbsp;Montenegro. Passionate about&nbsp;creating innovative
          solutions for&nbsp;healthcare and&nbsp;education, from&nbsp;design
          to&nbsp;infrastructure, by&nbsp;means of&nbsp;TypeScript, Vue, React
          and&nbsp;Node&nbsp;JS.
        </Bio>
      )}
    </GridContainer>
  );
}

export default About;
