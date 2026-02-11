import {useCallback, useEffect, useMemo, useState} from "react";
import {getStore} from "./getStore.ts";
import {WegarStores} from "wegar-store";

export const useStore = <T extends WegarStores = WegarStores, K extends keyof T = keyof T, S extends T[K] = T[K]>(name: K, initialState?: T[K]) => {
  const store = useMemo(
    () => getStore<T>(name, initialState),
    [initialState, name]
  )
  const [state, setState] = useState<S>(store.getState().state as S)
  useEffect(() => {
    store.subscribe((state) => {
      setState(state.state as S)
    });
  }, [store]);
  const setStoreState = useCallback<(state: S | ((state: S) => S)) => void>((state) => {
    store.getState().setState(state as S)
  }, [store])
  return [state, setStoreState] as const
}
