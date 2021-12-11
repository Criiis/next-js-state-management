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
  removeItem: (index: number) => void
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
      index: number
    }

//global action
export interface globalAction {
  ADD: 'ADD'
  REMOVE: 'REMOVE'
}
