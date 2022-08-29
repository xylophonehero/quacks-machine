import { Player } from 'machines/gameMachine';
import { z } from 'zod';

const gamePhases = z.object({
  drawing: z.object({}),
  scoring: z.object({}),
});

const colorShema = z.enum(['blue', 'white', 'orange', 'green']);

const chipSchema = z.object({
  id: z.string(),
  value: z.number(),
  color: colorShema,
});

const boardSpace = z.object({
  id: z.number(),
  points: z.number(),
  value: z.number(),
  ruby: z.boolean(),
});
export type BoardSpace = z.infer<typeof boardSpace>;

const boardSchema = z.array(boardSpace);

export const board: z.infer<typeof boardSchema> = [
  {
    id: 0,
    points: 0,
    value: 0,
    ruby: false,
  },
  {
    id: 1,
    points: 0,
    value: 1,
    ruby: false,
  },
  {
    id: 2,
    points: 0,
    value: 2,
    ruby: false,
  },
  {
    id: 3,
    points: 0,
    value: 3,
    ruby: false,
  },
  {
    id: 4,
    points: 0,
    value: 4,
    ruby: false,
  },
  {
    id: 5,
    points: 0,
    value: 5,
    ruby: true,
  },
  {
    id: 6,
    points: 1,
    value: 6,
    ruby: false,
  },
  {
    id: 7,
    points: 1,
    value: 7,
    ruby: false,
  },
  {
    id: 8,
    points: 1,
    value: 8,
    ruby: false,
  },
  {
    id: 9,
    points: 1,
    value: 9,
    ruby: true,
  },
  {
    id: 10,
    points: 2,
    value: 10,
    ruby: false,
  },
  {
    id: 11,
    points: 2,
    value: 11,
    ruby: false,
  },
  {
    id: 12,
    points: 2,
    value: 12,
    ruby: false,
  },
  {
    id: 13,
    points: 2,
    value: 13,
    ruby: true,
  },
  {
    id: 14,
    points: 3,
    value: 14,
    ruby: false,
  },
  {
    id: 15,
    points: 3,
    value: 15,
    ruby: false,
  },
  {
    id: 15,
    points: 3,
    value: 15,
    ruby: true,
  },
  {
    id: 16,
    points: 3,
    value: 16,
    ruby: false,
  },
];

export const chips: Record<string, z.infer<typeof chipSchema>> = {
  w1: {
    color: 'white',
    value: 1,
    id: 'w1',
  },
  w2: {
    color: 'white',
    value: 2,
    id: 'w2',
  },
  w3: {
    color: 'white',
    value: 3,
    id: 'w3',
  },
  g1: {
    color: 'green',
    value: 1,
    id: 'g1',
  },
  o1: {
    color: 'orange',
    value: 1,
    id: 'o1',
  },
  b1: {
    color: 'blue',
    value: 1,
    id: 'b1',
  },
} as const;

export const initialChips = [
  'w1',
  'w1',
  'w1',
  'w1',
  'w2',
  'w2',
  'w3',
  'g1',
  'o1',
];

export const defaultPlayer: Player = {
  chipsInBag: ['w1', 'w1', 'w1', 'w1', 'w2', 'w2', 'w3', 'g1', 'o1'],
  chipsOnBoard: [],
  name: 'Nick',
  dropletValue: 0,
  id: 'a',
  points: 0,
  ratValue: 0,
  rubies: 0,
};
