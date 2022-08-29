import { useSelector } from '@xstate/react';
import { useGameService } from 'components/game/GameContextProvider';

const defaultPlayer = 'a';

export const useChipsInBag = () => {
  const gameService = useGameService();

  return useSelector(
    gameService,
    (state) => state.context.players[defaultPlayer].chipsInBag,
    (a, b) => a.length === b.length,
  );
};

export const useChipsOnBoard = () => {
  const gameService = useGameService();

  return useSelector(
    gameService,
    (state) => state.context.players[defaultPlayer].chipsOnBoard,
    (a, b) => a.length === b.length,
  );
};
