import type { GeoPath, GeoPermissibleObjects } from 'd3';
import React from 'react';

interface Props {
  pathGenerator: GeoPath<any, GeoPermissibleObjects>;
  data: {
    land: any;
    countries: any;
    interiors: any;
  } | null;
  selected: string | null;
  onSelect: React.Dispatch<React.SetStateAction<string | null>>;
}

const SelectCountry: React.FC<Props> = ({
  pathGenerator,
  data,
  selected,
  onSelect,
}) => {
  return (
    <g>
      {data &&
        data.countries.features.map((d: any, i: number) => (
          <path
            key={i}
            fill="tomato"
            opacity={d.id === selected ? 1 : 0}
            className="features"
            d={pathGenerator(d) || ''}
            onClick={() => onSelect(d.id)}
          />
        ))}
    </g>
  );
};

export default SelectCountry;
