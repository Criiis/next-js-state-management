import type { NextPage } from 'next'
import { useCart } from 'react-use-cart'

const Cart: NextPage = () => {
  const { items } = useCart()
  console.log(items)
  return (
    <>
      <h1>cart page</h1>
      <h2>what can do?!</h2>
    </>
  )
}

export default Cart
