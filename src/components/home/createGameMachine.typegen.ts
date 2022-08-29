// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.createGame': {
      type: 'done.invoke.createGame';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.createGame': {
      type: 'error.platform.createGame';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    createGame: 'done.invoke.createGame';
  };
  missingImplementations: {
    actions: 'navigateToNewGame';
    services: 'createGame';
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    navigateToNewGame: 'done.invoke.createGame';
  };
  eventsCausingServices: {
    createGame: 'CREATE_GAME';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'creatingGame' | 'idle';
  tags: never;
}
