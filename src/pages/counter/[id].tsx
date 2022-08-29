import { useRouter } from 'next/router';
import { trpc } from 'utils/trpc';
import NextError from 'next/error';
import { useEffect } from 'react';
import useCounterStore from 'stores/counter';

const Counter = () => {
  const id = useRouter().query.id as string;
  const counterQuery = trpc.useQuery(['counter.getById', { id }]);
  const inc = trpc.useMutation('counter.inc');
  const count = useCounterStore((state) => state.count);
  const localInc = useCounterStore((state) => state.inc);
  const setInitial = useCounterStore((state) => state.setInitial);
  trpc.useSubscription(['counter.onInc'], {
    onNext(data) {
      localInc();
    },
  });

  useEffect(() => {
    if (!counterQuery.data) return;
    setInitial(counterQuery.data);
  }, [counterQuery.data, setInitial]);

  if (counterQuery.error)
    return (
      <NextError
        statusCode={counterQuery.error.data?.httpStatus ?? 500}
        message={counterQuery.error.message}
      />
    );

  if (counterQuery.status !== 'success') return <div>...Loading</div>;

  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={() => inc.mutate({ id })}>Inc</button>
    </div>
  );
};

export default Counter;
