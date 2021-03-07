import { csv } from 'd3';
import { useEffect, useState } from 'react';

export const useData = (url: string, key: string) => {
  const [data, setData] = useState<any | null>(null);
  console.log(data);
  useEffect(() => {
    csv(url).then((resp) => setData(resp.filter((i) => i.Source === key)));
  }, []);

  return data;
};
