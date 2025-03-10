import {createStore, Mutate, StoreApi, StoreMutatorIdentifier} from "zustand/vanilla";

type WegarStore<T = unknown, Mos extends [StoreMutatorIdentifier, unknown][] = []> = Mutate<StoreApi<T>, Mos>;
export const getStore = <T = unknown>(name: string, initialState?: T) => {
  globalThis.wegarStore = globalThis.wegarStore || {} as typeof globalThis.wegarStore
  if (!globalThis.wegarStore[name]) {
    globalThis.wegarStore[name] = createStore<{
      state: T;
      setState: (state: T | ((state: T) => T)) => void;
    }>(
      setState => ({
        state: initialState as T,
        setState: (newState) => {
          setState(preState => ({
            state: typeof newState === 'function' ? (newState as CallableFunction)(preState.state) : newState
          }))
        }
      }),
    )
  }
  return globalThis.wegarStore[name] as WegarStore<{ state: T, setState: (state: T | ((state: T) => T)) => void }>
}