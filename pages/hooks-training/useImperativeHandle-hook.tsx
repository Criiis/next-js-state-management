import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react'
import type { NextPage } from 'next'

const useImperativeHandleHook: NextPage = () => {
  const buttonRef = useRef<any>(null)
  return (
    <>
      <h1>useImperativeHandle</h1>
      <button onClick={() => buttonRef.current!.alterShowText()}>
        change state Parent
      </button>
      <br />
      <TestingNC ref={buttonRef} />
    </>
  )
}

export default useImperativeHandleHook

const TestingNC = forwardRef((props, ref): JSX.Element => {
  const [showText, setShowText] = useState(true)

  useImperativeHandle(ref, () => ({
    alterShowText() {
      setShowText(!showText)
    },
  }))

  return (
    <>
      {showText && 'hello world!'}
      <br />
      <button onClick={() => setShowText(!showText)}>change state Child</button>
    </>
  )
})
