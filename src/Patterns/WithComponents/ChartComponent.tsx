import React from 'react';
import ReactDOM from 'react-dom';
import { scaleSqrt, max } from 'd3';
import { useWorldAtlas } from './Util/useWorldAtlas';
import { useCities } from './Util/useCities';
import { Marks } from './Marks';

const width = 600;
const height = 400;

export const ChartComponent = () => {
  const worldAtlas = useWorldAtlas();
  const cities: Array<{ lat: number; lng: number }> = useCities();

  if (!worldAtlas || !cities) {
    return <pre>Loading...</pre>;
  }

  const sizeValue = (d: any) => d.population;
  const maxRadius = 10;

  const sizeScale = scaleSqrt()
    .domain([0, max(cities, sizeValue || 0)])
    .range([0, maxRadius]);

  return (
    <svg width={width} height={height}>
      <Marks
        width={width}
        height={height}
        worldAtlas={worldAtlas}
        cities={cities}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  );
};
