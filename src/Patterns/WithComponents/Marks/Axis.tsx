/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
import React from 'react';
import * as d3 from 'd3';

import { useDimensionsContext } from '../ChartWrapper';
import type { tick, DimensionsInterface } from '../types';
import { ForceY, line } from 'd3';

interface AxisProps {
  dimensions: DimensionsInterface;
  label?: string;
  formatTick?: any;
  scale?: any;
  props?: any;
}

interface AxisComponentProps {
  dimension: 'x' | 'y';
  props?: any;
  label?: string;
  formatTick?: any;
  scale?: any;
}
const axisComponentsByDimension = {
  x: xAxis,
  y: yAxis,
};
const Axis = ({ dimension, ...props }: AxisComponentProps) => {
  const dimensions = useDimensionsContext();
  const Component = axisComponentsByDimension[dimension];
  if (!Component) return null;

  //don't understand this error since "dimensions" fits the interface
  return <Component dimensions={dimensions} {...props} />;
};

export default Axis;

function xAxis({ dimensions, label, formatTick, scale, ...props }: AxisProps) {
  const numberOfTicks =
    dimensions.boundedWidth < 600
      ? dimensions.boundedWidth / 100
      : dimensions.boundedWidth / 250;

  const ticks: tick[] = scale.ticks(numberOfTicks);
  return (
    <g
      className="axis x-axis"
      transform={`translate(0, ${dimensions.boundedHeight})`}
      {...props}
    >
      <line className="axis-line" x2={dimensions.boundedWidth} />

      {ticks.map((tick, i) => (
        <g className="tick" transform={`translate(${scale(tick)})`}>
          {/* <line y2="6" stroke="cadetblue" /> */}
          <text key={i} dy=".75em" y="9" transform={`translate(-20, 0)`}>
            {formatTick(tick)}
          </text>
        </g>
      ))}

      {label && (
        <text
          className="axis-label"
          transform={`translate(${dimensions.boundedWidth / 2}, 50)`}
        >
          {label}
        </text>
      )}
    </g>
  );
}

function yAxis({ dimensions, label, formatTick, scale, ...props }: AxisProps) {
  const numberOfTicks = dimensions.boundedHeight / 70;

  const ticks: tick[] = scale.ticks(numberOfTicks);
  return (
    <g className="axis y-axis" {...props}>
      <line className="axis-line" y2={dimensions.boundedHeight} />
      {ticks.map((tick, i) => (
        <g className="tick">
          {/* <line x2="-6" stroke="cadetblue" /> */}

          <text
            key={i}
            className="tick"
            transform={`translate(-56, ${scale(tick)})`}
            // dy=".32em"
            // x="-3"
          >
            {formatTick ? formatTick(tick) : tick}
          </text>
        </g>
      ))}

      {label && (
        <text
          className="axis-label"
          style={{
            transform: `translate(-80px, ${
              dimensions.boundedHeight / 2
            }px) rotate(-90deg)`,
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
}
