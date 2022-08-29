import React from 'react';
import { chips } from '../../data/gameData';

interface Props {
  id: string;
  position: number;
}

const Chip = ({ id, position, ...rest }: Props) => {
  const { color, value } = chips[id]!;

  return (
    <div
      data-color={color}
      {...rest}
      className="grid text-white rounded-full aspect-square chip place-items-center"
      style={
        {
          '--grid-row': Math.floor(position / 8 + 1),
          '--grid-column': (position % 8) + 1,
        } as React.CSSProperties
      }
    >
      <span>{value}</span>
    </div>
  );
};
export default Chip;
