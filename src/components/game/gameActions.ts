import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { trpc } from 'utils/trpc';

const useGameActions = () => {
  const id = useRouter().query.id as string;
  const gameEvent = trpc.useMutation('game.event');

  const drawChip = useCallback(
    () =>
      gameEvent.mutate({
        event: { type: 'DRAW', player: 'a' },
        id,
      }),
    [gameEvent, id],
  );

  // const drawChip = useCallback(() => gameService.send({ type: 'DRAW', player:  }), []);

  return {
    drawChip,
  };
};

export default useGameActions;
