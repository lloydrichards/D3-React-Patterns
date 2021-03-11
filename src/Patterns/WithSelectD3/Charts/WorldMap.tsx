import { geoNaturalEarth1, geoPath } from 'd3';
import React from 'react';
import BaseMap from '../Marks/BaseMap';
import SelectCountry from '../Marks/SelectCountry';

interface Props {
  worldAtlas: {
    land: any;
    countries: any;
    interiors: any;
  } | null;
  selected: string | null;
  onSelect: React.Dispatch<React.SetStateAction<string | null>>;
  width: number;
  height?: number;
}

const WorldMap: React.FC<Props> = ({
  worldAtlas,
  selected,
  onSelect,
  width,
  height = 300,
}) => {
  const projection = geoNaturalEarth1().fitSize([width, height], {
    type: 'Sphere',
  });
  const pathGenerator = geoPath().projection(projection);

  return (
    <svg width={width} height={height}>
      <BaseMap pathGenerator={pathGenerator} data={worldAtlas} />
      <SelectCountry
        pathGenerator={pathGenerator}
        data={worldAtlas}
        selected={selected}
        onSelect={onSelect}
      />
    </svg>
  );
};

export default WorldMap;
