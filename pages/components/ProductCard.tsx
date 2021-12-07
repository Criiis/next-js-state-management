import Link from 'next/link'
import styles from '../../styles/components/ProductCard.module.scss'
import productsDataTypes from './products'
import { useCart } from '../helper/CartProvider'

export default function ProductCard({
  el,
}: {
  el: productsDataTypes
}): JSX.Element {
  const { addItem } = useCart()

  return (
    <div className={styles.singleProduct}>
      <img loading='lazy' src={el.image} alt={el.title} />
      <p>{el.title}</p>
      <p>{el.price}</p>
      <button onClick={() => addItem(el, 1)}>Add to cart</button>
      <br />
      <Link href='/product/[id]' as={`/product/${el.id}`}>
        <a>See product</a>
      </Link>
    </div>
  )
}
