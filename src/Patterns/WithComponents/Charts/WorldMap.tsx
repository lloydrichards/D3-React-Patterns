import { geoNaturalEarth1, geoPath } from 'd3';
import React from 'react';
import BaseMap from '../Marks/BaseMap';
import SelectCountry from '../Marks/SelectCountry';
import ChartWrapper from '../ChartWrapper';
import useChartDimensions from '../Util/useChartDimensions';

interface Props {
  worldAtlas: {
    land: any;
    countries: any;
    interiors: any;
  } | null;
  selected: string | null;
  onSelect: React.Dispatch<React.SetStateAction<string | null>>;
  height: string;
}

const WorldMap: React.FC<Props> = ({
  worldAtlas,
  selected,
  onSelect,
  height,
}) => {
  const [ref, dms] = useChartDimensions({});

  const projection = geoNaturalEarth1().fitSize(
    [dms.boundedWidth, dms.boundedHeight],
    { type: 'Sphere' },
  );
  const pathGenerator = geoPath().projection(projection);
  return (
    <div ref={ref} style={{ height }}>
      <ChartWrapper dimensions={dms}>
        <BaseMap pathGenerator={pathGenerator} data={worldAtlas} />
        <SelectCountry
          pathGenerator={pathGenerator}
          data={worldAtlas}
          selected={selected}
          onSelect={onSelect}
        />
      </ChartWrapper>
    </div>
  );
};

export default WorldMap;
