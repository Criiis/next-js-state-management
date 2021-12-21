import productsDataTypes from '../../components/products'
import Image from 'next/image'
import { useCart } from '../../helper/CartProvider'
import { useSavedItems } from '../../helper/SavedItemsProvider'

function SingleProduct({
  product,
}: {
  product: productsDataTypes
}): JSX.Element {
  const { addItem } = useCart()
  const { state, addSavedItem, removedSavedItem } = useSavedItems()

  return (
    <div>
      <h1>{product?.title}</h1>
      <h5>{product?.category}</h5>
      <div
        style={{
          position: 'relative',
          width: '300px',
          height: '300px',
        }}
      >
        <Image
          alt={product.title}
          src={product.image}
          layout='fill'
          objectFit='contain' // Scale your image down to fit into the container
        />
      </div>
      <h5>{product?.price} £</h5>
      <button onClick={() => addItem(product, 1)}>Add to cart</button>
      <br />
      {state.findIndex((el: productsDataTypes) => el.id === product.id) ===
      -1 ? (
        <button onClick={() => addSavedItem(product)}>
          Add to saved items
        </button>
      ) : (
        <button onClick={() => removedSavedItem(product)}>
          remove from saved items
        </button>
      )}
    </div>
  )
}

// source of information -> https://stackoverflow.com/questions/65783199/error-getstaticpaths-is-required-for-dynamic-ssg-pages-and-is-missing-for-xxx
//types for paths params server side rendering
interface paths {
  params: params
}
export interface params {
  id: string
}

//getting all the static paths
export async function getStaticPaths(): Promise<{
  paths: paths[]
  fallback: boolean
}> {
  const res = await fetch('https://fakestoreapi.com/products')
  const products: productsDataTypes[] = await res.json()

  const paths: paths[] = products.map((product: productsDataTypes) => ({
    params: { id: product.id.toString() },
  }))

  return { paths, fallback: false }
}

//getting all the data for the product using the prams from the static paths
export async function getStaticProps({ params }: paths): Promise<{
  props: {
    product: productsDataTypes
  }
}> {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)
  const product: productsDataTypes = await res.json()

  return { props: { product } }
}

export default SingleProduct
