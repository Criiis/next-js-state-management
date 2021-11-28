import productsDataTypes from '../../components/products'

function singleProduct({
  product,
}: {
  product: productsDataTypes
}): JSX.Element {
  return (
    <div>
      <h1>{product?.title}</h1>
      <h5>{product?.category}</h5>
      <img
        src={product?.image}
        alt={product?.title}
        width='300px'
        loading='lazy'
      />
      <h5>{product?.price} £</h5>

      <button>Add cart</button>
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

export default singleProduct
