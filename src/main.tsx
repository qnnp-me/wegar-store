import {createRoot} from 'react-dom/client'
import {getStore, useStore} from "./store";
import {useEffect, useState} from "react";


function App() {
  const [state, setState] = useState(0)
  const [store, setStore] = useStore('count', 0)
  const {getState, subscribe} = getStore('count', 0)
  useEffect(() => {
    subscribe(state => {
      setState(state.state)
    })
  }, []);
  useEffect(() => {
    getState().setState(store)
  }, [store]);
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '1rem',
      fontSize: '2rem',
    }}>
      <div>state: {state}</div>
      <div>store: {store}</div>
      <button style={{
        fontSize: '2rem',
      }} onClick={() => setStore(store + 1)}>store +1
      </button>
      <button style={{
        fontSize: '2rem',
      }} onClick={() => getState().setState(getState().state + 1)}>common state +1
      </button>
    </div>
  )
}

createRoot(document.getElementById('root')!)
  .render(<App/>)
