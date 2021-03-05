import React from 'react';
import { geoNaturalEarth1, geoPath, geoGraticule, ScalePower } from 'd3';

interface Props {
  width: number;
  height: number;
  worldAtlas: { land: any; interiors: any };
  cities: Array<{
    lat: number;
    lng: number;
  }>;
  sizeScale: ScalePower<number, number, never>;
  sizeValue: (d: any) => any;
}

export const Marks: React.FC<Props> = ({
  worldAtlas: { land, interiors },
  cities,
  sizeScale,
  sizeValue,
  width,
  height,
}) => {
  const projection = geoNaturalEarth1().fitSize([width, height], {
    type: 'Sphere',
  });
  const path = geoPath(projection);
  const graticule = geoGraticule();
  return (
    <g className="marks">
      <path className="sphere" d={path({ type: 'Sphere' }) || ''} />
      <path className="graticules" d={path(graticule()) || ''} />
      {land.features.map((feature: any) => (
        <path className="land" d={path(feature) || ''} />
      ))}
      <path className="interiors" d={path(interiors) || ''} />
      {cities.map((d) => {
        const [x, y] = projection([d.lng, d.lat]) as [number, number];
        return <circle cx={x} cy={y} r={sizeScale(sizeValue(d))} />;
      })}
    </g>
  );
};
