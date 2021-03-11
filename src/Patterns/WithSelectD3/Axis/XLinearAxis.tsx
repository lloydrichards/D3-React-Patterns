import { axisBottom, axisLeft, select } from 'd3';
import type { NumberValue, ScaleLinear, ScaleTime } from 'd3-scale';
import React, { ReactElement, useEffect, useRef } from 'react';

interface Props {
  xScale: ScaleLinear<number, number, never>;
  tickFormat: (domainValue: NumberValue, index: number) => string;
  innerWidth: number;
  margin: { top: number; left: number; bottom: number; right: number };
  innerHeight: number;
}

const XLinearAxis = ({
  xScale,
  tickFormat,
  innerWidth,
  innerHeight,
  margin,
}: Props): ReactElement => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    // Define Axis
    const xAxis = axisBottom(xScale).tickFormat(tickFormat);
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
      .text('Population');
  }, [innerWidth]);

  return (
    <svg style={{ overflow: 'visible' }} ref={svgRef}>
      <g className="x-axis" />
    </svg>
  );
};

export default XLinearAxis;
