import { useRouter } from 'next/router';
import { trpc } from '../utils/trpc';

export default function IndexPage() {
  const router = useRouter();
  const createGame = trpc.useMutation('game.create', {
    onSuccess: ({ id }) => {
      router.push(`/game/${id}`);
    },
  });

  return <button onClick={() => createGame.mutate({})}>Test</button>;
}
