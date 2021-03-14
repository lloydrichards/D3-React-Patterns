import { axisBottom, axisLeft, select } from 'd3';
import type { NumberValue, ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import React, { ReactElement, useEffect, useRef } from 'react';

interface Props {
  yScale: ScaleBand<string>;
  innerWidth: number;
  margin: { top: number; left: number; bottom: number; right: number };
  innerHeight: number;
  ticks?: number;
}

const YLinearAxis = ({
  yScale,
  innerWidth,
  innerHeight,
  margin,
  ticks = 10,
}: Props): ReactElement => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    // Define Axis
    const yAxis = axisLeft(yScale).ticks(ticks);
    // Draw Axis
    svg
      .select<SVGGElement>('.y-axis')
      .style('transform', `translate(${margin.left}px, ${margin.top}px)`)
      .attr('color', 'cadetblue')
      .call(yAxis);
  }, [innerWidth]);

  return (
    <svg style={{ overflow: 'visible' }} ref={svgRef}>
      <g className="y-axis" />
    </svg>
  );
};

export default YLinearAxis;
