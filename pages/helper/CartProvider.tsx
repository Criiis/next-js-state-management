//use context cart
import { createContext, useContext, useReducer, useEffect } from 'react'
import {
  contextProducts,
  Action,
  DispatchContext,
  contextTypes,
  stateType,
} from './CartProvider.d'
import { useSetLocalStorage } from './localStorage'

const CartDispatchContext = createContext({} as DispatchContext)
const CartContextState = createContext({} as contextTypes)

const cartStorage: string = 'cartStorage' // <- localStorage key

const reducer = (state: stateType, action: Action): stateType => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.item]
    case 'REMOVE':
      const cartProducts: stateType = [...state]
      cartProducts.splice(action.index, 1)
      return cartProducts
    default:
      throw new Error(`couldn't ${action}`)
  }
}

const CartProvider = ({ children }: { children?: React.ReactNode }) => {
  const [localStorage, setLocalStorage] = useSetLocalStorage(cartStorage, [])
  const [state, dispatch] = useReducer(reducer, localStorage)

  //function to add items -> passing from CartContextState/useCart
  const addItem = (item: contextProducts, quantity = 1) => {
    console.log(quantity)
    dispatch({ type: 'ADD', item })
  }

  //function to remove items -> passing from CartContextState/useCart
  const removeItem = (index: number) => {
    dispatch({ type: 'REMOVE', index })
  }

  useEffect(() => {
    setLocalStorage(state)
  }, [state, localStorage])

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartContextState.Provider value={{ state, addItem, removeItem }}>
        {/*state will be the items and addItem will be the function | it will pass all to "useCart" as an object*/}
        {children}
      </CartContextState.Provider>
    </CartDispatchContext.Provider>
  )
}
export default CartProvider

export const useCart = () => useContext(CartContextState)
export const useDispatchCart = () => useContext(CartDispatchContext)
