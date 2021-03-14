import { axisBottom, axisLeft, select } from 'd3';
import type { NumberValue, ScaleLinear, ScaleTime } from 'd3-scale';
import React, { ReactElement, useEffect, useRef } from 'react';

interface Props {
  yScale: ScaleLinear<number, number, never>;
  tickFormat: (domainValue: NumberValue, index: number) => string;
  innerWidth: number;
  margin: { top: number; left: number; bottom: number; right: number };
  innerHeight: number;
  ticks?: number;
}

const YLinearAxis = ({
  yScale,
  tickFormat,
  innerWidth,
  innerHeight,
  margin,
  ticks = 10,
}: Props): ReactElement => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    // Define Axis
    const yAxis = axisLeft(yScale).tickFormat(tickFormat);
    // Draw Axis
    svg
      .select<SVGGElement>('.y-axis')
      .style('transform', `translate(${margin.left}px, ${margin.top}px)`)
      .attr('color', 'cadetblue')
      .call(yAxis);

    //Draw labels
    svg
      .selectAll('.y-labels')
      .data([0])
      .join('text')
      .attr('class', 'y-labels')
      .attr('fill', 'cadetblue')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        `translate(0, ${(innerHeight - margin.top) / 2}) rotate(-90)`,
      )
      .style('text-anchor', 'end')
      .text('Population');
  }, [innerWidth]);

  return (
    <svg style={{ overflow: 'visible' }} ref={svgRef}>
      <g className="y-axis" />
    </svg>
  );
};

export default YLinearAxis;
