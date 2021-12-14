import type { NextPage } from 'next'
import Link from 'next/dist/client/link'
import { useCart } from './helper/CartProvider'
import { contextProducts } from './helper/CartProvider.d'

const Cart: NextPage = () => {
  const {
    state,
    removeItem,
    totalProductValue,
    addSingleQuantity,
    removeSingleQuantity,
  } = useCart()

  const singleCartProducts = state.map((el: contextProducts, i: number) => (
    <div key={i}>
      <img loading='lazy' src={el.image} alt={el.title} width='150px' />
      <p>{el.title}</p>
      <p>{el.price} £</p>
      <button onClick={() => addSingleQuantity(el)}>+</button>
      <span> Qty. {el?.quantity} </span>
      {el?.quantity! > 1 && (
        <button onClick={() => removeSingleQuantity(el)}>-</button>
      )}{' '}
      <br />
      <button onClick={() => removeItem(el)}>remove from cart</button>
      <br />
      <button>move to saved items</button>
      <br />
      <Link href='/product/[id]' as={`/product/${el.id}`}>
        <a>See product</a>
      </Link>
    </div>
  ))

  return (
    <>
      <h1>cart page</h1>
      {state.length <= 0 && <h2>cart empty</h2>}
      {singleCartProducts}
      <p>total: {totalProductValue()} £</p>
    </>
  )
}

export default Cart
