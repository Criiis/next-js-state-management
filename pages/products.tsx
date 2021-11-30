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
  return (
    <div className={styles.productContainer}>
      {data?.map((el: productsDataTypes) => (
        <ProductCard el={el} key={el.id} />
      ))}
    </div>
  )
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
