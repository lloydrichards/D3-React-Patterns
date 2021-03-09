import { csv, DSVRowArray } from 'd3';
import { useEffect, useState } from 'react';

export const useCSVData = (
  url: string,
  transform: (rawRow: DSVRowArray<string>) => any,
) => {
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    csv(url).then((resp) => setData(transform(resp)));
  }, []);

  return data;
};
