import { useState } from 'react'
import contextProducts from './CartProvider.d'

type localStorageType = contextProducts[] | []

export const useSetLocalStorage = (
  key: string,
  initialValue: []
): [localStorageType, (value: localStorageType) => void] => {
  //getting initial value of cart products
  const [getLocalStorage, setGetLocalStorage] = useState<localStorageType>(
    () => {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      } catch {
        return initialValue
      }
    }
  )

  //set value in local storage
  const setValue = (
    value: localStorageType | ((val: localStorageType) => localStorageType)
  ) => {
    try {
      const valueToStore =
        value instanceof Function ? value(getLocalStorage) : value
      setGetLocalStorage(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [getLocalStorage, setValue]
}
