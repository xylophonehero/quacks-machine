import { createMachine } from 'xstate';

const trafficLightMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDAZpglgYwBkcoALZAOlUgGIA5AUQA0AVRUABwHtYdkdOAdmxAAPRAFoAjAAZpATnIBmAGwAOACxy5iuetWT1ygDQgAnhMkryAJgDs69bZn3bt69fUBfTybRZchMRk5KZgADZhnADudEysSCBcPHyCwmII4qrWCraKAKzaqnKScsqyeSbmGZbKNvaOzo5uHt6+GNj4RKQUUFRgArEswkm8-EIJ6eLKkrZK0nqqtnLWOstylRKqquTq0gUFklty0mWqrSB+HYHd5OwArqjsYWCD8Rzco6kTFtK224eKVR5PTKZTWeS2DYIXbkGYnbJaByLFTeHwgAScCBwYSXAJdYJUCDDD4pcagSbOPJKMHKBbqYEyYxmCz0uqI5x-eaOc64zpBCihCLRYnJMZpCTLKn2aSLDylPKWSHM6rqax1TTzZR5RS2aTuHntPH88i9MD9EWfMmiCS5KUqEqGLYaaxQqSKSTkex5ZSA4qKFR5QMG-x8m73R7PC2k8UZLUejTTVQ+yzudSKKGKdSw3WSWkzGZyPJFYNXfHIKNi77VGRqgFAkFgiGu6wzGzKJwrdvO-KozxAA */
  createMachine({
    tsTypes: {} as import('./trafficLight.typegen').Typegen0,
    schema: { events: {} as { type: 'NEXT' } },
    id: 'trafficLight',
    initial: 'red',
    states: {
      red: {
        on: {
          NEXT: {
            target: 'yellow',
          },
        },
      },
      yellow: {
        on: {
          NEXT: {
            target: 'green',
          },
        },
      },
      green: {
        on: {
          NEXT: {
            target: 'purple',
          },
        },
      },
      purple: {
        on: {
          NEXT: {
            target: 'red',
          },
        },
      },
    },
  });

export default trafficLightMachine;
