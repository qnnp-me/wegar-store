import {Mutate, StoreApi, StoreMutatorIdentifier} from "zustand/vanilla";
import {WegarStorages} from "wegar-store";
import {create} from "zustand/react";
import {createJSONStorage, persist} from "zustand/middleware";

type WegarStorage<T = unknown, Mos extends [StoreMutatorIdentifier, unknown][] = []> = Mutate<StoreApi<T>, Mos>;

const watchStorage = (name: string, storage: WegarStorage, initialState: never) => {

  window.addEventListener('storage', (e) => {
    if (e.key === `wegar-storage:${name as string}`) {
      storage.setState(JSON.parse(e.newValue as string)?.state || {state: initialState})
    }
  })
}
export const getStorage = <T extends WegarStorages = WegarStorages, K extends keyof T = keyof T, S extends T[K] = T[K]>(name: K, initialState?: T[K]) => {
  globalThis.wegarStorage = globalThis.wegarStorage || {} as typeof globalThis.wegarStorage
  if (!globalThis.wegarStorage[name as string]) {
    const storage = create<{
      state: S;
      setState: (state: S | ((state: S) => S)) => void;
    }>()(
      persist(setState => ({
        state: initialState as S,
        setState: (newState) => {
          setState(preState => ({
            state: typeof newState === 'function' ? (newState as CallableFunction)(preState.state) : newState
          }))
        },
      }), {
        name: `wegar-storage:${name as string}`,
        storage: createJSONStorage(() => localStorage),
      }),
    )
    globalThis.wegarStorage[name as string] = storage
    watchStorage(name as string, storage, initialState as never)
  }
  return globalThis.wegarStorage[name as string] as WegarStorage<{
    state: S,
    setState: (state: S | ((state: S) => S)) => void
  }>
}
