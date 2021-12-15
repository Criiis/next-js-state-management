import { useState } from 'react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [test, setTest] = useState(false)

  return (
    <>
      <h1>HOME PAGE</h1>
      <button onClick={() => setTest(!test)}>hello world!</button>
      {test && <span>this is just a test to use useState</span>}
    </>
  )
}

export default Home
