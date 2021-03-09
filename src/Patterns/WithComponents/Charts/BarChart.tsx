import {
  axisBottom,
  axisLeft,
  curveBasis,
  extent,
  line,
  scaleBand,
  scaleLinear,
  scaleLog,
  scaleTime,
  select,
} from 'd3';
import React, { useEffect, useRef } from 'react';
import useResizeObserver from '../Util/useResizeObserver';

interface Props {
  data: Array<
    Array<{ date: Date; population: number; country: string; code: string }>
  >;
  selected: string | null;
  onSelect: React.Dispatch<React.SetStateAction<string | null>>;
  width:number
}

const BarChart: React.FC<Props> = ({ data, selected, onSelect, width }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef<HTMLObjectElement>(null);
  const dimensions = useResizeObserver(wrapperRef);
  useEffect(() => {
    if (!data || data.length === 0) return;
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const latestData = data.map((d) => d[d.length - 1]).slice(0, 25);

    // Define Scales
    const xScale = scaleLinear()
      .domain(extent(latestData, (d) => +d.population) as [number, number])
      .range([0, dimensions.width])
      .nice();
    const yScale = scaleBand()
      .domain(latestData.map((i) => i.country))
      .range([0, dimensions.height])
      .paddingInner(0.2);

    // Define Axis
    const xAxis = axisBottom(xScale).tickFormat(
      (d) => `${(d as number) / 1000000}M`,
    );
    const yAxis = axisLeft(yScale).ticks(5);

    // Draw Axis
    svg
      .select<SVGGElement>('.x-axis')
      .style('transform', `translate(0px, ${dimensions.height}px)`)
      .attr('color', 'cadetblue')
      .call(xAxis);
    svg.select<SVGGElement>('.y-axis').attr('color', 'cadetblue').call(yAxis);

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
      .text('Population');

    // Define Shapes

    // Draw Marks
    svg
      .selectAll('.bars')
      .data(latestData)
      .join('rect')
      .attr('class', 'bars')
      .attr('x', 0)
      .attr('y', (d) => yScale(d.country) || 0)
      .attr('width', (d) => xScale(d.population))
      .attr('height', yScale.bandwidth())
      .attr('fill', (d) => (d.code === selected ? 'tomato' : 'grey'))
      .on('click', (i, d: any) => onSelect(d.code));
  }, [dimensions, data, selected]);

  return (
    <div
      style={{ height: '200px', padding: '10px 10px 40px 40px' }}
      ref={wrapperRef}
    >
      <svg style={{ overflow: 'visible' }} ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default BarChart;
