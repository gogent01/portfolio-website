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
      topTarget={-0.5}
      offsetTop={0.9}
      pause={0.3}
      origin={'right'}
      stop={true}
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

function SkillSet() {
  const skills: string[] = [
    'JavaScript',
    'TypeScript',
    'HTML & CSS',
    'Vue JS',
    'React JS',
    'Tailwind CSS',
    'REST & GraphQL',
    'Node JS',
    'SQL (PostgreSQL)',
    'NoSQL (MongoDB)',
    'Linux',
    'AWS',
  ];

  return (
    <GridContainer
      className={classNames(
        '!px-0 grid-flow-col',
        'mt-6 col-start-1 col-span-4 !grid-cols-2 grid-rows-6 gap-0',
        'md:mt-8 md:col-start-2 md:col-span-6 !md:grid-cols-2 md:grid-rows-6 md:gap-1',
        'lg:mt-12 lg:col-start-3 lg:col-span-9 !lg:grid-cols-3 lg:grid-rows-4 lg:gap-2',
        'xl:mt-12 xl:col-start-3 xl:col-span-9 !xl:grid-cols-3 xl:grid-rows-4 xl:gap-2'
      )}
    >
      {skills.map((skill) => (
        <p
          key={skill}
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
        </p>
      ))}
    </GridContainer>
  );
}

function Skills() {
  const { setCurrentView } = React.useContext(CurrentViewContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const hasComeIntoView = useInView(ref, { once: true, amount: 0.8 });
  const isInView = useInView(ref, { amount: 0.5 });

  React.useEffect(() => {
    if (isInView) setCurrentView('skills');
  }, [isInView]);

  return (
    <GridContainer ref={ref} className="pt-80">
      <Title>Skills</Title>
      <SkillSet />
    </GridContainer>
  );
}

export default Skills;
