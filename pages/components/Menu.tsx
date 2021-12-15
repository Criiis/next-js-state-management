import Link from 'next/link'
import { useCart } from '../helper/CartProvider'
import { useSavedItems } from '../helper/SavedItemsProvider'

export default function Menu(): JSX.Element {
  const { totalItemsCart } = useCart()
  const { state } = useSavedItems()
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
          <a>cart {totalItemsCart()}</a>
        </Link>
      </li>
      <li>
        <Link href='/saved-items'>
          <a>Saved Items {state.length}</a>
        </Link>
      </li>
    </ul>
  )
}
