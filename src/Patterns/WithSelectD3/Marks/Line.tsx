import React from 'react';
interface Props {
  d: string;
  selected?: boolean;
}
const Line: React.FC<Props> = ({ d, selected }) => {
  return (
    <path
      fill="none"
      stroke={selected ? 'tomato' : 'grey'}
      strokeWidth={selected ? 3 : 1}
      opacity={selected ? 1 : 0.3}
      d={d}
    />
  );
};

export default Line;
