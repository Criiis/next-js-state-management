//use context cart
import { createContext, useContext, useReducer, useEffect } from 'react'
import contextProducts, { Action, DispatchContext } from './CartProvider.d'
import { useSetLocalStorage } from './localStorage'

//https://stackoverflow.com/questions/54577865/react-createcontext-issue-in-typescript doc
const CartDispatchContext = createContext({} as DispatchContext)
const CartContextState = createContext([] as [] | contextProducts[])

const cartStorage: string = 'cartStorage' // <- localStorage key

const reducer = (
  state: [] | contextProducts[],
  action: Action
): [] | contextProducts[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.item]
    case 'REMOVE':
      const cartProducts: [] | contextProducts[] = [...state]
      cartProducts.splice(action.index, 1)
      return cartProducts
    default:
      throw new Error(`couldn't ${action}`)
  }
}

//why reactNode? https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement/59840095#59840095
const CartProvider = ({ children }: { children?: React.ReactNode }) => {
  const [localStorage, setLocalStorage] = useSetLocalStorage(cartStorage, [])
  const [state, dispatch] = useReducer(reducer, localStorage)

  useEffect(() => {
    setLocalStorage(state)
  }, [state, localStorage])

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
