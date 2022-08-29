import { useInterpret, useSelector } from '@xstate/react';
import gameMachine from 'machines/gameMachine';
import { Children, createContext, useContext } from 'react';
import { trpc } from 'utils/trpc';
import { InterpreterFrom } from 'xstate';

const GameContext = createContext<InterpreterFrom<typeof gameMachine> | null>(
  null,
);

interface Props {
  machineState: string;
  children: React.ReactNode;
}

const GameContextProvider = ({ machineState, children }: Props) => {
  const gameService = useInterpret(gameMachine, {
    state: JSON.parse(machineState),
  });
  const isEmpty = useSelector(
    gameService,
    (state) => typeof state.context.players === 'undefined',
  );

  trpc.useSubscription(['game.onEvent'], {
    onNext(data) {
      gameService.send(data);
    },
  });
  if (isEmpty) return null;

  return (
    <GameContext.Provider value={gameService}>{children}</GameContext.Provider>
  );
};

export default GameContextProvider;

export const useGameService = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('Use game context in provider');
  return ctx;
};
