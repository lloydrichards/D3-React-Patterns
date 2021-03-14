import { geoGraticule, GeoPath, GeoPermissibleObjects } from 'd3';
import React from 'react';

interface Props {
  pathGenerator: GeoPath<any, GeoPermissibleObjects>;
  data: {
    land: any;
    countries: any;
    interiors: any;
  } | null;
}

const BaseMap: React.FC<Props> = ({ pathGenerator, data }) => {
  const graticule = geoGraticule();
  return (
    <g>
      <path
        className="sphere"
        fill="rgba(255,255,255,0.05)"
        d={pathGenerator({ type: 'Sphere' }) || ''}
      />
      <path
        className="graticule"
        fill="none"
        stroke="grey"
        opacity="0.2"
        d={pathGenerator(graticule()) || ''}
      />
      {data &&
        data.land.features.map((d: any, i: number) => (
          <path
            key={`base-${i}`}
            fill="grey"
            opacity="0.5"
            className="land"
            d={pathGenerator(d) || ''}
          />
        ))}
      <path
        fill="none"
        stroke="#184240"
        className="interior"
        d={pathGenerator(data?.interiors) || ''}
      />
    </g>
  );
};

export default BaseMap;
