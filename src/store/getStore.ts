import {createStore, Mutate, StoreApi, StoreMutatorIdentifier} from "zustand/vanilla";
import {WegarStores} from "wegar-store";

type WegarStore<T = unknown, Mos extends [StoreMutatorIdentifier, unknown][] = []> = Mutate<StoreApi<T>, Mos>;
export const getStore = <T extends WegarStores = WegarStores, K extends keyof T = keyof T>(name: K, initialState?: T[K]) => {
  globalThis.wegarStore = globalThis.wegarStore || {} as typeof globalThis.wegarStore
  if (!globalThis.wegarStore[name as string]) {
    globalThis.wegarStore[name as string] = createStore<{
      state: T[K];
      setState: (state: T[K] | ((state: T[K]) => T[K])) => void;
    }>(
      setState => ({
        state: initialState as T[K],
        setState: (newState) => {
          setState(preState => ({
            state: typeof newState === 'function' ? (newState as CallableFunction)(preState.state) : newState
          }))
        }
      }),
    )
  }
  return globalThis.wegarStore[name as string] as WegarStore<{
    state: T[K],
    setState: (state: T[K] | ((state: T[K]) => T[K])) => void
  }>
}
