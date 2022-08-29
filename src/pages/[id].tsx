import { useRouter } from 'next/router';
import { trpc } from 'utils/trpc';
import NextError from 'next/error';
import { useMachine } from '@xstate/react';
import { useEffect, useState } from 'react';
import { json } from 'stream/consumers';
import trafficLightMachine from 'machines/trafficLight';

const Component = ({
  id,
  machineState,
}: {
  id: string;
  machineState: string;
}) => {
  const next = trpc.useMutation('machine.next');
  const [state, send] = useMachine(trafficLightMachine, {
    state: JSON.parse(machineState),
  });

  trpc.useSubscription(['machine.onNext'], {
    onNext() {
      send('NEXT');
    },
  });
  console.log(state.value);

  return (
    <div className="grid place-items-center">
      <div data-state={state.value} className="w-40 h-40 rounded-full light" />
      <button onClick={() => next.mutate({ id })}>Next</button>
    </div>
  );
};

const Machine = () => {
  const id = useRouter().query.id as string;
  const machineQuery = trpc.useQuery(['machine.getById', { id }]);

  if (machineQuery.error)
    return (
      <NextError
        statusCode={machineQuery.error.data?.httpStatus ?? 500}
        message={machineQuery.error.message}
      />
    );

  if (machineQuery.status !== 'success') return <div>...Loading</div>;

  return <Component id={id} machineState={machineQuery.data.state} />;
};

export default Machine;
