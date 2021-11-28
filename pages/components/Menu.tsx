import Link from 'next/link'
import { useCart } from 'react-use-cart'

export default function Menu(): JSX.Element {
  const { totalItems } = useCart()
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
          <a>cart {totalItems}</a>
        </Link>
      </li>
    </ul>
  )
}
