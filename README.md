# Wegar Store

Wegar 前端状态管理 

## 在 React 中
```tsx
import {useStore} from 'wegar-store'

export const App = () => {
  const [count, setCount] = useStore('count', 0)
  return (
    <>
      <div>count: {count}</div>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  )
}
```

## 其他项目中
```ts
import {getStore} from 'wegar-store'

const {getState, subscribe} = getStore('count', 0)

subscribe(store => {
  console.log('new state:', store.state)
})

const updateState = () => {
  getState().setState(getState().state + 1)
}
```