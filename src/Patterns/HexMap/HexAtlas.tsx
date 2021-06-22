import {
  GeoContext,
  geoNaturalEarth1,
  geoPath,
  max,
  polygonContains,
  scaleLinear,
  scaleQuantize,
  select,
} from 'd3';
import { hexbin } from 'd3-hexbin';
import type { Feature, Geometry, MultiPolygon, Polygon } from 'geojson';
import React, { useEffect, useRef } from 'react';
import {
  COLOUR_ACCENT,
  COLOUR_BRAND,
  COLOUR_DARK,
  COLOUR_SUBTLE,
} from './styles/colours';
import useResizeObserver from './Util/useResizeObserver';

interface Data {
  category: string;
  quantity: number;
}

interface Props {
  data: Array<Data & { code: string }>;
  world: {
    land: Feature<Geometry | null>;
    countries: Array<Feature<Polygon | MultiPolygon | null>>;
  } | null;
}

const HexAtlas: React.FC<Props> = ({ data, world }) => {
  const svgRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;
    if (!world) return;
    if (!canvasRef) return;
    //D3 Code goes here!
    const context = canvasRef.current?.getContext('2d');
    const projection = geoNaturalEarth1().fitSize(
      [dimensions.width, dimensions.height * 1.15],
      {
        type: 'Sphere',
      },
    );
    const hexScale = hexbin<{ x: number; y: number }>()
      .extent([
        [0, 0],
        [dimensions.width, dimensions.height],
      ])
      .radius(8)
      .x((d) => d.x)
      .y((d) => d.y);

    const colours = scaleLinear<string, string>()
      .domain([0, max(data, (d) => d.quantity) || 0])
      .range([COLOUR_ACCENT, COLOUR_BRAND]);

    const hex_points = (selected?: Array<string | number | undefined>) => {
      //Set up the projections
      const pathGenerator = geoPath()
        .projection(projection)
        .context(context as GeoContext);

      //Create a land shape | Filter out Antarctica
      const world_features = world.countries
        .filter((i) => i.id !== '010')
        .filter((i) => (selected ? selected.includes(i.id) : true));

      // Initialize the context’s path with the desired boundary (nothing is drawn to the screen)
      context?.beginPath();
      world_features.forEach((d) => pathGenerator(d));

      //Figure out the hexagon grid dimensions
      const hexGrid = hexScale
        .centers()
        .filter((h) => context?.isPointInPath(h[0], h[1]))
        .map((h) => ({ x: h[0], y: h[1] }));

      return hexGrid;
    };

    svg
      .selectAll('.base-grid')
      .data([1])
      .join('g')
      .attr('class', 'base-grid')
      .selectAll('path')
      .data(hexScale(hex_points()))
      .join('path')
      .attr('d', (d) => hexScale.hexagon())
      .attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      })
      .attr('fill', COLOUR_DARK)
      .style('stroke', COLOUR_SUBTLE)
      .style('stroke-width', 1);

    svg
      .selectAll('.hexagon')
      .data(data)
      .join('g')
      .attr('class', 'hexagon')
      .selectAll('path')
      .data((d) => hexScale(hex_points([d.code])).map((m) => ({ ...m, ...d })))
      .join('path')
      .attr('d', (d) => hexScale.hexagon())
      .attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      })
      .attr('fill', (d) => colours(d.quantity) || COLOUR_SUBTLE)
      .style('stroke', COLOUR_DARK)
      .style('stroke-width', 1);
  }, [data, dimensions, world, canvasRef]);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={wrapperRef}>
      <canvas
        style={{
          width: dimensions?.width,
          height: dimensions?.height,
          position: 'absolute',
          visibility: 'hidden',
        }}
        ref={canvasRef}
      />
      <svg
        style={{ overflow: 'visible' }}
        ref={svgRef}
        width="50%"
        height="50%"
      >
        <g className="x-axis" />
      </svg>
    </div>
  );
};

export default HexAtlas;
