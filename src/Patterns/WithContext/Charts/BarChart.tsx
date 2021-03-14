import {
  axisBottom,
  axisLeft,
  curveBasis,
  extent,
  line,
  NumberValue,
  scaleBand,
  scaleLinear,
  scaleLog,
  scaleTime,
  select,
  tickFormat,
} from 'd3';
import React, { useEffect, useRef } from 'react';
import XLinearAxis from '../Axis/XLinearAxis';
import YBandAxis from '../Axis/YBandAxis';
import { useDashboard } from '../Dashboard';
import Bar from '../Marks/Bar';
import useResizeObserver from '../Util/useResizeObserver';

interface Props {
  height?: number;
}

const margin = { top: 10, right: 10, bottom: 40, left: 40 };

const BarChart: React.FC<Props> = ({ height = 300 }) => {
  const { width, selected, setSelected, data } = useDashboard();
  const innerWidth = width || 0 - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  !data && <div>Loading...</div>;
  const latestData = data.map((d) => d[d.length - 1]).slice(0, 25);

  // Format
  const tickFormat = (domainValue: NumberValue, index: number) =>
    `${(domainValue as number) / 1000000}M`;

  //Scale
  const xScale = scaleLinear()
    .domain(extent(latestData, (d) => +d.population) as [number, number])
    .range([0, innerWidth])
    .nice();
  const yScale = scaleBand()
    .domain(latestData.map((i) => i.country))
    .range([0, innerHeight])
    .paddingInner(0.2);

  return (
    <svg style={{ overflow: 'visible' }} width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {latestData &&
          latestData.map((country) => (
            <Bar
              key={`bar-${country.code}`}
              height={yScale.bandwidth()}
              width={xScale(country.population)}
              y={yScale(country.country) || 0}
              selected={country.code === selected}
              onSelect={() => setSelected(country.code)}
            />
          ))}
      </g>
      <XLinearAxis
        innerHeight={innerHeight}
        innerWidth={innerWidth}
        margin={margin}
        tickFormat={tickFormat}
        xScale={xScale}
      />
      <YBandAxis
        innerHeight={innerHeight}
        innerWidth={innerWidth}
        margin={margin}
        yScale={yScale}
      />
    </svg>
  );
};

export default BarChart;
