import { contextProducts } from './CartProvider.d'

export type stateType = contextProducts[] | []

export type action =
  | {
      type: 'ADD'
      payload: contextProducts
    }
  | {
      type: 'REMOVE'
      payload: contextProducts
      id: contextProducts['id']
    }

export type dispatchContext = (_: action) => void

export interface contextTypes {
  state: stateType
  addSavedItem: (payload: contextProducts) => void
  removedSavedItem: (
    payload: contextProducts,
    id: contextProducts['id']
  ) => void
}

export interface globalAction {
  ADD: 'ADD'
  REMOVE: 'REMOVE'
}
