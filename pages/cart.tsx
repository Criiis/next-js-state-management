import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/dist/client/link'
import { useCart } from './helper/CartProvider'
import { contextProducts } from './helper/CartProvider.d'
import { useSavedItems } from './helper/SavedItemsProvider'

const Cart: NextPage = () => {
  const {
    state,
    removeItem,
    totalProductValue,
    addSingleQuantity,
    removeSingleQuantity,
  } = useCart()

  const { addSavedItem } = useSavedItems()

  //structure for the single item in the cart
  const singleCartProducts = state.map((el: contextProducts, i: number) => (
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
      <button onClick={() => addSingleQuantity(el)}>+</button>
      <span> Qty. {el?.quantity} </span>
      {el?.quantity! > 1 && (
        <button onClick={() => removeSingleQuantity(el)}>-</button>
      )}
      <br />
      <button onClick={() => removeItem(el)}>remove from cart</button>
      <br />

      {useSavedItems().state.find(
        //review this line of code
        (element: contextProducts) => element.id === el.id
      ) ? null : (
        <button
          onClick={() => {
            addSavedItem(el)
            removeItem(el)
          }}
        >
          move to saved items
        </button>
      )}
      <br />
      <Link href='/product/[id]' as={`/product/${el.id}`}>
        <a>See product</a>
      </Link>
      <hr />
    </div>
  ))

  return (
    <>
      <h1>cart page</h1>
      {!state.length ? <h2>cart empty</h2> : null}
      {singleCartProducts}
      <p>total: {totalProductValue()} £</p>
    </>
  )
}

export default Cart
