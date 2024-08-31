import * as React from 'react';

function useDeviceDims(
  ref: React.RefObject<HTMLElement>,
  HW_RATIO: number,
  orientation: 'portrait' | 'landscape' = 'portrait'
) {
  const [dims, setDims] = React.useState<number[]>([0, 0]);

  const recalculateHW = React.useCallback(() => {
    const viewHeight = document.documentElement.clientHeight;
    const container = ref.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const maxHeight = viewHeight * 0.8;
    const maxWidth = rect.width;

    let height = maxHeight;
    let width = maxWidth;

    if (orientation === 'portrait') {
      if (height / HW_RATIO > maxWidth) {
        height = width * HW_RATIO;
      } else if (width * HW_RATIO > maxHeight) {
        width = height / HW_RATIO;
      }
    } else {
      [height, width] = [width, height];
      if (height * HW_RATIO > maxWidth) {
        height = maxWidth / HW_RATIO;
        width = maxWidth;
      } else if (width / HW_RATIO > maxHeight) {
        height = maxHeight;
        width = maxHeight * HW_RATIO;
      }
    }

    const nextDims = [height, width];
    setDims(nextDims);
  }, [ref, HW_RATIO, orientation]);

  React.useEffect(() => {
    recalculateHW();

    window.addEventListener('resize', recalculateHW);

    return () => {
      window.removeEventListener('resize', recalculateHW);
    };
  }, [recalculateHW]);

  return dims;
}

export default useDeviceDims;
