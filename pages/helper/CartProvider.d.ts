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
export type dispatchContext = ({}: Action) => void
//type for CartContextState / useCart()
export interface contextTypes {
  state: stateType
  addItem: (item: contextProducts, quantity: number) => void
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
