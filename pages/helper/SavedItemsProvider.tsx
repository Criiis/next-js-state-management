import { createContext, useContext, useReducer, useEffect } from 'react'
import { useSetLocalStorage } from './localStorage'

const savedItemsStorage = 'savedItems'
const SavedItemsDispatchContext = createContext({} as any)
const SavedItemsContextState = createContext({} as any)

const reducer = (state: any, action: any): any => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload]
    case 'REMOVE':
      const cartProducts: any = [...state]
      const removeIndex: number = cartProducts.findIndex(
        (el: any) => el.id === action.id
      )
      cartProducts.splice(removeIndex, 1)
      return [...cartProducts]
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

  const addSavedItem = (payload: any): any => {
    dispatch({ type: 'ADD', payload }) // return the action, id of the item and payload
  }

  const removedSavedItem = (payload: any): any => {
    dispatch({ type: 'REMOVE', payload, id: payload.id }) // return the action, id of the item and payload
  }
  console.log(state)

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
