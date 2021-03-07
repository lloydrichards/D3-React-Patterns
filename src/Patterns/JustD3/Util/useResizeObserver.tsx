import { useState, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = (
  ref: React.MutableRefObject<HTMLObjectElement | null>,
) => {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly>();
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries: Array<any>) => {
      entries.forEach((entry) => setDimensions(entry.contentRect));
    });
    if (observeTarget != null) {
      resizeObserver.observe(observeTarget);
    } else {
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);
  return dimensions;
};

export default useResizeObserver;
