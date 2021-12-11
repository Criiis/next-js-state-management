import Link from 'next/link'
import { useCart } from '../helper/CartProvider'

export default function Menu(): JSX.Element {
  const { state } = useCart()

  console.log(state)

  return (
    <ul>
      <li>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href='/products'>
          <a>products</a>
        </Link>
      </li>
      <li>
        <Link href='/cart'>
          <a>cart {'number of state'}</a>
        </Link>
      </li>
    </ul>
  )
}
