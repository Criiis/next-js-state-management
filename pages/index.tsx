import { useState } from 'react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [test, setTest] = useState<boolean>(false)
  const [counter, setCounter] = useState<number>(0)

  const increase = (numb: number): void =>
    setCounter((prevNumber) => prevNumber + numb)

  const decrease = (numb: number): void => {
    if (!counter) return
    setCounter((prevNumber) => prevNumber - numb)
  }

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
    </>
  )
}

export default Home
