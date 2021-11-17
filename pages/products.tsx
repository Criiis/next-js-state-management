import { useEffect, useState } from 'react'
import FetchingProducts from './components/Fetching-products'
import productsDataTypes from './components/Fetching-products.d'

export default function products(): JSX.Element {
  const [localProducts, setLocalProducts] = useState<productsDataTypes[] | []>(
    []
  )

  useEffect((): void => {
    FetchingProducts(setLocalProducts)
    console.log(localProducts)
  }, [])

  return (
    <div>
      {localProducts?.map((el: productsDataTypes) => (
        <li key={el.id}>{el.title}</li>
      ))}
      <h1>this will be PLP</h1>
    </div>
  )
}
