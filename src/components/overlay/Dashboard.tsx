import useGameActions from 'components/game/gameActions';
import { useChipsOnBoard } from 'components/game/gameHooks';
import Board from 'components/overlay/Board';
import Button from 'components/ui/Button';
import Chip from 'components/ui/Chip';

const Dashboard = () => {
  const chipsOnBoard = useChipsOnBoard();
  const { drawChip } = useGameActions();
  return (
    <div className="dashboard">
      <div data-part="playarea">
        <Board>
          {chipsOnBoard.map(({ chip, position }) => (
            <Chip id={chip} key={position} position={position} />
          ))}
        </Board>
      </div>
      <div data-part="controls">
        <Button onClick={drawChip}>Draw</Button>
      </div>
    </div>
  );
};

export default Dashboard;
