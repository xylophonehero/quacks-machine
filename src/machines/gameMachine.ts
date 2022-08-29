import { chips } from '../data/gameData';
import { assign, createMachine } from 'xstate';
import { z } from 'zod';

const chipOnBoardSchema = z.object({
  chip: z.string(),
  position: z.number(),
});

const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  chipsInBag: z.array(z.string()),
  chipsOnBoard: z.array(chipOnBoardSchema),
  dropletValue: z.number(),
  ratValue: z.number(),
  rubies: z.number(),
  points: z.number(),
});

export type Player = z.infer<typeof playerSchema>;

const gameSchema = z.object({
  players: z.record(playerSchema),
});

type GameContext = z.infer<typeof gameSchema>;

export const gameEvents = z.union([
  z.object({
    type: z.literal('DRAW'),
    // chip: z.string().optional(),
    player: z.string(),
    random: z.number().optional(),
  }),
  z.object({
    type: z.literal('CHOICE'),
  }),
  z.object({
    type: z.literal('FINISHED_ROUND'),
  }),
  z.object({
    type: z.literal('READY'),
  }),
]);

export type GameEvents = z.infer<typeof gameEvents>;

const gameMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5RQIYFswDoICcUHcBLAOyk0IgBswBiAEQCUBBAdUVAAcB7WQgF0Jdi7EAA9EAWgCsANgAMmACwAmZVKkBGZQE4Z23QHYANCACeiNUoMBmbQA5tB5TKnXbTgL4eTqDNjxEpJhoKADWJFAAwgAWXIQAxrSRABIA8gCSkQCiIty8AkIi4ggSygaKmDKKchoGtXZu5com5iU2mBpy1orWdnJ2BjJ2doraXj7oWLgEETQAYukAcukAyslZdAD6DKkAqot0uTz8gsJIYojqmAbao4qKfTLKoyNSLZIa8phSdnoaD79rK4yuMQL4sLB4lwcLMGFkmHQAJpHfKnIqIbTWa4GHH6OxqOROZ7vEoaDSYeyKAw1G6ONyKDRSLzeEDELgQOAicH+GZBCjUFEnQrnYrSDR2b7KORybQaIHlR4kiS6TDKNzaOQyalU+xq0Hc6aBMghcKkGJxRKCgpnUCi5TDTB2T7yWo9Ax9MokupKKT2dSKIYPZ76yY8o1WtEiyQ-CoqNSaHR6QxKz4S1SdBzWORSBlOOwhvyQ6ERTAoCAQCIABTixD48HOeSFNouCB6Ukd3SkUtkmf6KY02kw1jlch0+gMsiG1gLEKhMNIEeFtsQDPJDUUXezQ0xfbMH1lQ+lapqdlk2lUM8XzdF8glcfUWl0+i1SucWPtNnsI63zI8QA */
  createMachine(
    {
      predictableActionArguments: true,
      // context: { players: [] },
      tsTypes: {} as import('./gameMachine.typegen').Typegen0,
      schema: { context: {} as GameContext, events: {} as GameEvents },
      initial: 'drawing',
      id: 'game',
      states: {
        drawing: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                DRAW: [
                  {
                    actions: 'drawChip',
                    cond: 'hasChoice',
                    target: 'makingChoice',
                  },
                  {
                    actions: 'drawChip',
                  },
                ],
              },
            },
            makingChoice: {
              on: {
                CHOICE: {
                  target: 'idle',
                },
              },
            },
          },
          on: {
            FINISHED_ROUND: {
              target: 'scoring',
            },
          },
        },
        scoring: {
          initial: 'addingPoints',
          states: {
            addingPoints: {},
          },
          on: {
            READY: {
              target: 'drawing',
            },
          },
        },
      },
    },
    {
      actions: {
        drawChip: assign({
          players: (ctx, e) => {
            const { player, random } = e;
            if (!ctx.players[player]) throw new Error('Helo');
            if (!random) throw new Error('Should have chip by this point');
            const { chipsInBag, chipsOnBoard, dropletValue, ratValue } =
              ctx.players[player];

            const chipIndex = Math.floor(chipsInBag.length * random);
            const chip = chipsInBag[chipIndex];
            const currentPosition =
              chipsOnBoard.at(-1)?.position ?? dropletValue + ratValue;

            return {
              ...ctx.players,
              [e.player]: {
                ...ctx.players[player],
                chipsOnBoard: [
                  ...chipsOnBoard,
                  {
                    chip: chip,
                    position: chips[chip].value + currentPosition,
                  },
                ],
                chipsInBag: [
                  ...chipsInBag.slice(0, chipIndex),
                  ...chipsInBag.slice(chipIndex + 1),
                ],
              },
            };
          },
        }),
      },
      guards: {
        hasChoice: () => false,
      },
    },
  );

export default gameMachine;
