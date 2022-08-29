import Cell from 'components/overlay/Cell';
import { board } from 'data/gameData';

interface Props {
  children: React.ReactNode;
}

const Board = ({ children }: Props) => {
  return (
    <div className="board">
      {[...Array(20).keys()].map((index) => (
        <Cell
          key={index}
          style={
            {
              '--grid-row': Math.floor(index / 8 + 1),
              '--grid-column': (index % 8) + 1,
            } as React.CSSProperties
          }
          {...board[index]}
        />
      ))}
      {children}
    </div>
  );
};

export default Board;
