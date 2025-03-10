import {useEffect, useState} from 'react'
import {useStore} from "./store/useStore.ts";

const ComponentA = () => {
  const [state, setState] = useStore<number>('test', 0)
  useEffect(() => {
    console.log('state', state)
  }, [state]);
  return (
    <>
      <button onClick={() => setState(state => state + 1)}>
        count is {state}
      </button>
      <hr/>
    </>
  )
}
const ComponentB = () => {
  const [state, setState] = useStore<number>('test', 0)
  useEffect(() => {
    console.log('state', state)
  }, [state]);
  return (
    <>
      <button onClick={() => setState(state => state + 1)}>
        count is {state}
      </button>
      <hr/>
    </>
  )
}

function App() {
  const [showComponentA, setShowComponentA] = useState(true)
  const [showComponentB, setShowComponentB] = useState(true)
  return (
    <>
      <button onClick={() => setShowComponentA(!showComponentA)}>
        {showComponentA ? 'hide' : 'show'}
      </button>
      <hr/>
      {showComponentA && <ComponentA/>}
      <button onClick={() => setShowComponentB(!showComponentB)}>
        {showComponentB ? 'hide' : 'show'}
      </button>
      <hr/>
      {showComponentB && <ComponentB/>}
    </>
  )
}

export default App
