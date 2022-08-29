import { Subscription, TRPCError } from '@trpc/server';
import EventEmitter from 'events';
import { z } from 'zod';
import { createRouter } from '../createRouter';

interface MyEvents {
  inc: () => void;
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

export const counterRouter = createRouter()
  .query('getById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      const counter = await ctx.prisma.counter.findUnique({
        where: {
          id,
        },
        select: {
          count: true,
        },
      });
      return counter;
    },
  })
  .mutation('create', {
    input: z.object({
      id: z.string().uuid().optional(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      const counter = await ctx.prisma.counter.create({
        data: {
          id,
        },
        select: {
          id: true,
        },
      });
      return counter;
    },
  })
  .subscription('onInc', {
    resolve() {
      return new Subscription((emit) => {
        const onAdd = () => emit.data('inc');
        ee.on('inc', onAdd);
        return () => {
          ee.off('inc', onAdd);
        };
      });
    },
  })
  .mutation('inc', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      const counter = await ctx.prisma.counter.findUnique({
        where: {
          id,
        },
        select: {
          count: true,
        },
      });

      if (!counter)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No counter with id',
        });

      await ctx.prisma.counter.update({
        where: {
          id,
        },
        data: {
          count: counter.count + 1,
        },
      });
      ee.emit('inc');
      return;
    },
  });
