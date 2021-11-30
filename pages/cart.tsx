import type { NextPage } from 'next'
import Link from 'next/dist/client/link'
import { useCart, useDispatchCart } from './helper/CartProvider'

const Cart: NextPage = () => {
  const items: any = useCart()
  console.log(items)
  const dispatch: any = useDispatchCart() //https://stackoverflow.com/questions/54844839/typescript-how-to-type-the-dispatch-in-redux check the types
  const removeToCart = (index: any) => {
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
