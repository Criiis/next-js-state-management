import { createContext, useContext, useReducer, useEffect } from 'react'

const SavedItemsDispatchContext = createContext({} as any)
const SavedItemsContextState = createContext({} as any)

const reducer = (state: any, action: any): any => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload]
    default:
      throw new Error(`couldn't ${action}`)
  }
}

const SavedItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, [])

  const addSavedItem = (payload: any): any => {
    dispatch({ type: 'ADD', payload }) // return the action, id of the item and payload
  }
  console.log(state)

  return (
    <SavedItemsDispatchContext.Provider value={dispatch}>
      <SavedItemsContextState.Provider value={{ state, addSavedItem }}>
        {children}
      </SavedItemsContextState.Provider>
    </SavedItemsDispatchContext.Provider>
  )
}
export default SavedItemsProvider
export const useSavedItems = () => useContext(SavedItemsContextState)
export const useDispatchSavedItems = () => useContext(SavedItemsDispatchContext)
