import { createMachine } from 'xstate'

type CreateGameEvents =
  | { type: 'CREATE_GAME' }

const createGameMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMBOYCGAXMBxDAtmAHQCWEANmAMQDCASgKICCAKowPq7MCyjioAA4B7WKSylhAOwEgAHogC0ARgBsq4gA4AzNoAMAJnUHNqgKzKA7ABYANCACeSsxssBOZWdPXV2zWbdNTwBfYPs0TBx8ImII7FIpKGiaCGkSBIA3YQBrEjiowjBZETEJaVkFBGUjLTdzZUCTd00beycqvW1iAL0zSwDzbTMfN1Dw9Gw8QtiJiUTk6jBUVGFUYkEKbAAzVYIZyKmiYtFxSRkkeSVlPT1iNwMfS2UGy0tNd7ar9WIDPX7NazWAxubTPTShMIgKTCCBwWT5Q7pShFC4lU7lC6VRSgjS-PR1dRBVSWXqfBCKVQGYjuX7XfHKTQE-xjEAI5L7eLzQrHUpnCqIVTKYjWd5mLzmEnDbRkxTvH46G6aTpBbSWVQstnc1EnMrnUBY7TWW54gmqImSmUGPzEBrWdzWZS6EwGSwQ4JAA */
  createMachine({
    tsTypes: {} as import("./createGameMachine.typegen").Typegen0,
    schema: {
      context: {} as CreateGameContxet,
      events: {} as CreateGameEvents
    },
    id: "createGame",
    initial: "idle",
    states: {
      idle: {
        on: {
          CREATE_GAME: {
            target: "creatingGame",
          },
        },
      },
      creatingGame: {
        invoke: {
          src: "createGame",
          id: "createGame",
          onDone: [
            {
              actions: "navigateToNewGame",
            },
          ],
          onError: [
            {
              target: "idle",
            },
          ],
        },
      },
    },
  });

export default createGameMachine