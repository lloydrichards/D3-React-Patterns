/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
import React from 'react';

import { useChartDimensions } from '../ChartWrapper';
import type { DimensionsInterface } from '../types';

const axisComponentsByDimension: any = {
  x: AxisHorizontal,
  y: AxisVertical,
};

interface AxisComponentProps {
  dimension: any;
}
const Axis = ({ dimension, ...props }: AxisComponentProps) => {
  const dimensions = useChartDimensions();
  const Component: any = axisComponentsByDimension[dimension];
  if (!Component) return null;

  return <Component dimensions={dimensions} {...props} />;
};

export default Axis;

interface AxisProps {
  scale: any;
  dimensions: DimensionsInterface;
  label: string;
  formatTick: any;
}
function AxisHorizontal({
  dimensions,
  label,
  formatTick,
  scale,
  ...props
}: AxisProps) {
  const numberOfTicks =
    dimensions.boundedWidth < 600
      ? dimensions.boundedWidth / 50
      : dimensions.boundedWidth / 100;

  const ticks = scale.ticks(numberOfTicks);

  return (
    <g
      className="axis-horizontal"
      transform={`translate(0, ${dimensions.boundedHeight})`}
      {...props}
    >
      <line className="axis-line" x2={dimensions.boundedWidth} />
      {ticks.map((tick: number, i: number) => (
        <text
          key={tick}
          className="tick"
          transform={`translate(${scale(tick)}, 25)`}
        >
          {formatTick ? formatTick(tick) : tick}
        </text>
      ))}
      {label && (
        <text
          className="axis-units"
          transform={`translate(${dimensions.boundedWidth / 2}, 60)`}
        >
          {label}
        </text>
      )}
    </g>
  );
}

function AxisVertical({
  dimensions,
  label,
  formatTick,
  scale,
  ...props
}: AxisProps) {
  const numberOfTicks = dimensions.boundedHeight / 70;

  const ticks = scale.ticks(numberOfTicks);

  return (
    <g className="axis-vertical" {...props}>
      <line className="Axis__line" y2={dimensions.boundedHeight} />

      {ticks.map((tick: number, i: number) => (
        <text
          key={tick}
          className="tick"
          transform={`translate(-16, ${scale(tick)})`}
        >
          {formatTick ? formatTick(tick) : tick}
        </text>
      ))}

      {label && (
        <text
          className="axis-label"
          style={{
            transform: 'translate(0px, -50px)',
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
}
