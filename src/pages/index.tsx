import { useRouter } from 'next/router';
import { trpc } from '../utils/trpc';

export default function IndexPage() {
  const router = useRouter();
  const createCounter = trpc.useMutation('machine.create', {
    onSuccess: ({ id }) => {
      router.push(`/${id}`);
    },
  });

  return <button onClick={() => createCounter.mutate({})}>Test</button>;
}
