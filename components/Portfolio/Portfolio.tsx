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
import useObserver from '@/hooks/UseObserver';
import useDeviceDims from '@/hooks/UseDeviceDims';
import { HW_RATIO_PHONE, HW_RATIO_TABLET } from '@/config/variables';

type Project = {
  count: number;
  title: string;
  role: string;
  description: string;
  purpose: string;
};

const projects: Record<string, Project> = {
  trivialno: {
    count: 1,
    title: 'Trivialno',
    role: 'Full Stack Developer • System Architect',
    description:
      "An online platform for Math tutors, school students, and their parents. Enables tutors and students to sign up, schedule online lessons, and engage in lessons through the app's integrated video bridge. Comprised of three web apps, a company website, and a microservice backend.",
    purpose: 'SPA & Website',
  },
  trialBi: {
    count: 2,
    title: 'Trial Bi',
    role: 'Full Stack Developer • UI/UX Designer',
    description:
      'A BI system for clinical trial data, providing capabilities for data selection, filtering, sorting, and aggregation. The system allows users to gain initial insights and prepare data for further analysis in statistical software.',
    purpose: 'Web App',
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
        className={classNames('absolute w-full h-full bg-white')}
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
    <div
      style={{
        marginBottom: 'var(--gutter)',
        gap: '80vh',
        paddingTop: '100vh',
        paddingBottom: '100vh',
      }}
      className={classNames(
        'flex flex-col bg-gray-100/50',
        'col-start-1 col-span-4',
        'md:col-start-5 md:col-span-4',
        'lg:col-start-7 lg:col-span-6',
        'xl:col-start-7 xl:col-span-6'
      )}
    >
      <TrivialnoImages />
      <TrialBiImages />
      <CardioImages />
    </div>
  );
}

function TrivialnoImages() {
  const { setCurrentView } = React.useContext(CurrentViewContext);
  const wrapperRef = React.useRef(null);
  const [tabletHeight, tabletWidth] = useDeviceDims(
    wrapperRef,
    HW_RATIO_TABLET,
    'landscape'
  );
  const [phoneHeight, phoneWidth] = useDeviceDims(wrapperRef, HW_RATIO_PHONE);
  const { scrollY } = useScroll({ target: wrapperRef });

  useObserver(wrapperRef, () => setCurrentView('trivialno'), { threshold: 0 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!document) return;
    if (!wrapperRef.current) return;

    const viewHeight = document.documentElement.clientHeight;
    const container = wrapperRef.current as HTMLDivElement;
    const rect = container.getBoundingClientRect();
    const delta = viewHeight * 1.5 - rect.top;
    const [image1, image2, image3, image4] =
      container.children as unknown as HTMLElement[];

    image1.style.transform = `translateY(-${delta * 1.1}px)`;
    image2.style.transform = `translateY(-${delta * 1.9}px)`;
    image3.style.transform = `translateY(-${delta * 0.3}px)`;
    image4.style.transform = `translateY(-${delta * 2.8}px)`;
  });

  return (
    <div
      ref={wrapperRef}
      className={classNames('relative w-full bg-cyan-200/50 grid')}
      style={{ height: '25vh' }}
    >
      <Image
        src="/images/trivialno-online-lesson.png"
        alt=""
        height={tabletHeight}
        width={tabletWidth}
        className={classNames('absolute')}
        style={{
          top: '40vh',
          left: 0,
          zIndex: 1,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
      <Image
        src="/images/trivialno-select-tutor.png"
        alt=""
        height={phoneHeight * 0.9}
        width={phoneWidth * 0.9}
        className={classNames('absolute')}
        style={{
          top: tabletHeight * 3 + 'px',
          right: '1vw',
          zIndex: 2,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
      <Image
        src="/images/trivialno-sign-up.png"
        alt=""
        height={phoneHeight * 0.75}
        width={phoneWidth * 0.75}
        className={classNames('absolute')}
        style={{
          top: tabletHeight * 0.25 + 'px',
          left: '1vw',
          transformOrigin: 'left top',
          zIndex: 3,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
      <Image
        src="/images/trivialno-study-schedule.png"
        alt=""
        height={phoneHeight * 0.7}
        width={phoneWidth * 0.7}
        className={classNames('absolute')}
        style={{
          top: tabletHeight * 5.7 + 'px',
          right: tabletWidth * 0.4 + 'px',
          transformOrigin: 'right top',
          zIndex: 4,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
    </div>
  );
}

function TrialBiImages() {
  const { setCurrentView } = React.useContext(CurrentViewContext);
  const wrapperRef = React.useRef(null);
  const [height, width] = useDeviceDims(
    wrapperRef,
    HW_RATIO_TABLET,
    'landscape'
  );

  const { scrollY } = useScroll({ target: wrapperRef });

  useObserver(wrapperRef, () => setCurrentView('trialBi'), { threshold: 0 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!wrapperRef.current) return;

    const viewHeight = document.documentElement.clientHeight;
    const container = wrapperRef.current as HTMLDivElement;
    const rect = container.getBoundingClientRect();
    const delta = viewHeight * 1.5 - rect.top;
    const [image1, image2] = container.children as unknown as HTMLElement[];
    // console.log({ latest, top: rect.top, delta });
    image1.style.transform = `translateY(-${delta * 1.25}px)`;
    image2.style.transform = `translateY(-${delta * 0.5}px)`;
  });

  return (
    <div
      ref={wrapperRef}
      className={classNames('relative w-full bg-cyan-200/50 grid')}
      style={{ height: '25vh' }}
    >
      <Image
        src="/images/trial-bi-main-h.png"
        alt=""
        height={height}
        width={width}
        className={classNames('absolute')}
        style={{
          top: '40vh',
          left: 0,
          zIndex: 1,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
      <Image
        src="/images/trial-bi-query-v.png"
        alt=""
        height={width * 0.8}
        width={height * 0.8}
        className={classNames('absolute')}
        style={{
          top: height * 0.3 + 'px',
          right: '1vw',
          zIndex: 2,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
    </div>
  );
}

function CardioImages() {
  const { setCurrentView } = React.useContext(CurrentViewContext);
  const wrapperRef = React.useRef(null);
  const [height, width] = useDeviceDims(wrapperRef, HW_RATIO_PHONE);
  const { scrollY } = useScroll({ target: wrapperRef });

  useObserver(wrapperRef, () => setCurrentView('cardio'), { threshold: 0 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!document) return;
    if (!wrapperRef.current) return;

    const viewHeight = document.documentElement.clientHeight;
    const container = wrapperRef.current as HTMLDivElement;
    const rect = container.getBoundingClientRect();
    const delta = viewHeight * 1.5 - rect.top;
    const [image1, image2, image3, image4] =
      container.children as unknown as HTMLElement[];

    image1.style.transform = `translateY(-${delta * 1}px)`;
    image2.style.transform = `translateY(-${delta * 0.6}px)`;
    image3.style.transform = `translateY(-${delta * 0.4}px)`;
    image4.style.transform = `translateY(-${delta * 0.2125}px)`;
  });

  return (
    <div
      ref={wrapperRef}
      className={classNames('relative w-full bg-cyan-200/50 grid')}
      style={{ height: '25vh' }}
    >
      <Image
        src="/images/cardio-main.png"
        alt=""
        height={height}
        width={width}
        className={classNames('absolute')}
        style={{
          top: '40vh',
          left: 0,
          zIndex: 3,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
      <Image
        src="/images/cardio-card.png"
        alt=""
        height={height * 0.9}
        width={width * 0.9}
        className={classNames('absolute')}
        style={{
          top: 'calc(80vh * 0.2)',
          right: 0,
          zIndex: 4,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
      <Image
        src="/images/cardio-create-test.png"
        alt=""
        height={height * 0.75}
        width={width * 0.75}
        className={classNames('absolute')}
        style={{
          top: 'calc(57.5vh + 0rem)',
          left: 'calc(80vh / 2 * (0.25 - 0.075))',
          transformOrigin: 'left top',
          zIndex: 1,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
      <Image
        src="/images/cardio-test.png"
        alt=""
        height={height * 0.65}
        width={width * 0.65}
        className={classNames('absolute')}
        style={{
          top: 'calc(47.5vh + 0rem)',
          right: 'calc(80vh / 2 * (0.2 - 0.025))',
          transformOrigin: 'right top',
          zIndex: 2,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
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
