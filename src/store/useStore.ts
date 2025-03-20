import {useEffect, useState} from "react";
import {getStore} from "./getStore.ts";
import {WegarStores} from "wegar-store";

export const useStore = <T extends WegarStores = WegarStores, K extends keyof T = keyof T>(name: K, initialState?: T[K]) => {
  const store = getStore<T>(name, initialState)
  const [state, setState] = useState(store.getState().state)
  useEffect(() => {
    store.subscribe((state) => {
      setState(state.state)
    });
  }, []);
  return [state, store.getState().setState] as const
}
