//use context cart
import React, { createContext, useContext, useReducer, useEffect } from 'react'
import {
  contextProducts,
  action,
  dispatchContext,
  contextTypes,
  stateType,
  globalAction,
} from './CartProvider.d'
import { useSetLocalStorage } from './localStorage'

const ACTIONS: globalAction = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  ADDSINGLE: 'ADDSINGLE',
  REMOVESINGLE: 'REMOVESINGLE',
}

const CartDispatchContext = createContext({} as dispatchContext)
const CartContextState = createContext({} as contextTypes)

// localStorage key
const cartStorage: string = 'cartStorage'

//reducer functionality
const reducer = (state: stateType, action: action): stateType => {
  switch (action.type) {
    case ACTIONS.ADD: {
      const addIndex: number = state.findIndex((el) => el.id === action.id)
      if (addIndex === -1) return [action.payload, ...state]
      state.splice(addIndex, 1)
      return [action.payload, ...state]
    }
    case ACTIONS.REMOVE: {
      const cartProducts: stateType = [...state]
      const removeIndex: number = cartProducts.findIndex(
        (el) => el.id === action.id
      )
      cartProducts.splice(removeIndex, 1)
      return [...cartProducts]
    }
    case ACTIONS.ADDSINGLE:
      return [...state]
    case ACTIONS.REMOVESINGLE:
      return [...state]
    default:
      throw new Error(`couldn't ${action}`)
  }
}

//component
const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [localStorage, setLocalStorage] = useSetLocalStorage(cartStorage, []) //local storage initial state
  const [state, dispatch] = useReducer(reducer, localStorage) //local storage initial state

  // dispatch({ type: ACTIONS.INITIAL STATE, id: payload.id, payload })

  useEffect(() => {
    setLocalStorage(state) // update the local storage
  }, [state, localStorage])

  //function to add items -> passing from CartContextState/useCart
  const addItem = (item: contextProducts, quantity = 1) => {
    const payload: contextProducts = { ...item, quantity } //item + qty
    const stateItem = state.find((el: contextProducts) => el.id === payload.id) //check if the product exist on state
    if (stateItem) payload.quantity = quantity + stateItem?.quantity! //if product exist in the state get the quantity and add the new quantity to payload
    dispatch({ type: ACTIONS.ADD, id: payload.id, payload }) // return the action, id of the item and payload
  }

  //function to remove items -> passing from CartContextState/useCart
  const removeItem = (payload: contextProducts) => {
    dispatch({ type: ACTIONS.REMOVE, id: payload.id })
  }

  //increase the quantity of products
  const addSingleQuantity = (payload: contextProducts) => {
    const newQuantity: number = payload?.quantity! + 1
    payload.quantity = newQuantity
    dispatch({ type: ACTIONS.ADDSINGLE, payload })
  }

  //decrease the quantity of products
  const removeSingleQuantity = (payload: contextProducts) => {
    const newQuantity: number = payload?.quantity! - 1
    payload.quantity = newQuantity
    dispatch({ type: ACTIONS.ADDSINGLE, payload })
  }

  //total number of products
  const totalItemsCart = (): number =>
    (state as contextProducts[])?.reduce(
      (total: number, obj: contextProducts): number => obj?.quantity! + total,
      0
    )

  //total price of all products ->
  const totalProductValue = (): number =>
    parseFloat(
      (state as contextProducts[])
        ?.reduce(
          (total: number, obj: contextProducts) =>
            obj?.price * obj?.quantity! + total,
          0
        )
        .toFixed(2)
    )

  return (
    <CartDispatchContext.Provider value={dispatch}>
      {/* handle the data and update the reducer passing all to the CartContextState */}
      <CartContextState.Provider
        value={{
          state,
          addItem,
          removeItem,
          addSingleQuantity,
          removeSingleQuantity,
          totalItemsCart,
          totalProductValue,
        }}
      >
        {/*this useContext (useCart) is the one passing the value to all application*/}
        {children}
      </CartContextState.Provider>
    </CartDispatchContext.Provider>
  )
}
export default CartProvider

export const useDispatchCart = () => useContext(CartDispatchContext)
export const useCart = () => useContext(CartContextState)
