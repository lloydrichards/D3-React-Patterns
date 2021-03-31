import {
  axisBottom,
  axisLeft,
  curveBasis,
  extent,
  line,
  scaleBand,
  scaleLinear,
  scaleLog,
  scaleTime,
  select,
} from 'd3';
import React, { useEffect, useRef } from 'react';
import ChartWrapper from '../ChartWrapper';
import useChartDimensions from '../Util/useChartDimensions';

// import useResizeObserver from '../Util/useResizeObserver';

interface Props {
  data: Array<
    Array<{ date: Date; population: number; country: string; code: string }>
  >;
  selected: string | null;
  onSelect: React.Dispatch<React.SetStateAction<string | null>>;
  height: string;
}

const BarChart: React.FC<Props> = ({ data, selected, onSelect, height }) => {
  const [ref, dms] = useChartDimensions({});

  return (
    <div ref={ref} style={{ height }}>
      <ChartWrapper dimensions={dms}>
        <div
          style={{
            height: '200px',
            padding: '10px 10px 40px 40px',
            backgroundColor: 'grey',
          }}
        >
          Bar Chart
        </div>
      </ChartWrapper>
    </div>
  );
};

export default BarChart;
