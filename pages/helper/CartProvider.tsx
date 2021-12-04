//use context cart
import { createContext, useContext, useReducer } from 'react'
import contextProducts, { Action, DispatchContext } from './CartProvider.d'
import { updateLocalStorageCart } from './test'

//check the initial state (should get it from local storage)
//https://stackoverflow.com/questions/54577865/react-createcontext-issue-in-typescript doc
const CartDispatchContext = createContext({} as DispatchContext)
const CartContextState = createContext([] as [] | contextProducts[])

const reducer = (
  state: [] | contextProducts[],
  action: Action
): [] | contextProducts[] => {
  switch (action.type) {
    case 'ADD':
      updateLocalStorageCart()
      ////update local storage
      return [...state, action.item]
    case 'REMOVE':
      //update local storage
      const cartProducts: [] | contextProducts[] = [...state]
      cartProducts.splice(action.index, 1)
      return cartProducts
    default:
      throw new Error(`couldn't ${action}`)
  }
}

//why reactNode? https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement/59840095#59840095
const CartProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, [])
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartContextState.Provider value={state}>
        {children}
      </CartContextState.Provider>
    </CartDispatchContext.Provider>
  )
}
export default CartProvider

export const useCart = () => useContext(CartContextState)
export const useDispatchCart = () => useContext(CartDispatchContext)
