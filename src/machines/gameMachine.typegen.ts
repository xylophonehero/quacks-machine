// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: 'drawChip';
    services: never;
    guards: 'hasChoice';
    delays: never;
  };
  eventsCausingActions: {
    drawChip: 'DRAW';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    hasChoice: 'DRAW';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'drawing'
    | 'drawing.idle'
    | 'drawing.makingChoice'
    | 'scoring'
    | 'scoring.addingPoints'
    | { drawing?: 'idle' | 'makingChoice'; scoring?: 'addingPoints' };
  tags: never;
}
