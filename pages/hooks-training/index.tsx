import type { NextPage } from 'next'
import Link from 'next/dist/client/link'

const hooks: NextPage = () => {
  return (
    <>
      <h1>Hooks</h1>
      <li>
        <Link href='./hooks-training/reducer-hook'>
          <a>useReducer</a>
        </Link>
      </li>
      <li>
        <Link href='./hooks-training/useImperativeHandle-hook'>
          <a>useImperativeHandle</a>
        </Link>
      </li>
      <li>
        <Link href='./hooks-training/useLayoutEffect-hook'>
          <a>useLayoutEffect</a>
        </Link>
      </li>
      <li>
        <Link href='./hooks-training/useState-hook'>
          <a>useState</a>
        </Link>
      </li>
    </>
  )
}

export default hooks
