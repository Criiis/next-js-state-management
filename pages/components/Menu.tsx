import Link from 'next/link'
import { useCart } from '../helper/CartProvider'

export default function Menu(): JSX.Element {
  const items: any = useCart()

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
          <a>cart {items.length}</a>
        </Link>
      </li>
    </ul>
  )
}
