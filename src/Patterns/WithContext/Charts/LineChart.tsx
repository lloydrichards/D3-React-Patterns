import {
  axisBottom,
  axisLeft,
  extent,
  line,
  NumberValue,
  scaleLinear,
  scaleTime,
} from 'd3';
import React, { useMemo } from 'react';
import XTimeAxis from '../Axis/XTimeAxis';
import YLinearAxis from '../Axis/YLinearAxis';
import { useDashboard } from '../Dashboard';
import Line from '../Marks/Line';

interface Props {
  height?: number;
}

const margin = { top: 10, right: 10, bottom: 40, left: 40 };

const LineChart: React.FC<Props> = ({ height = 300 }) => {
  const { width, selected, data, scales } = useDashboard();

  const innerWidth = width || 0 - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const allData = useMemo(
    () =>
      data.reduce(
        (accumulator, countryTimeseries) =>
          accumulator.concat(countryTimeseries),
        [],
      ),
    [data],
  );

  // Define Scales
  const xScale = scaleTime()
    .domain(extent(allData, (d) => d.date) as [Date, Date])
    .range([0, innerWidth])
    .nice();
  const yScale = scaleLinear()
    .domain(extent(allData, (d) => +d.population) as [number, number])
    .range([innerHeight, 0])
    .nice();

  // Format
  const tickFormat = (domainValue: NumberValue, index: number) =>
    `${(domainValue as number) / 1000000}M`;

  // Define Shapes
  const lineGenerator = useMemo(
    () =>
      line<{
        date: Date;
        population: number;
        country: string;
        code: string;
      }>()
        .x((d) => scales.TimeScale.range([0, innerWidth])(d.date))
        .y((d) => scales.PopulationScale.range([innerHeight, 0])(d.population)),
    [scales, innerWidth, innerHeight],
  );

  const selectedData = useMemo(
    () => data.find((countries) => countries[0].code === selected),
    [data, selected],
  );
  return (
    <svg style={{ overflow: 'visible' }} width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {data.map((country) => (
          <Line key={country[0].code} d={lineGenerator(country) || ''} />
        ))}
        {selectedData && (
          <Line selected d={lineGenerator(selectedData) || ''} />
        )}
      </g>
      <XTimeAxis
        xScale={scales.TimeScale.range([0, innerWidth])}
        margin={margin}
        innerHeight={innerHeight}
        innerWidth={innerWidth}
      />
      <YLinearAxis
        yScale={scales.PopulationScale.range([innerHeight, 0])}
        margin={margin}
        tickFormat={tickFormat}
        innerHeight={innerHeight}
        innerWidth={innerWidth}
      />
    </svg>
  );
};

export default LineChart;
