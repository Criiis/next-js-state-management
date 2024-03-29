//products type
export interface contextProducts {
  category: string
  description: string
  id: number
  image: string
  price: number
  rating: rating
  title: string
  quantity?: number
}
//rating for products
interface rating {
  rate: number
  count: number
}
//state types
export type stateType = contextProducts[] | []
//type for dispatch
export type dispatchContext = (_: action) => void // why "_" as a paramenter? https://stackoverflow.com/questions/57609358/getting-linting-error-error-unexpected-empty-object-pattern-no-empty-pattern
//type for CartContextState / useCart()
export interface contextTypes {
  state: stateType
  addItem: (item: contextProducts, quantity: contextProducts['id']) => void
  removeItem: (payload: contextProducts) => void
  addSingleQuantity: (payload: contextProducts) => void
  removeSingleQuantity: (payload: contextProducts) => void
  totalItemsCart: () => number
  totalProductValue: () => number
}

//actions type on reducer switch statement
export type action =
  | {
      type: 'ADD'
      id: contextProducts['id']
      payload: contextProducts
    }
  | {
      type: 'REMOVE'
      id: contextProducts['id']
    }
  | {
      type: 'ADDSINGLE'
      payload: contextProducts
    }
  | {
      type: 'REMOVESINGLE'
      payload: contextProducts
    }

//global action
export interface globalAction {
  ADD: 'ADD'
  REMOVE: 'REMOVE'
  ADDSINGLE: 'ADDSINGLE'
  REMOVESINGLE: 'REMOVESINGLE'
}
