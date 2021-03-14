import { geoNaturalEarth1, geoPath } from 'd3';
import React, { useMemo } from 'react';
import { useDashboard } from '../Dashboard';
import BaseMap from '../Marks/BaseMap';
import SelectCountry from '../Marks/SelectCountry';

interface Props {
  worldAtlas: {
    land: any;
    countries: any;
    interiors: any;
  } | null;
  height?: number;
}

const WorldMap: React.FC<Props> = ({ worldAtlas, height = 300 }) => {
  const { width } = useDashboard();

  const pathGenerator = useMemo(() => {
    const projection = geoNaturalEarth1().fitSize([width || 0, height], {
      type: 'Sphere',
    });
    return geoPath().projection(projection);
  }, [width, height]);

  return (
    <svg width={width} height={height}>
      <BaseMap pathGenerator={pathGenerator} data={worldAtlas} />
      <SelectCountry pathGenerator={pathGenerator} data={worldAtlas} />
    </svg>
  );
};

export default WorldMap;
