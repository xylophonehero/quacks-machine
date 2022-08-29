import { createMachine } from 'xstate';

interface ChipOnBoard {
  chip: string;
  position: number;
}

interface Player {
  id: string;
  name: string;
  chipsInBag: string;
  chipsOnBoard: ChipOnBoard[];
  dropletValue: number;
  ratValue: number;
  rubies: number;
  points: number;
}

interface GameContext {
  players: Player[];
}

type GameEvents =
  | { type: 'DRAW'; chip: string }
  | { type: 'CHOICE' }
  | { type: 'FINISHED_ROUND' }
  | { type: 'READY' };

const gameMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5RQIYFswDoICcUHcBLAOyk0IgBswBiAEQCUBBAdUVAAcB7WQgF0Jdi7EAA9EAWgCsANgAMmACwAmZVKkBGZQE4Z23QHYANCACeiNUoMBmbQA5tB5TKnXbTgL4eTqDNjxEpJhoKADWJFAAwgAWXIQAxrSRABIA8gCSkQCiIty8AkIi4ggSygaKmDKKchoGtXZu5com5iU2mBpy1orWdnJ2BjJ2doraXj7oWLgEETQAYukAcukAyslZdAD6DKkAqot0uTz8gsJIYojqmAbao4qKfTLKoyNSLZIa8phSdnoaD79rK4yuMQL4sLB4lwcLMGFkmHQAJpHfKnIqIbTWa4GHH6OxqOROZ7vEoaDSYeyKAw1G6ONyKDRSLzeEDELgQOAicH+GZBCjUFEnQrnYrSDR2b7KORybQaIHlR4kiS6TDKNzaOQyalU+xq0Hc6aBMghcKkGJxRKCgpnUCi5TDTB2T7yWo9Ax9MokupKKT2dSKIYPZ76yY8o1WtEiyQ-CoqNSaHR6QxKz4S1SdBzWORSBlOOwhvyQ6ERTAoCAQCIABTixD48HOeSFNouCB6Ukd3SkUtkmf6KY02kw1jlch0+gMsiG1gLEKhMNIEeFtsQDPJDUUXezQ0xfbMH1lQ+lapqdlk2lUM8XzdF8glcfUWl0+i1SucWPtNnsI63zI8QA */
  createMachine({
    context: { players: [] },
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
  });

export default gameMachine;
