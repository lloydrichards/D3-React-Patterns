import { extent, timeFormat, scaleLinear, scaleTime } from 'd3';
import React, { useEffect, useRef } from 'react';
import ChartWrapper from '../ChartWrapper';
import useChartDimensions from '../Util/useChartDimensions';
import Lines from '../Marks/Lines';
import Axis from '../Marks/Axis';

interface Props {
  data: Array<
    Array<{
      date: Date;
      population: number;
      country: string;
      code: string;
      height: string;
    }>
  >;
  height: string;
  selected: string | null;
}

type d = {
  date: Date;
  population: number;
  country: string;
  code: string;
  height: string;
};
const chartSettings = {
  marginRight: 20,
};

const LineChart: React.FC<Props> = ({ data, selected, height }) => {
  const [ref, dms] = useChartDimensions(chartSettings);
  const allData = data.reduce(
    (accumulator, countryTimeseries) => accumulator.concat(countryTimeseries),
    [],
  );
  const xLabel = 'Year';
  const yLabel = 'Population';

  // Define Accessors
  const formatDate = timeFormat('%-Y');
  const xAccessor = (d: d) => d.date;
  const yAccessor = (d: d) => +d.population;

  // Define Scales
  const xScale = scaleTime()
    .domain(extent(allData, xAccessor) as [Date, Date])
    .range([0, dms.boundedWidth])
    .nice();
  const yScale = scaleLinear()
    .domain(extent(allData, (d) => +d.population) as [number, number])
    .range([dms.boundedHeight, 0])
    .nice();

  //Scale to pass
  const yAxisFormatTick = (d: any) => `${(d as number) / 1000000}M`;
  const xAccessorScaled = (d: d) => xScale(xAccessor(d));
  const yAccessorScaled = (d: d) => yScale(yAccessor(d));

  const selectedData = data.find((countries) => countries[0].code === selected);
  return (
    <div className="line-chart" ref={ref} style={{ height }}>
      <ChartWrapper dimensions={dms}>
        <>
          <Lines
            xAccessor={xAccessorScaled}
            yAccessor={yAccessorScaled}
            data={data}
            selected={selectedData}
          />
          <Axis
            dimension="x"
            scale={xScale}
            label={xLabel}
            formatTick={formatDate}
          />
          <Axis
            dimension="y"
            scale={yScale}
            formatTick={yAxisFormatTick}
            label={yLabel}
          />
        </>
      </ChartWrapper>
    </div>
  );
};

export default LineChart;
