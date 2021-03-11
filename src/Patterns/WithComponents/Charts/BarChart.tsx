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
import useResizeObserver from '../Util/useResizeObserver';

interface Props {
  data: Array<
    Array<{ date: Date; population: number; country: string; code: string }>
  >;
  selected: string | null;
  onSelect: React.Dispatch<React.SetStateAction<string | null>>;
  width: number;
}

const BarChart: React.FC<Props> = ({ data, selected, onSelect, width }) => {
  return (
    <div
      style={{
        height: '200px',
        padding: '10px 10px 40px 40px',
        backgroundColor: 'grey',
      }}
    >
      Bar Chart
    </div>
  );
};

export default BarChart;
