import { useState, useReducer, useEffect, useCallback } from 'react'
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
  const [timer, setTimer] = useState<number>(0)

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

  /**
   * create a timer in react using useEffect to lear
   * the cleanup functionality
   * useCallback hook
   *
   */
  useEffect(() => {
    console.log(timer)
    const myTimer = setTimeout(() => {
      setTimer((prevTimer) => prevTimer + 1)
    }, 1000)
    return () => {
      clearTimeout(myTimer)
    }
  }, [timer])

  const resetTimer = useCallback((initialNumber: number) => {
    setTimer(initialNumber)
  }, [])

  return (
    <>
      <h1>HOME PAGE</h1>
      <button onClick={() => setTest(!test)}>hello world!</button>
      {/* !false is a condition and i'm setting the value of useState as the result of the condition */}
      {test && <span>this is just a test to use useState</span>}
      <br />
      <hr />
      <br />
      <button onClick={() => increase(1)}>+</button>
      {counter}
      <button onClick={() => decrease(1)}>-</button>
      <br />
      <hr />
      <br />
      <button onClick={() => increaseUseReducer(1)}>+</button>
      {state}
      <button onClick={() => decreaseUseReducer(1)}>-</button>
      <br />
      <hr />
      <br />

      <p>{timer}</p>
      <button onClick={() => resetTimer(0)}>reset timer</button>

      <br />
      <hr />
      <br />
      <p>
        dependency arrays, useEffect, useMemo, useCallback
        https://www.youtube.com/watch?v=lStfMBiWROQ clean up functions on
        useEffect https://www.youtube.com/watch?v=F-0SZ_TicXA
      </p>
    </>
  )
}

export default Home
