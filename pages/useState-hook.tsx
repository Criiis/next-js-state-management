import { useState, useEffect } from 'react'
import type { NextPage } from 'next'

const useStaterHook: NextPage = () => {
  const [counter, setCounter] = useState(0)
  const [showText, setShowText] = useState(true)

  const increase = (numb: number): void =>
    setCounter((prevNumber) => prevNumber + numb)

  useEffect(() => {
    counter % 2 !== 0 ? setShowText(false) : setShowText(true)
  }, [counter, showText])

  return (
    <>
      <h1>useReducer</h1>
      <button onClick={() => increase(1)}>change the state</button>
      {counter}
      {showText && <p>this is just a test to use useState</p>}
    </>
  )
}

export default useStaterHook
