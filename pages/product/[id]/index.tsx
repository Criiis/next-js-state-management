// import { NextRouter, useRouter } from 'next/router'
// import { GetStaticProps } from 'next'

function singleProduct({ product }: any): JSX.Element {
  console.log(product)

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
    </div>
  )
}

// source of information -> https://stackoverflow.com/questions/65783199/error-getstaticpaths-is-required-for-dynamic-ssg-pages-and-is-missing-for-xxx
//getting all the static paths
export async function getStaticPaths() {
  const res = await fetch('https://fakestoreapi.com/products')
  const products = await res.json()

  const paths = products.map((product: any) => ({
    params: { id: product.id.toString() },
  }))

  return { paths, fallback: false }
}

//getting all the data for the product
export async function getStaticProps({ params }: any) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)
  const product = await res.json()

  return { props: { product } }
}

export default singleProduct
