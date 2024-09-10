import { useContext, useRef } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { useMotionValueEvent, useScroll } from 'framer-motion';

import { HW_RATIO_PHONE } from '@/config/variables';
import useDeviceDims from '@/hooks/UseDeviceDims';
import useObserver from '@/hooks/UseObserver';
import { CurrentViewContext } from '@/components/landing/CurrentViewProvider';

function ProjectCardioImages() {
  const { setCurrentView } = useContext(CurrentViewContext);
  const wrapperRef = useRef(null);
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
    image3.style.transform = `translateY(-${delta * 0.375}px)`;
    image4.style.transform = `translateY(-${delta * 0.2125}px)`;
  });

  return (
    <div
      ref={wrapperRef}
      className={classNames('relative w-full grid')}
      style={{ height: '25vh' }}
    >
      <Image
        src="/images/cardio-main.png"
        alt="Main menu screen, smartphone view"
        height={height}
        width={width}
        style={{
          position: 'absolute',
          top: '40vh',
          left: 0,
          zIndex: 3,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      />
      <Image
        src="/images/cardio-card.png"
        alt="Card screen with an illustrated question and an answer, smartphone view"
        height={height * 0.9}
        width={width * 0.9}
        style={{
          position: 'absolute',
          top: 'calc(80vh * 0.2)',
          right: 0,
          zIndex: 4,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      />
      <Image
        src="/images/cardio-create-test.png"
        alt="Test builder screen, smartphone view"
        height={height * 0.75}
        width={width * 0.75}
        style={{
          position: 'absolute',
          top: 'calc(57.5vh + 0rem)',
          left: '4vw',
          transformOrigin: 'left top',
          zIndex: 1,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      />
      <Image
        src="/images/cardio-test.png"
        alt="Test screen with a multiple choice question, smartphone view"
        height={height * 0.65}
        width={width * 0.65}
        style={{
          position: 'absolute',
          top: 'calc(50vh + 0rem)',
          right: '4vw',
          transformOrigin: 'right top',
          zIndex: 2,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      />
    </div>
  );
}

export default ProjectCardioImages;
