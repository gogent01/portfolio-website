'use client';

import * as React from 'react';
import { CurrentViewContext } from '@/components/CurrentViewProvider';
import GridContainer from '@/components/GridContainer';
import classNames from 'classnames';
import { useEffect } from 'react';
import TextDiscovery from '@/components/TextDiscovery';
import ProjectTrivialnoImages from '@/components/ProjectTrivialnoImages';
import ProjectTrialBiImages from '@/components/ProjectTrialBiImages';
import ProjectCardioImages from '@/components/ProjectCardioImages';
import CaseStudyLink from '@/components/CaseStudyLink';
import GithubLink from '@/components/GithubLink';
import DemoLink from '@/components/DemoLink';

type Project = {
  count: number;
  title: string;
  role: string;
  description: string;
  purpose: string;
  caseStudy?: string;
  github?: string;
  demo?: string;
};

const projects: Record<string, Project> = {
  trivialno: {
    count: 1,
    title: 'Trivialno',
    role: 'Tech Lead • Solution Architect',
    description:
      'An online platform for Math tutors, school students, and their parents. Comprised of three web apps, a company website, and a microservice backend.',
    purpose: 'Platform',
  },
  trialBi: {
    count: 2,
    title: 'Trial Bi',
    role: 'Frontend Developer • UI Designer',
    description:
      'A BI system for clinical trial data, providing extensive capabilities for data processing. Enables researchers to discover initial insights and prepare data for further analysis in statistical software.',
    purpose: 'Web App',
    github: 'https://github.com/gogent01/trial-bi-client',
    demo: 'https://trial-bi-client.vercel.app/',
  },
  cardio: {
    count: 3,
    title: 'Cardio',
    role: 'Full Stack Developer • UI Designer',
    description:
      'A pair of progressive web apps — one for high school students to prepare for state examinations, and another for teachers to create study materials and monitor student performance.',
    purpose: 'PWA',
  },
};

function ProjectDescription({ project }: { project: Project }) {
  return (
    <div
      style={{
        height: 'calc(100vh - 2 * var(--gutter))',
        top: 'var(--gutter)',
      }}
      className={classNames(
        'sticky',
        'col-start-1 col-span-4',
        'md:col-start-1 md:col-span-8',
        'lg:col-start-1 lg:col-span-12'
      )}
    >
      {project && (
        <>
          <div className="absolute top-0 left-0">
            <TextDiscovery
              fgBarClassName="bg-gray-300 sm:bg-gray-700"
              className={classNames(
                'font-bold',
                'text-3xl text-gray-300',
                'sm:text-gray-700',
                'lg:text-4xl'
              )}
            >
              {project.count.toString().padStart(2, '0')}
            </TextDiscovery>
          </div>

          <div className="block absolute top-0 right-0 sm:hidden">
            <TextDiscovery
              fgBarClassName="bg-gray-300"
              className={classNames(
                'text-gray-300 font-bold',
                'text-3xl',
                'lg:text-4xl'
              )}
            >
              {project.purpose.toUpperCase()}
            </TextDiscovery>
          </div>

          <div
            className={classNames(
              'h-full grid',
              'w-full grid-cols-4 gap-x-4 pr-0',
              'md:w-1/2 md:grid-cols-4 md:pr-4',
              'lg:w-1/2 lg:grid-cols-6 lg:pr-8',
              '2xl:w-1/2 2xl:gap-x-6 2xl:pr-12'
            )}
          >
            <div
              className={classNames(
                'flex flex-col',
                'col-start-1 col-span-4',
                'lg:col-start-2 lg:col-span-5'
              )}
              style={{ marginTop: 'calc(100vh * 0.175)' }}
            >
              <div>
                <TextDiscovery
                  className={classNames(
                    'text-gray-900 font-semibold',
                    'text-3xl',
                    'lg:text-5xl',
                    '2xl:text-6xl'
                  )}
                >
                  {project.title}
                </TextDiscovery>
              </div>

              <div
                className={classNames(
                  'mt-9',
                  'lg:mt-10',
                  'xl:mt-16',
                  '2xl:mt-24'
                )}
              >
                <TextDiscovery
                  className={classNames(
                    'text-gray-900 font-semibold',
                    'text-lg leading-relaxed',
                    'lg:text-xl lg:leading-relaxed',
                    'xl:text-2xl xl:leading-relaxed',
                    '2xl:text-3xl 2xl:leading-relaxed'
                  )}
                >
                  {project.role}
                </TextDiscovery>
              </div>

              <div className={classNames('mt-3', 'lg:mt-5', 'xl:mt-6')}>
                <TextDiscovery
                  className={classNames(
                    'text-gray-900 font-light',
                    'text-lg leading-relaxed',
                    'lg:text-xl lg:leading-relaxed',
                    'xl:text-2xl xl:leading-relaxed',
                    '2xl:text-3xl 2xl:leading-relaxed'
                  )}
                >
                  {project.description}
                </TextDiscovery>
              </div>

              <div
                className={classNames(
                  'mt-4',
                  'sm:mt-5',
                  'md:mt-5',
                  'lg:mt-6',
                  '2xl:mt-8'
                )}
              >
                <TextDiscovery
                  fgBarClassName="bg-gray-700"
                  className={classNames(
                    'flex gap-4 pr-px',
                    'sm:gap-5',
                    'md:gap-5',
                    'lg:gap-6'
                  )}
                >
                  <CaseStudyLink href={project.caseStudy} />
                  <GithubLink href={project.github} />
                  <DemoLink href={project.demo} />
                </TextDiscovery>
              </div>
            </div>
          </div>

          <div className="hidden absolute bottom-0 left-0 sm:block">
            <TextDiscovery
              fgBarClassName="bg-gray-700"
              className={classNames(
                'text-gray-700 font-bold',
                'text-2xl',
                'lg:text-3xl'
              )}
            >
              {project.purpose.toUpperCase()}
            </TextDiscovery>
          </div>
        </>
      )}
    </div>
  );
}

function ProjectImages() {
  return (
    <div
      style={{
        marginTop: 'var(--gutter)',
        marginBottom: 'var(--gutter)',
        gap: '100vh',
        paddingTop: '0vh',
        paddingBottom: '100vh',
      }}
      className={classNames(
        'flex flex-col',
        'col-start-1 col-span-4',
        'md:col-start-5 md:col-span-4',
        'lg:col-start-7 lg:col-span-6'
      )}
    >
      <ProjectTrivialnoImages />
      <ProjectTrialBiImages />
      <ProjectCardioImages />
    </div>
  );
}

function Portfolio() {
  const { currentView } = React.useContext(CurrentViewContext);
  const [project, setProject] = React.useState(projects['trialBi']);

  useEffect(() => {
    setProject(projects[currentView]);
  }, [currentView]);

  return (
    <GridContainer className="relative flex" style={{ minHeight: '100vh' }}>
      <ProjectDescription project={project} />
      <ProjectImages />
    </GridContainer>
  );
}

export default Portfolio;
