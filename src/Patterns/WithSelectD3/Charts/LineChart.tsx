import {
  axisBottom,
  axisLeft,
  extent,
  line,
  NumberValue,
  scaleLinear,
  scaleTime,
} from 'd3';
import React from 'react';
import XTimeAxis from '../Axis/XTimeAxis';
import YLinearAxis from '../Axis/YLinearAxis';
import Line from '../Marks/Line';

interface Props {
  data: Array<
    Array<{ date: Date; population: number; country: string; code: string }>
  >;
  selected: string | null;
  width: number;
  height?: number;
}

const margin = { top: 10, right: 10, bottom: 40, left: 40 };

const LineChart: React.FC<Props> = ({
  data,
  selected,
  width,
  height = 300,
}) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const allData = data.reduce(
    (accumulator, countryTimeseries) => accumulator.concat(countryTimeseries),
    [],
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
  const lineGenerator = line<{
    date: Date;
    population: number;
    country: string;
    code: string;
  }>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.population));

  const selectedData = data.find((countries) => countries[0].code === selected);
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
        xScale={xScale}
        margin={margin}
        innerHeight={innerHeight}
        innerWidth={innerWidth}
      />
      <YLinearAxis
        yScale={yScale}
        margin={margin}
        tickFormat={tickFormat}
        innerHeight={innerHeight}
        innerWidth={innerWidth}
      />
    </svg>
  );
};

export default LineChart;
