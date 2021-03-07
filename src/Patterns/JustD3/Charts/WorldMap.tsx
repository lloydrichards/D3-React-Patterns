import {
  axisBottom,
  axisLeft,
  curveBasis,
  extent,
  geoGraticule,
  geoNaturalEarth1,
  geoPath,
  line,
  scaleLinear,
  scaleLog,
  scaleTime,
  select,
} from 'd3';
import React, { useEffect, useRef } from 'react';
import useResizeObserver from '../Util/useResizeObserver';

interface Props {
  worldAtlas: {
    land: any;
    countries: any;
    interiors: any;
  } | null;
  selected: string | null;
  onSelect: React.Dispatch<React.SetStateAction<string | null>>;
}

const WorldMap: React.FC<Props> = ({ worldAtlas, selected, onSelect }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef<HTMLObjectElement>(null);
  const dimensions = useResizeObserver(wrapperRef);
  useEffect(() => {
    if (!worldAtlas) return;
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const projection = geoNaturalEarth1().fitSize(
      [dimensions.width, dimensions.height],
      {
        type: 'Sphere',
      },
    );
    const pathGenerator = geoPath().projection(projection);
    const graticule = geoGraticule();

    svg
      .selectAll('.sphere')
      .data([1])
      .join('path')
      .attr('class', 'sphere')
      .attr('fill', 'rgba(255,255,255,0.05)')
      .attr('d', pathGenerator({ type: 'Sphere' }) || '');

    svg
      .selectAll('.land')
      .data(worldAtlas.land.features.map((d: any) => d))
      .join('path')
      .attr('class', 'land')
      .attr('d', (d: any) => pathGenerator(d));
    svg
      .selectAll('.interior')
      .data([worldAtlas.interiors])
      .join('path')
      .attr('class', 'interior')
      .attr('fill', 'none')
      .attr('stroke', 'grey')
      .attr('d', (d: any) => pathGenerator(d));
    svg
      .selectAll('.interior')
      .data(worldAtlas.countries.features)
      .join('path')
      .attr('class', 'interior')
      .attr('fill', 'tomato')
      .attr('d', (d: any) => pathGenerator(d))
      .on('click', (i, d: any) => onSelect(d.id));
  }, [dimensions, worldAtlas]);

  return (
    <div style={{ height: '300px' }} ref={wrapperRef}>
      <svg style={{ overflow: 'visible' }} ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default WorldMap;
