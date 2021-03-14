import { axisBottom, select } from 'd3';
import type { NumberValue, ScaleTime } from 'd3-scale';
import React, { ReactElement, useEffect, useRef } from 'react';

interface Props {
  xScale: ScaleTime<number, number, never>;
  innerWidth: number;
  margin: { top: number; left: number; bottom: number; right: number };
  innerHeight: number;
  ticks?: number;
}

const XTimeAxis = ({
  xScale,
  innerWidth,
  innerHeight,
  margin,
  ticks = 10,
}: Props): ReactElement => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    // Define Axis
    const xAxis = axisBottom(xScale).ticks(ticks);

    // Draw Axis
    svg
      .select<SVGGElement>('.x-axis')
      .style(
        'transform',
        `translate(${margin.left}px, ${innerHeight + margin.top}px)`,
      )
      .attr('color', 'cadetblue')
      .call(xAxis);

    //Draw labels
    svg
      .selectAll('.x-labels')
      .data([0])
      .join('text')
      .attr('class', 'x-labels')
      .attr('transform', `translate(${innerWidth / 2}, ${innerHeight + 40})`)
      .attr('fill', 'cadetblue')
      .style('text-anchor', 'middle')
      .text('Year');
  }, [innerWidth]);

  return (
    <svg style={{ overflow: 'visible' }} ref={svgRef}>
      <g className="x-axis" />
    </svg>
  );
};

export default XTimeAxis;
