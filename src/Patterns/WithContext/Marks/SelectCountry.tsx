import type { GeoPath, GeoPermissibleObjects } from 'd3';
import React from 'react';
import { useDashboard } from '../Dashboard';

interface Props {
  pathGenerator: GeoPath<any, GeoPermissibleObjects>;
  data: {
    land: any;
    countries: any;
    interiors: any;
  } | null;
}

const SelectCountry: React.FC<Props> = ({ pathGenerator, data }) => {
  const { selected, setSelected } = useDashboard();
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
            onClick={() => setSelected(d.id)}
          />
        ))}
    </g>
  );
};

export default SelectCountry;
