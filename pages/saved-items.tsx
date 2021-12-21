import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import productsDataTypes from './components/products'
import { useSavedItems } from './helper/SavedItemsProvider'
import { useCart } from './helper/CartProvider'

const SavedItems: NextPage = () => {
  const { addItem } = useCart()
  const { state, removedSavedItem } = useSavedItems()
  return (
    <>
      <h1>My saved Items</h1>
      {!state.length ? <h2>Saved items is empty</h2> : null}

      {state.map((el: productsDataTypes, i: number) => (
        <div key={i}>
          <div
            style={{
              position: 'relative',
              width: '150px',
              paddingBottom: '20%',
            }}
          >
            <Image
              alt={el.title}
              src={el.image}
              layout='fill'
              objectFit='contain' // Scale your image down to fit into the container
            />
          </div>

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
          <hr />
        </div>
      ))}
    </>
  )
}

export default SavedItems
