import { useEffect, useState } from 'react'
import FetchingProducts from './components/products.d'

import ProductCard from './components/ProductCard'
import productsDataTypes from './components/products'
import styles from '../styles/plp.module.scss'

export default function products({
  data,
}: {
  data: FetchingProducts[]
}): JSX.Element {
  console.log(data)
  return (
    <div className={styles.productContainer}>
      {data?.map((el: productsDataTypes) => (
        <ProductCard el={el} key={el.id} />
      ))}
    </div>
  )
}

//Products server side render
export async function getStaticProps(): Promise<{
  props: {
    data: FetchingProducts[]
  }
}> {
  const res = await fetch('https://fakestoreapi.com/products')
  const data: FetchingProducts[] = await res.json()

  return {
    props: { data }, // will be passed to the page component as props
  }
}
