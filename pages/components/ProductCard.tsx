import Link from 'next/link'
import styles from '../../styles/components/ProductCard.module.scss'
import productsDataTypes from './products'
import { useDispatchCart } from '../helper/CartProvider'
import contextProducts from '../helper/CartProvider.d'

export default function ProductCard({
  el,
}: {
  el: productsDataTypes
}): JSX.Element {
  const dispatch: any = useDispatchCart() //https://stackoverflow.com/questions/54844839/typescript-how-to-type-the-dispatch-in-redux check the types
  const addToCart = (item: contextProducts): void => {
    dispatch({ type: 'ADD', item })
  }

  return (
    <div className={styles.singleProduct}>
      <img loading='lazy' src={el.image} alt={el.title} />
      <p>{el.title}</p>
      <p>{el.price}</p>
      <button onClick={() => addToCart(el)}>Add to cart</button>
      <br />
      <Link href='/product/[id]' as={`/product/${el.id}`}>
        <a>See product</a>
      </Link>
    </div>
  )
}
