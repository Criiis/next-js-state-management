//products type
export interface contextProducts {
  category: string
  description: string
  id: number
  image: string
  price: number
  rating: rating
  title: string
}
//rating for products
interface rating {
  rate: number
  count: number
}
//state types
export type stateType = contextProducts[] | []
//type for dispatch
export type DispatchContext = ({}: Action) => void
//type for CartContextState / useCart()
export interface contextTypes {
  state: stateType
  addItem: (item: contextProducts, quantity: number) => void
  removeItem: (index: number) => void
}
//actions type
export type Action =
  | {
      type: 'ADD'
      item: contextProducts
    }
  | {
      type: 'REMOVE'
      index: number
    }
