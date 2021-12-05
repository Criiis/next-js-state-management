import { useState } from 'react'
import contextProducts from './CartProvider.d'

type localStorageType = contextProducts[] | []

export const useSetLocalStorage = (
  key: string,
  initialValue: [] | string
): [localStorageType, Function] => {
  //getting initial value of cart products
  const [getLocalStorage, setGetLocalStorage] = useState<localStorageType>(
    () => {
      try {
        //1.get values from local storage with specific key
        const item = localStorage.getItem(key)
        //2.check if value exist if exist -> return as initial value for our "react context" otherwise -> return the 'initial value parameter'
        return item ? JSON.parse(item) : initialValue
      } catch {
        return initialValue
      }
    }
  )

  //set value in local storage
  const setValue = (value: localStorageType | Function) => {
    try {
      //1.check if the 'value parameter' is a function or just a value
      const valueToStore =
        value instanceof Function ? value(getLocalStorage) : value
      //2.update the setGetLocalStorage with the 'value parameter'
      setGetLocalStorage(valueToStore)
      //3.set item in the local storage
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [getLocalStorage, setValue]
}
