import { createContext, useContext, useReducer, useEffect } from 'react'

const SavedItemsDispatchContext = createContext({} as any)
const SavedItemsContextState = createContext({} as any)

const reducer = (state: any, action: any): any => {
  switch (action.type) {
    case 'ADD':
      return [...state]
    default:
      throw new Error(`couldn't ${action}`)
  }
}

const SavedItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, [])

  return (
    <SavedItemsDispatchContext.Provider value={dispatch}>
      <SavedItemsContextState.Provider value={state}>
        {children}
      </SavedItemsContextState.Provider>
    </SavedItemsDispatchContext.Provider>
  )
}
export default SavedItemsProvider
export const useSavedItems = () => useContext(SavedItemsContextState)
export const useDispatchSavedItems = () => useContext(SavedItemsDispatchContext)
