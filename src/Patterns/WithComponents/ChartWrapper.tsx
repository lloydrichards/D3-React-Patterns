import React, { createContext, useContext } from 'react';
import type { DimensionsInterface } from './types';

const ChartContext = createContext({});
export const useChartDimensions = () => useContext(ChartContext);

interface ChartInterface {
  dimensions: DimensionsInterface;
  children: any;
}
const Chart = ({ dimensions, children }: ChartInterface) => (
  <ChartContext.Provider value={dimensions}>
    <svg className="Chart" width={dimensions.width} height={dimensions.height}>
      <g
        transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
      >
        {children}
      </g>
    </svg>
  </ChartContext.Provider>
);

export default Chart;
