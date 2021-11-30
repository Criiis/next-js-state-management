//use context cart
import { createContext, useContext, useReducer } from 'react'

//https://stackoverflow.com/questions/54577865/react-createcontext-issue-in-typescript doc
interface IContextProps {
  dispatch: ({ type }: { type: any }) => void
}

const CartContextState: any = createContext({} as IContextProps) //check this
const CartDispatchContext: any = createContext({} as IContextProps) //check this

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.item]
    case 'REMOVE':
      const cartProducts: any = [...state]
      cartProducts.splice(action.index, 1)
      return cartProducts
      return
    default:
      throw new Error(`couldn't ${action.type}`)
  }
}

const CartProvider = ({ children }: any) => {
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
