import { Subscription, TRPCError } from '@trpc/server';
import { createRouter } from '../createRouter';
import { z } from 'zod';
import gameMachine, {
  GameEvents,
  gameEvents,
} from '../../machines/gameMachine';
import EventEmitter from 'events';
import { defaultPlayer } from '../../data/gameData';
import seedrandom from 'seedrandom';

interface MyEvents {
  event: (paylod: z.infer<typeof gameEvents>) => void;
}
declare interface MyEventEmitter {
  on<U extends keyof MyEvents>(event: U, listener: MyEvents[U]): this;
  once<U extends keyof MyEvents>(event: U, listener: MyEvents[U]): this;
  emit<U extends keyof MyEvents>(
    event: U,
    ...args: Parameters<MyEvents[U]>
  ): boolean;
}
// eslint-disable-next-line prettier/prettier
class MyEventEmitter extends EventEmitter { }

const ee = new MyEventEmitter();

const gameRouter = createRouter()
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

      const seed = (Math.random() + 1).toString(36).substring(7);

      const machine = await ctx.prisma.machine.create({
        data: {
          id,
          state: JSON.stringify(
            gameMachine.withContext({
              players: {
                a: defaultPlayer,
              },
            }).initialState,
          ),
          seed,
        },
        select: {
          id: true,
        },
      });

      return machine;
    },
  })
  .mutation('event', {
    input: z.object({
      id: z.string(),
      event: gameEvents,
    }),
    async resolve({ ctx, input }) {
      const { id, event } = input;
      const machine = await ctx.prisma.machine.findUnique({
        where: {
          id,
        },
        select: {
          state: true,
          seed: true,
        },
      });

      if (!machine)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No machine with id',
        });

      const rng = seedrandom(machine.seed);
      const random = rng();

      const nextState = gameMachine.transition(
        gameMachine.resolveState(JSON.parse(machine.state)),
        event.type === 'DRAW' ? { ...event, random } : event,
      );
      ee.emit('event', event.type === 'DRAW' ? { ...event, random } : event);
      await ctx.prisma.machine.update({
        where: {
          id,
        },
        data: {
          state: JSON.stringify(nextState),
          seed: (random + 1).toString(36).substring(7),
        },
      });

      return;
    },
  })
  .subscription('onEvent', {
    resolve() {
      return new Subscription<GameEvents>((emit) => {
        const onEvent = (data: GameEvents) => emit.data(data);
        ee.on('event', onEvent);
        return () => {
          ee.off('event', onEvent);
        };
      });
    },
  });

export default gameRouter;
