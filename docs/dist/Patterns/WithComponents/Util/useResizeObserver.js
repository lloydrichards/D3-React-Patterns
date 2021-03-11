import {useState, useEffect} from "../../../../snowpack/pkg/react.js";
import ResizeObserver from "../../../../snowpack/pkg/resize-observer-polyfill.js";
const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState();
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
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
