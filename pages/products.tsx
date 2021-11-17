import { useEffect, useState } from 'react'
import FetchingProducts from './components/Fetching-products'
import ProductCard from './components/ProductCard'
import productsDataTypes from './components/Fetching-products.d'
import styles from '../styles/plp.module.scss'

export default function products(): JSX.Element {
  const [localProducts, setLocalProducts] = useState<productsDataTypes[] | []>(
    []
  )

  useEffect((): void => {
    FetchingProducts(setLocalProducts)
    console.log(localProducts)
  }, [])

  return (
    <div className={styles.productContainer}>
      {localProducts?.map((el: productsDataTypes) => (
        <ProductCard el={el} key={el.id} />
      ))}
    </div>
  )
}
