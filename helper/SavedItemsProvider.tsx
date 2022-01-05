import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { useSetLocalStorage } from './localStorage'
import { contextProducts } from './CartProvider.d'
import {
  action,
  stateType,
  dispatchContext,
  contextTypes,
  globalAction,
} from './SavedItemsProvider.d'

const savedItemsStorage = 'savedItems'
const ACTIONS: globalAction = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
}

const SavedItemsDispatchContext = createContext({} as dispatchContext)
const SavedItemsContextState = createContext({} as contextTypes) //passed in the  value of SavedItemsContextState.Provider

const reducer = (state: stateType, action: action): stateType => {
  switch (action.type) {
    case ACTIONS.ADD:
      return [action.payload, ...state]
    case ACTIONS.REMOVE: {
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

  //update the local storage
  useEffect(() => {
    setLocalStorage(state)
  }, [state, setLocalStorage])

  //add Saved Item functionality
  const addSavedItem = (payload: contextProducts): void => {
    dispatch({ type: ACTIONS.ADD, payload }) // return the action, id of the item and payload
  }

  //remove Saved Item functionality
  const removedSavedItem = (payload: contextProducts): void => {
    dispatch({ type: ACTIONS.REMOVE, payload, id: payload.id }) // return the action, id of the item and payload
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
