import { useEffect, useState, useRef } from 'react';
// polyfill for observing changes to element dimensions

import ResizeObserver from 'resize-observer-polyfill';
import type { DimensionsInterface } from '../types';

export const getChartDimensions = (dimensions: any) => {
  let parsedDimensions = {
    marginTop: 40,
    marginRight: 30,
    marginBottom: 60,
    marginLeft: 100,
    ...dimensions,
  };

  return {
    ...parsedDimensions,
    boundedHeight: Math.max(
      parsedDimensions.height -
        parsedDimensions.marginTop -
        parsedDimensions.marginBottom,
      0,
    ),
    boundedWidth: Math.max(
      parsedDimensions.width -
        parsedDimensions.marginLeft -
        parsedDimensions.marginRight,
      0,
    ),
  };
};

const useChartDimensions = (passedSettings: any) => {
  const ref = useRef();
  const dimensions = getChartDimensions(passedSettings);
  const [width, changeWidth] = useState(0);
  const [height, changeHeight] = useState(0);

  useEffect(() => {
    if (dimensions.width && dimensions.height) return [ref, dimensions];

    const element = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      const entry = entries[0];

      if (width !== entry.contentRect.width)
        changeWidth(entry.contentRect.width);
      if (height !== entry.contentRect.height)
        changeHeight(entry.contentRect.height);
    });
    console.log(element);

    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
  }, [passedSettings, height, width, dimensions]);

  const newSettings = getChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  return [ref, newSettings];
};
export default useChartDimensions;
