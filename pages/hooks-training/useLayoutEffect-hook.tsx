import { useLayoutEffect, useEffect, useRef } from 'react'
import type { NextPage } from 'next'

const useLayoutEffectHook: NextPage = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    console.log(titleRef.current?.textContent)
    console.log('hello world2')
  }, [])

  // // next JS don't like this because its effect cannot be encoded into the server renderer's
  // useLayoutEffect(() => {
  //   console.log('hello world!')
  // }, [])

  return (
    <>
      <h1 ref={titleRef}>useLayoutEffec</h1>
    </>
  )
}

export default useLayoutEffectHook
