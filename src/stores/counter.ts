import create from 'zustand';

interface CounterState {
  count: number;
}

interface Counter extends CounterState {
  inc: () => void;
  setInitial: (initialState: CounterState) => void;
  reset: () => void;
}

const useCounterStore = create<Counter>((set) => ({
  count: 0,
  setInitial: (initialState) => set(initialState),
  inc: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));

export default useCounterStore;
