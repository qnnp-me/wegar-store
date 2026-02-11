import {useCallback, useEffect, useMemo, useState} from "react";
import {WegarStorages} from "wegar-store";
import {getStorage} from "./getStorage.ts";

export const useStorage = <T extends WegarStorages = WegarStorages, K extends keyof T = keyof T, S extends T[K] = T[K]>(name: K, initialState?: T[K]) => {
  const storage = useMemo(
    () => getStorage<T>(name, initialState),
    [initialState, name]
  )
  const [state, setState] = useState<S>(storage.getState().state as S)
  useEffect(() => {
    storage.subscribe((state) => {
      setState(state.state as S)
    });
  }, [storage]);
  const setStorageStore = useCallback<(state: S | ((state: S) => S)) => void>((state) => {
    storage.getState().setState(state as S)
  }, [storage])
  return [state, setStorageStore] as const
}
