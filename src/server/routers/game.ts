import { createRouter } from 'server/createRouter';
import { z } from 'zod';

interface MyEvents {
  add: (data: Post) => void;
  isTypingUpdate: () => void;
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

export const gameRouter = createRouter().mutation('add', {
  input: z.object({
    id: z.string().uuid().optional(),
    text: z.string(),
  }),
  async resolve({ ctx, input }) {
    const ;
  },
});
