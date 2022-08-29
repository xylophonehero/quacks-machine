import GameContextProvider from 'components/game/GameContextProvider';
import Dashboard from 'components/overlay/Dashboard';
import NextError from 'next/error';
import { useRouter } from 'next/router';
import { trpc } from 'utils/trpc';

const Game = () => {
  const id = useRouter().query.id as string;

  const machineQuery = trpc.useQuery(['game.getById', { id }]);

  if (machineQuery.error)
    return (
      <NextError
        statusCode={machineQuery.error.data?.httpStatus ?? 500}
        message={machineQuery.error.message}
      />
    );

  if (machineQuery.status !== 'success') return <div>...Loading</div>;

  return (
    <GameContextProvider machineState={machineQuery.data.state}>
      <Dashboard />
    </GameContextProvider>
  );
};

export default Game;
