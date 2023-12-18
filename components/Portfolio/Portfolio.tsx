'use client';
import * as React from 'react';
import {
  cubicBezier,
  motion,
  useAnimate,
  useInView,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { CurrentViewContext } from '@/components/CurrentViewProvider';
import GridContainer from '@/components/GridContainer';
import classNames from 'classnames';
import { useEffect } from 'react';
import Image from 'next/image';

type Project = {
  count: number;
  title: string;
  role: string;
  description: string;
  purpose: string;
};

const projects: Record<string, Project> = {
  trialBi: {
    count: 1,
    title: 'Trial Bi',
    role: 'Full Stack Developer • UI/UX Designer',
    description:
      'A BI system for clinical trial data, providing capabilities for data selection, filtering, sorting, and aggregation. The system allows users to gain initial insights and prepare data for further analysis in statistical software.',
    purpose: 'Web App',
  },
  trivialno: {
    count: 2,
    title: 'Trivialno',
    role: 'Full Stack Developer • System Architect',
    description:
      "An online platform for Math tutors, school students, and their parents. Enables tutors and students to sign up, schedule online lessons, and engage in lessons through the app's integrated video bridge. Comprised of three web apps, a company website, and a microservice backend.",
    purpose: 'SPA & Website',
  },
  cardio: {
    count: 3,
    title: 'Cardio',
    role: 'Full Stack Developer • UI Designer',
    description:
      'A pair of progressive web apps — one tailored for high school students to prepare for state examinations in Biology and Chemistry, and the other for teachers to create study materials and monitor student performance.',
    purpose: 'PWA',
  },
};

function TextDiscovery({
  children,
  ...delegated
}: { children: React.ReactNode } & React.ComponentProps<'p'>) {
  const [scope, animate] = useAnimate();
  const easing = cubicBezier(0.23, 1, 0.32, 1);

  useEffect(() => {
    const enterAnimation = async () => {
      if (!scope.current) return;

      animate([
        ['#black-bar', { x: '-50%', scaleX: 0 }, { duration: 0 }],
        ['#white-bar', { x: '0%', scaleX: 1 }, { duration: 0 }],
        ['#black-bar', { x: '0%', scaleX: 1 }, { duration: 0.5, ease: easing }],
        ['#white-bar', { x: '50%', scaleX: 0 }, { duration: 0 }],
        [
          '#black-bar',
          { x: '50%', scaleX: 0 },
          { duration: 0.5, ease: easing },
        ],
      ]);
    };
    enterAnimation();
  }, [children]);

  return (
    <div ref={scope} className={classNames('relative max-w-max')}>
      <div
        id="black-bar"
        className={classNames('absolute w-full h-full bg-gray-900 scale-0')}
      ></div>
      <div
        id="white-bar"
        className={classNames('absolute w-full h-full bg-white scale-0')}
      ></div>
      <p {...delegated}>{children}</p>
    </div>
  );
}

function ProjectDescription({ project }: { project: Project }) {
  const { currentView } = React.useContext(CurrentViewContext);

  return (
    project && (
      <div
        style={{
          height: 'calc(100vh - 2 * var(--gutter))',
          top: 'var(--gutter)',
        }}
        className={classNames(
          'sticky',
          'col-start-1 col-span-4',
          'md:col-start-1 md:col-span-4',
          'lg:col-start-1 lg:col-span-6',
          'xl:col-start-1 xl:col-span-6'
        )}
      >
        <div className="absolute top-0 left-0 ">
          <TextDiscovery
            className={classNames(
              'text-gray-500 font-bold',
              'text-4xl',
              'lg:text-4xl',
              'xl:text-4xl'
            )}
          >
            {project.count.toString().padStart(2, '0')}
          </TextDiscovery>
        </div>

        <div
          className={classNames(
            'h-full grid',
            'grid-cols-4 gap-x-4',
            'md:grid-cols-4',
            'lg:grid-cols-6',
            '2xl:gap-x-6'
          )}
        >
          <div
            className={classNames(
              'flex flex-col',
              'mt-20 col-start-1 col-span-4',
              'md:mt-40',
              'lg:col-start-2 lg:col-span-5'
            )}
          >
            <div>
              <TextDiscovery
                className={classNames(
                  'text-gray-900 font-semibold',
                  'text-3xl',
                  'lg:text-5xl',
                  'xl:text-6xl'
                )}
              >
                {project.title}
              </TextDiscovery>
            </div>

            <div
              className={classNames(
                'mt-12',
                'lg:mt-10',
                'xl:mt-24',
                '2xl:mt-24'
              )}
            >
              <TextDiscovery
                className={classNames(
                  'text-gray-900 font-semibold',
                  ' text-xl leading-relaxed',
                  ' lg:text-2xl lg:leading-relaxed',
                  ' xl:text-2xl xl:leading-relaxed',
                  ' 2xl:text-3xl 2xl:leading-relaxed'
                )}
              >
                {project.role}
              </TextDiscovery>
            </div>

            <div className={classNames('mt-3', 'lg:mt-5', 'xl:mt-6')}>
              <TextDiscovery
                className={classNames(
                  'text-gray-900',
                  'text-xl leading-relaxed',
                  'lg:text-2xl lg:leading-relaxed',
                  'xl:text-2xl xl:leading-relaxed',
                  '2xl:text-3xl 2xl:leading-relaxed'
                )}
              >
                {project.description}
              </TextDiscovery>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0">
          <TextDiscovery
            className={classNames(
              'text-gray-500 font-bold',
              'text-3xl',
              'lg:text-3xl',
              'xl:text-3xl'
            )}
          >
            {project.purpose.toUpperCase()}
          </TextDiscovery>
        </div>
      </div>
    )
  );
}

function ProjectImages() {
  return (
    <div className="flex flex-col p-16" style={{ minHeight: 80 + 'vh' }}>
      <h2 className="text-4xl text-gray-900 font-bold">My projects</h2>
    </div>
  );
}

export default Portfolio;
