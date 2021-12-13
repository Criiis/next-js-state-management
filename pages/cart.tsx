import type { NextPage } from 'next'
import Link from 'next/dist/client/link'
import { useCart } from './helper/CartProvider'
import { contextProducts } from './helper/CartProvider.d'

const Cart: NextPage = () => {
  const { state, removeItem, totalProductValue } = useCart()

  const singleCartProducts = state.map((el: contextProducts, i: number) => (
    <div key={i}>
      <img loading='lazy' src={el.image} alt={el.title} width='150px' />
      <p>{el.title}</p>
      <p>
        {el.price} £ | qty.{el?.quantity}
      </p>

      {/* print values from 1 to 10 if number is miner them 10*/}
      {/* otherwise print value until number of items +5 */}
      {/* <select>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
        <option value='8'>8</option>
        <option value='9'>9</option>
        <option value='10'>10</option>
      </select> */}

      {/* could create a + and - button to update the quantity  <-------- should go for this*/}
      {/* + 1 - */}

      <button onClick={() => removeItem(i)}>remove from cart</button>
      <br />
      <Link href='/product/[id]' as={`/product/${el.id}`}>
        <a>See product</a>
      </Link>
    </div>
  ))

  return (
    <>
      <h1>cart page</h1>
      {state.length <= 0 ? <h2>cart empty</h2> : ``}
      {singleCartProducts}
      <p>total: {totalProductValue()} £</p>
    </>
  )
}

export default Cart
