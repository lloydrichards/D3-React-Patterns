import {
  axisBottom,
  axisLeft,
  curveBasis,
  extent,
  line,
  scaleLinear,
  scaleTime,
  select,
  timeFormat,
} from 'd3';
import React, { useEffect, useRef } from 'react';
import useResizeObserver from './Util/useResizeObserver';

interface Props {
  height: number;
  values: Array<{
    Source: string;
    Year: string;
    Mean: string;
  }>;
  labels: [string, string];
}

const D3Chart: React.FC<Props> = ({ values, labels, height }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef<HTMLObjectElement>(null);
  const dimensions = useResizeObserver(wrapperRef);
  useEffect(() => {
    if (!values || values.length === 0) return;
    const svg = select(svgRef.current);
    if (!dimensions) return;

    // Define Scales
    const xScale = scaleLinear()
      .domain(extent(values, (d) => +d.Year) as [number, number])
      .range([0, dimensions.width])
      .nice();
    const yScale = scaleLinear()
      .domain(extent(values, (d) => +d.Mean) as [number, number])
      .range([dimensions.height, 0])
      .nice();

    // Define Axis
    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    // Draw Axis
    svg
      .select<SVGGElement>('.x-axis')
      .style('transform', `translate(0px, ${dimensions.height}px)`)
      .attr('color', 'cadetblue')
      .call(xAxis);
    svg.select<SVGGElement>('.y-axis').attr('color', 'cadetblue').call(yAxis);
    svg
      .selectAll('.center-line')
      .data([0])
      .join('line')
      .attr('class', 'center-line')
      .attr('x1', 0)
      .attr('x2', dimensions.width)
      .attr('y1', yScale(0))
      .attr('y2', yScale(0))
      .attr('stroke', 'cadetblue')
      .attr('stroke-width', 1);

    //Draw labels
    svg
      .selectAll('.x-labels')
      .data([0])
      .join('text')
      .attr('class', 'x-labels')
      .attr(
        'transform',
        `translate(${dimensions.width / 2}, ${dimensions.height + 40})`,
      )
      .attr('fill', 'cadetblue')
      .style('text-anchor', 'middle')
      .text(labels[0]);
    svg
      .selectAll('.y-labels')
      .data([0])
      .join('text')
      .attr('class', 'y-labels')
      .attr('fill', 'cadetblue')
      .attr('transform', `translate(-30, ${dimensions.height / 2})`)
      .style('text-anchor', 'end')
      .text(labels[1]);

    // Define Shapes
    const meanLine = line<{
      Source: string;
      Year: string;
      Mean: string;
    }>()
      .x((d) => xScale(+d.Year))
      .y((d) => yScale(+d.Mean))
      .curve(curveBasis);

    // Draw Marks
    svg
      .selectAll('.line')
      .data([values])
      .join('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'tomato')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', meanLine);
  }, [dimensions, values]);

  return (
    <div
      style={{ height: height, padding: '20px 20px 20px 60px' }}
      ref={wrapperRef}
    >
      <svg style={{ overflow: 'visible' }} ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default D3Chart;
