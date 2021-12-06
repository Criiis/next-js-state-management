import Link from 'next/link'
import styles from '../../styles/components/ProductCard.module.scss'
import productsDataTypes from './products'
import { useDispatchCart, useCart } from '../helper/CartProvider'
import contextProducts, { DispatchContext } from '../helper/CartProvider.d'

export default function ProductCard({
  el,
}: {
  el: productsDataTypes
}): JSX.Element {
  const dispatch: DispatchContext = useDispatchCart()
  const addToCart = (item: contextProducts): void => {
    dispatch({ type: 'ADD', item })
  }

  const { test } = useCart()

  return (
    <div className={styles.singleProduct}>
      <img loading='lazy' src={el.image} alt={el.title} />
      <p>{el.title}</p>
      <p>{el.price}</p>
      <button onClick={() => test(el, 3)}>Add to cart</button>
      <br />
      <Link href='/product/[id]' as={`/product/${el.id}`}>
        <a>See product</a>
      </Link>
    </div>
  )
}
