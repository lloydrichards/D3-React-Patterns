import {
  axisBottom,
  axisLeft,
  curveBasis,
  extent,
  line,
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
}

const LineChart: React.FC<Props> = ({ data, selected }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef<HTMLObjectElement>(null);
  const dimensions = useResizeObserver(wrapperRef);
  useEffect(() => {
    if (!data || data.length === 0) return;
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const allData = data.reduce(
      (accumulator, countryTimeseries) => accumulator.concat(countryTimeseries),
      [],
    );

    // Define Scales
    const xScale = scaleTime()
      .domain(extent(allData, (d) => d.date) as [Date, Date])
      .range([0, dimensions.width])
      .nice();
    const yScale = scaleLinear()
      .domain(extent(allData, (d) => +d.population) as [number, number])
      .range([dimensions.height, 0])
      .nice();

    // Define Axis
    const xAxis = axisBottom(xScale).ticks(5);
    const yAxis = axisLeft(yScale).tickFormat(
      (d) => `${(d as number) / 1000000}M`,
    );

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
      .text('Year');
    svg
      .selectAll('.y-labels')
      .data([0])
      .join('text')
      .attr('class', 'y-labels')
      .attr('fill', 'cadetblue')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(-45, ${dimensions.height / 2}) rotate(-90)`)
      .style('text-anchor', 'end')
      .text('Population');

    // Define Shapes
    const lineGenerator = line<{
      date: Date;
      population: number;
      country: string;
      code: string;
    }>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.population));

    // Draw Marks
    svg
      .selectAll('.selected-line')
      .data(data.filter((i) => i[0].code === selected))
      .join('path')
      .attr('class', 'selected-line')
      .attr('fill', 'none')
      .attr('stroke', 'tomato')
      .attr('stroke-width', 3)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', (d) => lineGenerator(d));
    svg
      .selectAll('.line')
      .data(data)
      .join('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'grey')
      .attr('opacity', 0.3)
      .attr('stroke-width', 1)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', (d) => lineGenerator(d));
  }, [dimensions, data, selected]);

  return (
    <div
      style={{ height: '250px', padding: '10px 10px 40px 40px' }}
      ref={wrapperRef}
    >
      <svg style={{ overflow: 'visible' }} ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default LineChart;
