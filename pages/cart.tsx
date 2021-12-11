import type { NextPage } from 'next'
import Link from 'next/dist/client/link'
import { useCart } from './helper/CartProvider'
import { contextProducts } from './helper/CartProvider.d'

const Cart: NextPage = () => {
  const { state, removeItem } = useCart()

  return (
    <>
      <h1>cart page</h1>
      {state.length <= 0 ? <h2>cart empty</h2> : ``}
      {state.map((el: contextProducts, i: number) => (
        <div key={i}>
          <img loading='lazy' src={el.image} alt={el.title} width='150px' />
          <p>
            {el.title} | qty.{el?.quantity}
          </p>
          <p>{el.price} £</p>
          <button onClick={() => removeItem(i)}>remove from cart</button>
          <br />
          <Link href='/product/[id]' as={`/product/${el.id}`}>
            <a>See product</a>
          </Link>
        </div>
      ))}
    </>
  )
}

export default Cart
