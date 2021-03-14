import {
  axisBottom,
  axisLeft,
  curveBasis,
  extent,
  line,
  scaleLinear,
  scaleLog,
  scaleTime,
  select,
} from 'd3';
import React, { useEffect, useRef } from 'react';
import Line from '../Marks/Line';
import useResizeObserver from '../Util/useResizeObserver';
import ChartWrapper from '../ChartWrapper';
import getChartDimensions from '../Util/useChartDimensions';
import Lines from '../Marks/Lines';
import Axis from '../Axis/Axis';

interface Props {
  data: Array<
    Array<{ date: Date; population: number; country: string; code: string }>
  >;
  selected: string | null;
  // width: number;
  // height?: number;
}

const margin = { top: 10, right: 10, bottom: 40, left: 40 };

const chartSettings = {
  marginRight: 10,
};

const LineChart: React.FC<Props> = ({
  data,
  selected,
  // width,
  // height = 250,
}) => {
  const [ref, dms] = getChartDimensions(chartSettings);
  // const innerWidth = width - margin.left - margin.right;
  // const innerHeight = height - margin.top - margin.bottom;

  const allData = data.reduce(
    (accumulator, countryTimeseries) => accumulator.concat(countryTimeseries),
    [],
  );

  // Define Accessors
  const xAccessor = (d: any) => d.date;
  const yAccessor = (d: any) => d.population;

  // Define Scales
  const xScale = scaleTime()
    .domain(extent(allData, (d) => d.date) as [Date, Date])
    .range([0, innerWidth])
    .nice();
  const yScale = scaleLinear()
    .domain(extent(allData, (d) => +d.population) as [number, number])
    .range([innerHeight, 0])
    .nice();

  // Define Axis
  const xAxis = axisBottom(xScale).ticks(5);
  const yAxis = axisLeft(yScale).tickFormat(
    (d) => `${(d as number) / 1000000}M`,
  );

  const yAxisTickFormat = (d: any) => `${(d as number) / 1000000}M`;
  // Define Shapes

  const selectedData = data.find((countries) => countries[0].code === selected);
  return (
    <div className="line-chart" ref={ref} style={{ height: '600px' }}>
      <ChartWrapper dimensions={dms}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {data.map((d) => (
            <Lines
              xScale={xScale}
              yScale={yScale}
              xAccessor={xAccessor}
              yAccessor={yAccessor}
              data={d}
            />
          ))}
          {/* {selectedData && (
            <Lines selected d={selectedData} />
          )} */}
          <Axis dimensions={dms} dimension="x" scale={xScale} />
          <Axis
            dimensions={dms}
            dimension="y"
            scale={yScale}
            tickFormat={yAxisTickFormat}
          />
        </g>
      </ChartWrapper>
    </div>
  );
};

export default LineChart;
