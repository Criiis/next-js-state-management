import type { NextPage } from 'next'
import Link from 'next/dist/client/link'
import { useCart, useDispatchCart } from './helper/CartProvider'
import contextProducts, { DispatchContext } from './helper/CartProvider.d'

const Cart: NextPage = () => {
  const items: contextProducts[] = useCart()

  const dispatch: DispatchContext = useDispatchCart()
  const removeToCart = (index: number): void => {
    dispatch({ type: 'REMOVE', index })
  }

  return (
    <>
      <h1>cart page</h1>
      <h2>what can do?!</h2>
      {items.map((el: any, i: any) => (
        <div key={i}>
          <img loading='lazy' src={el.image} alt={el.title} width='150px' />
          <p>{el.title}</p>
          <p>{el.price}</p>
          <button onClick={() => removeToCart(i)}>remove from cart</button>
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
