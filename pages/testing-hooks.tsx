import { useReducer, useEffect } from 'react'
import type { NextPage } from 'next'

interface State {
  counter: number
  showText: boolean
}

type reducerActions = { type: 'INCREMENT'; numb: number } | { type: 'SHOWTEXT' }

const actions: { increment: 'INCREMENT'; showText: 'SHOWTEXT' } = {
  increment: 'INCREMENT',
  showText: 'SHOWTEXT',
}

const reducer = (state: State, action: reducerActions): State => {
  switch (action.type) {
    case actions.increment:
      const stateAfterAction = state.counter + action.numb
      const stateShowTextEven = stateAfterAction % 2 === 0 ? true : false

      return {
        counter: stateAfterAction,
        showText: stateShowTextEven,
      }
    case actions.showText:
      return {
        counter: state.counter,
        showText: !state.showText,
      }
    default:
      return state
  }
}

const Hooks: NextPage = () => {
  const [state, dispatch] = useReducer(reducer, {
    counter: 1,
    showText: true,
  })

  useEffect(() => {
    if (state.counter % 2 !== 0) dispatch({ type: actions.showText })
  }, [])

  return (
    <>
      <h1>useReducer</h1>
      <button
        onClick={() => {
          dispatch({ type: actions.increment, numb: 1 })
          // dispatch({ type: actions.showText })
        }}
      >
        change the state
      </button>
      {state.counter}
      {state.showText && <p>this is just a test to use useState</p>}
    </>
  )
}

export default Hooks
