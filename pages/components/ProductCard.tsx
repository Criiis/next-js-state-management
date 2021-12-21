import Link from 'next/link'
import Image from 'next/image'
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
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '200px',
        }}
      >
        <Image
          alt={el.title}
          src={el.image}
          layout='fill'
          objectFit='contain' // Scale your image down to fit into the container
        />
      </div>
      {/* <img loading='lazy' src={el.image} alt={el.title} /> */}
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
