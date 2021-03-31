import { line, curveMonotoneX } from 'd3';
import React from 'react';

interface LineProps {
  data: Array<
    Array<{ date: Date; population: number; country: string; code: string }>
  >;
  yAccessor: any;
  xAccessor: any;
  selected: any;
}
export default function Lines({
  data,
  yAccessor,
  xAccessor,
  selected,
}: LineProps) {
  const lineGenerator = line<{
    date: Date;
    population: number;
    country: string;
    code: string;
  }>()
    .x(xAccessor)
    .y(yAccessor);
  // .curve(curveMonotoneX);

  return (
    <>
      {data.map((d: any) => (
        <path
          className="Line"
          d={lineGenerator(d) || '{}'}
          stroke={selected ? 'tomato' : 'grey'}
          strokeWidth={selected ? 3 : 1}
          opacity={selected ? 1 : 0.3}
          fill="none"
        />
      ))}
    </>
  );
}
