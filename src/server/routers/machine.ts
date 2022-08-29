import { Subscription, TRPCError } from '@trpc/server';
import { createRouter } from '../createRouter';
import { z } from 'zod';
import trafficLightMachine from '../../machines/trafficLight';
import EventEmitter from 'events';

interface MyEvents {
  next: () => void;
}
declare interface MyEventEmitter {
  on<U extends keyof MyEvents>(event: U, listener: MyEvents[U]): this;
  once<U extends keyof MyEvents>(event: U, listener: MyEvents[U]): this;
  emit<U extends keyof MyEvents>(
    event: U,
    ...args: Parameters<MyEvents[U]>
  ): boolean;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MyEventEmitter extends EventEmitter { }

const ee = new MyEventEmitter();

const machineRouter = createRouter()
  .query('getById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      const machine = await ctx.prisma.machine.findUnique({
        where: {
          id,
        },
        select: {
          state: true,
        },
      });

      if (!machine)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No machine with id',
        });

      return machine;
    },
  })
  .mutation('create', {
    input: z.object({
      id: z.string().uuid().optional(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;

      const machine = await ctx.prisma.machine.create({
        data: {
          id,
          state: JSON.stringify(trafficLightMachine.initialState),
          // machine: JSON.stringify(trafficLightMachine),
          seed: '',
        },
        select: {
          id: true,
        },
      });

      return machine;
    },
  })
  .mutation('next', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      const machine = await ctx.prisma.machine.findUnique({
        where: {
          id,
        },
        select: {
          state: true,
        },
      });

      if (!machine)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No machine with id',
        });

      const nextState = trafficLightMachine.transition(
        trafficLightMachine.resolveState(JSON.parse(machine.state)),
        'NEXT',
      );
      ee.emit('next');
      await ctx.prisma.machine.update({
        where: {
          id,
        },
        data: {
          state: JSON.stringify(nextState),
        },
      });

      return;
    },
  })
  .subscription('onNext', {
    resolve() {
      return new Subscription((emit) => {
        const onNext = () => emit.data('NEXT');
        ee.on('next', onNext);
        return () => {
          // ee.off('next', onNext);
        };
      });
    },
  });

export default machineRouter;
