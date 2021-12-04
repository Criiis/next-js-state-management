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

export type Action =
  | {
      type: 'ADD'
      item: contextProducts
    }
  | {
      type: 'REMOVE'
      index: number
    }

export type DispatchContext = ({}: Action) => void
