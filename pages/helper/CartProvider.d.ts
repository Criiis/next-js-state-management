export default interface contextProducts {
  category: string
  description: string
  id: number
  image: string
  price: number
  rating: rating
  title: string
}

interface rating {
  rate: number
  count: number
}

export interface ContextState {
  name: string | null
}

type ActionType = 'ADD' | 'REMOVE'

export interface Action {
  type: ActionType
  item: contextProducts
  index: number
}
