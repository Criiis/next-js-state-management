import { useState, useReducer } from 'react'
import type { NextPage } from 'next'
// import { type } from 'os'

//reducer actions keywords
const actions: { increment: 'INCREMENT'; decrement: 'DECREMENT' } = {
  increment: 'INCREMENT',
  decrement: 'DECREMENT',
}

//reducer action type
type reducerActions =
  | { type: 'INCREMENT'; numb: number }
  | { type: 'DECREMENT'; numb: number }

//reducer
function reducer(state: number, action: reducerActions): number {
  switch (action.type) {
    case actions.increment:
      console.log(action)
      return state + action.numb
    case actions.decrement:
      if (state === 0) return state
      return state - action.numb
    default:
      throw new Error()
  }
}

const Home: NextPage = () => {
  const [test, setTest] = useState<boolean>(false)
  const [counter, setCounter] = useState<number>(0)
  const [state, dispatch] = useReducer(reducer, 0)

  /**
   * functionality for useState
   * @param numb
   * @returns number
   */
  //increase function for the counter -> useState
  const increase = (numb: number): void =>
    setCounter((prevNumber) => prevNumber + numb)
  //decrease function for the counter -> useState
  const decrease = (numb: number): void => {
    if (!counter) return
    setCounter((prevNumber) => prevNumber - numb)
  }

  /**
   * functionality for useReducer
   * @param numb
   * @returns void
   */
  //increase function for the counter -> useReducer
  const increaseUseReducer = (numb: number): void => {
    dispatch({ type: actions.increment, numb })
  }
  //decrease function for the counter -> useReducer
  const decreaseUseReducer = (numb: number): void => {
    dispatch({ type: actions.decrement, numb })
  }

  console.log(state)

  return (
    <>
      <h1>HOME PAGE</h1>
      <button onClick={() => setTest(!test)}>hello world!</button>
      {/* !false is a condition and i'm setting the value of useState as the result of the condition */}
      {test && <span>this is just a test to use useState</span>}
      <br />
      <br />
      <button onClick={() => increase(1)}>+</button>
      {counter}
      <button onClick={() => decrease(1)}>-</button>
      <br />
      <br />
      <button onClick={() => increaseUseReducer(1)}>+</button>
      {state}
      <button onClick={() => decreaseUseReducer(1)}>-</button>
    </>
  )
}

export default Home
