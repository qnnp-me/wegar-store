import {useEffect, useState} from "react";
import {getStore} from "./getStore.ts";

export const useStore = <T = unknown>(name: string, initialState?: T) => {
  const store = getStore<T>(name, initialState)
  const [state, setState] = useState<T>(store.getState().state)
  useEffect(() => {
    store.subscribe((state) => {
      setState(state.state)
    });
  }, []);
  return [state, store.getState().setState] as const
}