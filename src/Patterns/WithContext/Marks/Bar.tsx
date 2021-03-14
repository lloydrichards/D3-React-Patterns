import React, { ReactElement } from 'react';

interface Props {
  y: number;
  width: number;
  height: number;
  selected: boolean;
  onSelect: () => void;
}

function Bar({ y, width, height, selected, onSelect }: Props): ReactElement {
  return (
    <rect
      y={y}
      width={width}
      height={height}
      fill={selected ? 'tomato' : 'grey'}
      onClick={onSelect}
    />
  );
}

export default Bar;
