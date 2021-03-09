import {csv} from "../../../../snowpack/pkg/d3.js";
import {useEffect, useState} from "../../../../snowpack/pkg/react.js";
export const useCSVData = (url, transform) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    csv(url).then((resp) => setData(transform(resp)));
  }, []);
  return data;
};
