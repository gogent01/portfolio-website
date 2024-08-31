import * as React from 'react';
import { CurrentViewContext } from '@/components/CurrentViewProvider';
import useDeviceDims from '@/hooks/UseDeviceDims';
import { HW_RATIO_PHONE } from '@/config/variables';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import useObserver from '@/hooks/UseObserver';
import classNames from 'classnames';
import Image from 'next/image';

function ProjectCardioImages() {
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
          left: '4vw',
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
          top: 'calc(50vh + 0rem)',
          right: '4vw',
          transformOrigin: 'right top',
          zIndex: 2,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
    </div>
  );
}

export default ProjectCardioImages;
