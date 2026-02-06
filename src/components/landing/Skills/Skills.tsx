'use client';

import { ReactNode, useRef } from 'react';
import classNames from 'classnames';
import { motion, useInView, LayoutGroup } from 'framer-motion';

import SlidingTitle from '@/components/landing/SlidingTitle';
import GridContainer from '@/components/landing/GridContainer';

function Title({ children }: { children: ReactNode }) {
  return (
    <SlidingTitle
      level={'h2'}
      topTarget={0.5}
      offsetTop={0.95}
      pause={0.5}
      origin={'left'}
      stop={true}
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

function SkillSet() {
  const skills: string[] = [
    '.NET (C# & F#)',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'HTML & CSS',
    'React & Vue.js',
    'Next.js',
    'Tailwind CSS',
    'Storybook',
    'Playwright',
    'Keycloak',
    'REST & GraphQL',
    'SQL (PostgreSQL)',
    'NoSQL (MongoDB)',
    'Docker',
    'AWS',
    'Linux & Git',
    'Python & R',
  ];

  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { amount: 0, once: true });

  return (
    <GridContainer
      ref={wrapperRef}
      className={classNames(
        '!px-0 grid-flow-col grid-row-subgrid',
        'mt-6 col-start-1 col-span-4 !grid-cols-2 grid-rows-9 gap-0',
        'md:mt-8 md:col-start-2 md:col-span-6 !md:grid-cols-2 md:grid-rows-9 md:gap-1',
        'lg:mt-14 lg:col-start-3 lg:col-span-9 !lg:grid-cols-3 lg:grid-rows-6 lg:gap-2',
        'xl:mt-16',
        '2xl:mt-20'
      )}
    >
      <LayoutGroup>
        {skills.map((skill, idx) => {
          return (
            isInView && (
              <motion.p
                key={skill}
                layoutId={skill}
                initial={{ opacity: 0, translateY: '1.5rem' }}
                animate={{ opacity: 1, translateY: '0rem' }}
                transition={{
                  duration: 0.75,
                  delay: 0.05 * idx,
                  type: 'spring',
                  stiffness: 70,
                  damping: 25,
                }}
                className={classNames(
                  'text-gray-900',
                  'text-lg leading-10',
                  'md:text-xl md:leading-10',
                  'lg:text-2xl lg:leading-10',
                  'xl:text-2xl xl:leading-12',
                  '2xl:text-3xl 2xl:leading-12'
                )}
              >
                {skill}
              </motion.p>
            )
          );
        })}
      </LayoutGroup>
    </GridContainer>
  );
}

function Skills() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <GridContainer
      ref={ref}
      className="pt-24 pb-16 overflow-hidden sm:pt-80"
      style={{ maxWidth: '100vw' }}
    >
      <Title>Skills</Title>
      <SkillSet />
    </GridContainer>
  );
}

export default Skills;
