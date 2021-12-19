import type { NextPage } from 'next'
import productsDataTypes from './components/products'
import Link from 'next/link'
import { useSavedItems } from './helper/SavedItemsProvider'
import { useCart } from './helper/CartProvider'

const SavedItems: NextPage = () => {
  const { addItem } = useCart()
  const { state, removedSavedItem } = useSavedItems()
  return (
    <>
      <h1>My saved Items</h1>
      {!state.length && `Saved items is empty`}

      {state.map((el: productsDataTypes, i: number) => (
        <div key={i}>
          <img loading='lazy' src={el.image} alt={el.title} width='150px' />
          <p>{el.title}</p>
          <p>{el.price} £</p>
          <button onClick={() => removedSavedItem(el)}>
            remove from saved Items
          </button>
          <br />
          <button
            onClick={() => {
              addItem(el, 1)
              removedSavedItem(el)
            }}
          >
            move to cart
          </button>
          <br />
          <Link href='/product/[id]' as={`/product/${el.id}`}>
            <a>See product</a>
          </Link>
        </div>
      ))}
    </>
  )
}

export default SavedItems
