'use client';

import * as React from 'react';
import classNames from 'classnames';
import SlidingTitle from '@/components/SlidingTitle';
import GridContainer from '@/components/GridContainer';

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
    'HTML & CSS',
    'Vue JS',
    'React JS',
    'Tailwind CSS',
    'REST API',
    'GraphQL API',
    'Node JS',
    'Next JS',
    'SQL (PostgreSQL)',
    'NoSQL (MongoDB)',
    'Sequelize',
    'Jest & Playwright',
    'Linux',
    'Docker',
    'AWS',
    'Python',
  ];

  return (
    <GridContainer
      className={classNames(
        '!px-0 grid-flow-col grid-row-subgrid',
        'mt-6 col-start-1 col-span-4 !grid-cols-2 grid-rows-9 gap-0',
        'md:mt-8 md:col-start-2 md:col-span-6 !md:grid-cols-2 md:grid-rows-9 md:gap-1',
        'lg:mt-14 lg:col-start-3 lg:col-span-9 !lg:grid-cols-3 lg:grid-rows-6 lg:gap-2',
        'xl:mt-20 xl:col-start-3 xl:col-span-9 !xl:grid-cols-3 xl:grid-rows-6 xl:gap-2'
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
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <GridContainer
      ref={ref}
      className="pt-24 overflow-hidden sm:pt-80"
      style={{ maxWidth: '100vw' }}
    >
      <Title>Skills</Title>
      <SkillSet />
    </GridContainer>
  );
}

export default Skills;
