import {useEffect, useState} from "react";
import {WegarStorages} from "wegar-store";
import {getStorage} from "./getStorage.ts";

export const useStorage = <T extends WegarStorages = WegarStorages, K extends keyof T = keyof T, S extends T[K] = T[K]>(name: K, initialState?: T[K]) => {
  const store = getStorage<T>(name, initialState)
  const [state, setState] = useState<S>(store.getState().state as S)
  useEffect(() => {
    store.subscribe((state) => {
      setState(state.state as S)
    });
  }, []);
  return [state, store.getState().setState as (state: S | ((state: S) => S)) => void] as const
}
