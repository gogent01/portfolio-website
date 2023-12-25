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
        'xl:text-7xl xl:col-start-2 xl:col-span-7'
      )}
    >
      {children}
    </SlidingTitle>
  );
}

function Bio({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, transform: 'translateY(1rem)' }}
      animate={{ opacity: 1, transform: 'translateY(0rem)' }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className={classNames(
        'text-gray-900',
        'mt-4 text-xl leading-10 col-start-1 col-span-4',
        'md:mt-4 md:text-2xl md:leading-10 md:col-start-2 md:col-span-6',
        'lg:mt-8 lg:text-2xl lg:leading-10 lg:col-start-3 lg:col-span-8',
        'xl:mt-16 xl:text-3xl xl:leading-12 xl:col-start-3 xl:col-span-7'
      )}
    >
      {children}
    </motion.p>
  );
}

function About() {
  const { setCurrentView } = React.useContext(CurrentViewContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  React.useEffect(() => {
    if (isInView) setCurrentView('about');
  }, [isInView]);

  return (
    <GridContainer
      ref={ref}
      className={classNames(
        'pb-16 overflow-hidden',
        'pt-64',
        'sm:pt-72',
        'md:pt-80',
        'lg:pt-88',
        'xl:pt-86'
      )}
    >
      <Title>About Me</Title>
      <Bio>
        Full Stack Developer with&nbsp;medical background from&nbsp;Montenegro.
        Passionate about&nbsp;creating innovative solutions for&nbsp;healthcare
        and&nbsp;education by&nbsp;means of&nbsp;TypeScript, Vue, React
        and&nbsp;Node&nbsp;JS, from design to server infrastructure.
      </Bio>
    </GridContainer>
  );
}

export default About;
