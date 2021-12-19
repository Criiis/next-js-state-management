import Link from 'next/link'
import styles from '../../styles/components/ProductCard.module.scss'
import productsDataTypes from './products'
import { useCart } from '../helper/CartProvider'
import { useSavedItems } from '../helper/SavedItemsProvider'

export default function ProductCard({
  el,
}: {
  el: productsDataTypes
}): JSX.Element {
  const { addItem } = useCart()
  const { state, addSavedItem, removedSavedItem } = useSavedItems()

  return (
    <div className={styles.singleProduct}>
      <img loading='lazy' src={el.image} alt={el.title} />
      <p>{el.title}</p>
      <p>{el.price} £</p>
      <button onClick={() => addItem(el, 1)}>Add to cart</button>
      <br />
      {state.findIndex((e: productsDataTypes) => e.id === el.id) === -1 ? (
        <button onClick={() => addSavedItem(el)}>Add to saved items</button>
      ) : (
        <button onClick={() => removedSavedItem(el)}>
          remove from saved items
        </button>
      )}
      <br />
      <Link href='/product/[id]' as={`/product/${el.id}`}>
        <a>See product</a>
      </Link>
    </div>
  )
}
