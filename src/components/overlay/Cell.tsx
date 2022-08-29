import { board, BoardSpace } from '../../data/gameData';

const Cell = ({ id, points, ruby, value, ...rest }: BoardSpace) => {
  return (
    <div {...rest} className="cell">
      {value}
    </div>
  );
};

export default Cell;
