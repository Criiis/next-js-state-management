//use context cart
import { createContext, useContext, useReducer, useEffect } from 'react'
import {
  contextProducts,
  action,
  dispatchContext,
  contextTypes,
  stateType,
  globalAction,
} from './CartProvider.d'
import productsDataTypes from '../components/products.d'
import { useSetLocalStorage } from './localStorage'

const ACTIONS: globalAction = {
  //HAVE TO CREATE A TYPE FOR THIS
  ADD: 'ADD',
  REMOVE: 'REMOVE',
}

const CartDispatchContext = createContext({} as dispatchContext)
const CartContextState = createContext({} as contextTypes)

const cartStorage: string = 'cartStorage' // <- localStorage key

const reducer = (state: stateType, action: action): stateType => {
  switch (action.type) {
    case ACTIONS.ADD:
      //function to map and change the current product || and filter the false
      const productAdded: (false | contextProducts)[] = state
        .map((el) => {
          if (el?.id === action.id) return false
          return el
        })
        .filter((el: contextProducts | false) => el instanceof Object)

      return [...productAdded, action.payload] as stateType //return this as object of all items, total price, total items in cart 
    case ACTIONS.REMOVE:
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
    //item + qty
    const payload: contextProducts = { ...item, quantity }
    //check if the product exist on state
    const stateItem = state.find((el: contextProducts) => el.id === payload.id)
    //if product exist in the state get the quantity and add the new quantity to payload
    if (stateItem) payload.quantity = quantity + stateItem?.quantity!
    // return the action, id of the item and payload
    dispatch({ type: ACTIONS.ADD, id: payload.id, payload })
  }

  //function to remove items -> passing from CartContextState/useCart
  const removeItem = (index: number) => {
    dispatch({ type: ACTIONS.REMOVE, index })
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
