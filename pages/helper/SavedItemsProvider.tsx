import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { useSetLocalStorage } from './localStorage'
import { contextProducts } from './CartProvider.d'
import { stateType } from './SavedItemsProvider.d'

const savedItemsStorage = 'savedItems'
const SavedItemsDispatchContext = createContext({} as any)
const SavedItemsContextState = createContext({} as any) //passed in the  value of SavedItemsContextState.Provider

const reducer = (state: stateType, action: any): stateType => {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]
    case 'REMOVE': {
      const cartProducts: stateType = [...state]
      const removeIndex: number = cartProducts.findIndex(
        (el: contextProducts) => el.id === action.id
      )
      cartProducts.splice(removeIndex, 1)
      return [...cartProducts]
    }
    default:
      throw new Error(`couldn't ${action}`)
  }
}

const SavedItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [localStorage, setLocalStorage] = useSetLocalStorage(
    savedItemsStorage,
    []
  )
  const [state, dispatch] = useReducer(reducer, localStorage)

  useEffect(() => {
    setLocalStorage(state)
  }, [state, localStorage])

  const addSavedItem = (payload: contextProducts): void => {
    dispatch({ type: 'ADD', payload }) // return the action, id of the item and payload
  }

  const removedSavedItem = (payload: contextProducts): void => {
    dispatch({ type: 'REMOVE', payload, id: payload.id }) // return the action, id of the item and payload
  }

  return (
    <SavedItemsDispatchContext.Provider value={dispatch}>
      <SavedItemsContextState.Provider
        value={{ state, addSavedItem, removedSavedItem }}
      >
        {/*this useContext (useSavedItems) is the one passing the value to all application*/}
        {children}
      </SavedItemsContextState.Provider>
    </SavedItemsDispatchContext.Provider>
  )
}
export default SavedItemsProvider

export const useDispatchSavedItems = () => useContext(SavedItemsDispatchContext)
export const useSavedItems = () => useContext(SavedItemsContextState)
