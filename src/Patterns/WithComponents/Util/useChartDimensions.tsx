import { useEffect, useState, useRef } from 'react';
// polyfill for observing changes to element dimensions

import ResizeObserver from 'resize-observer-polyfill';
import type { DimensionsInterface } from '../types';

export const combineChartDimensions = (
  dimensions: DimensionsInterface | any,
) => {
  const parsedDimensions = {
    marginTop: 40,
    marginRight: 30,
    marginBottom: 40,
    marginLeft: 75,
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

const getChartDimensions = (passedSettings: {}) => {
  const ref = useRef();
  const dimensions = combineChartDimensions(passedSettings);

  if (dimensions.width && dimensions.height) return [ref, dimensions];

  const [width, changeWidth] = useState(0);
  const [height, changeHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;
    const resizeObserver = new ResizeObserver((entries: any) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      const entry = entries[0];

      if (width !== entry.contentRect.width) {
        changeWidth(entry.contentRect.width);
      }
      if (height !== entry.contentRect.height) {
        changeHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(element!);

    return () => resizeObserver.unobserve(element!);
  }, []);

  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  return [ref, newSettings];
};

export default getChartDimensions;
