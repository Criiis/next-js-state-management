import { useState } from 'react'
import type { NextPage } from 'next'
import ProductCard from './components/ProductCard'
import productsDataTypes from './components/products.d'
import styles from '../styles/plp.module.scss'

//props for the next page
interface Props {
  data: productsDataTypes[]
}

//page
const Products: NextPage<Props> = ({ data }) => {
  //this is just a test
  const [state, setState] = useState(data) //save data in here and then filter the state
  console.log(state)
  /**
   * filter by category ->
   * Men = 'men's clothing'
   * Jewelry = "jewelery"
   * Electronics = 'electronics'
   * Women = 'women's clothing'

   * if no filter then use data
   */

  const singleProduct = data?.map((el: productsDataTypes) => (
    <ProductCard el={el} key={el.id} />
  ))

  return <div className={styles.productContainer}>{singleProduct}</div>
}

//All products server side render
export async function getStaticProps(): Promise<{
  props: {
    data: productsDataTypes[]
  }
}> {
  const res = await fetch('https://fakestoreapi.com/products')
  const data: productsDataTypes[] = await res.json()

  return {
    props: { data }, // could revalidate the data
  }
}

export default Products
