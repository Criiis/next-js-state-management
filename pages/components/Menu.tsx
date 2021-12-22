import Link from 'next/link'
import { useCart } from '../helper/CartProvider'
import { useSavedItems } from '../helper/SavedItemsProvider'
import { BsFillHeartFill, BsBasketFill } from 'react-icons/bs'
import styles from '../../styles/components/Menu.module.scss'
console.log(styles)

export default function Menu(): JSX.Element {
  const { totalItemsCart } = useCart()
  const { state } = useSavedItems()
  return (
    <nav className={styles.headerNav}>
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
          <a className={styles.svgCartItems}>
            <BsBasketFill />
            <span className={styles.titleIcon}>{totalItemsCart()}</span>
          </a>
        </Link>
      </li>
      <li>
        <Link href='/saved-items'>
          <a className={styles.svgSavedItems}>
            <BsFillHeartFill />
            <span className={styles.titleIcon}>{state.length}</span>
          </a>
        </Link>
      </li>
    </nav>
  )
}
