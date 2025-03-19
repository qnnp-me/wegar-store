import {useEffect, useState} from "react";
import {getStore} from "./getStore.ts";
import {WegarStores} from "wegar-store";

export const useStore = <T extends WegarStores = WegarStores, K extends keyof T = keyof T, S extends T[K] = T[K]>(name: K, initialState?: S) => {
  const store = getStore<T>(name, initialState)
  const [state, setState] = useState<S>(store.getState().state as S)
  useEffect(() => {
    store.subscribe((state) => {
      setState(state.state as S)
    });
  }, []);
  return [state, store.getState().setState] as const
}