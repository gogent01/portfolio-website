'use client';

import { ReactNode, useContext, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import classNames from 'classnames';

import SlidingTitle from '@/components/landing/SlidingTitle';
import GridContainer from '@/components/landing/GridContainer';
import { CurrentViewContext } from '@/components/landing/CurrentViewProvider';

function Title({ children }: { children: ReactNode }) {
  return (
    <SlidingTitle
      level={'h2'}
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

function Bio({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { amount: 0, once: true });

  return (
    <div
      ref={wrapperRef}
      className={classNames(
        '',
        'mt-4 col-start-1 col-span-4',
        'md:mt-8 md:col-start-2 md:col-span-6',
        'lg:mt-12 lg:col-start-3 lg:col-span-8',
        'xl:mt-16 xl:col-start-3 xl:col-span-8',
        '2xl:mt-16 2xl:col-start-3 2xl:col-span-7'
      )}
    >
      {isInView && (
        <motion.p
          initial={{ opacity: 0, translateY: '2rem' }}
          animate={{ opacity: 1, translateY: '0rem' }}
          transition={{
            duration: 0.75,
            type: 'spring',
            stiffness: 70,
            damping: 25,
          }}
          className={classNames(
            'text-gray-900',
            'text-lg leading-8 font-normal',
            'md:text-2xl md:leading-10 md:font-light',
            'lg:text-2xl lg:leading-10',
            'xl:text-3xl xl:leading-12'
          )}
        >
          {children}
        </motion.p>
      )}
    </div>
  );
}

function About() {
  const { setCurrentView } = useContext(CurrentViewContext);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 1, once: true });

  useEffect(() => {
    if (isInView) setCurrentView('about');
  }, [isInView]);

  const title = 'About Me';
  const bio =
    'Purpose-driven Senior Software Engineer based in Montenegro. I design and build performant, user‑friendly, data‑rich web applications with a focus on User Experience and Product Development. Proficient in all stages of software engineering, from system architecture to acceptance testing, using TypeScript, .NET, Node.js, React, and Next.js — but not limited to them.';

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
      <Title>{title}</Title>
      <Bio>{bio}</Bio>
    </GridContainer>
  );
}

export default About;
